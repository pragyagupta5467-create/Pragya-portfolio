/**
 * Backend Service for fetching live, real coding profile data (LeetCode, GeeksforGeeks, CodeChef)
 * Includes in-memory caching to prevent rate limits and external API flooding.
 */

// In-memory cache map & 15-minute Time-To-Live (TTL)
const cache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000;

function getCachedData(key) {
  const record = cache.get(key);
  if (record && Date.now() - record.timestamp < CACHE_TTL_MS) {
    return record.data;
  }
  return null;
}

function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

/**
 * Fetches real LeetCode profile data from public API endpoints
 * @param {string} username 
 */
export async function fetchLeetCodeStats(username = '') {
  const handle = username.trim() || process.env.LEETCODE_USERNAME || 'pragya_gupta';
  const cacheKey = `leetcode_${handle}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const profileUrl = `https://leetcode.com/u/${handle}/`;

  try {
    // Try reliable public LeetCode mirror API
    const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${handle}`, {
      signal: AbortSignal.timeout(6000)
    });

    if (res.ok) {
      const data = await res.json();
      const result = {
        success: true,
        platform: 'LeetCode',
        username: handle,
        solved: data.totalSolved ?? null,
        easy: data.easySolved ?? null,
        medium: data.mediumSolved ?? null,
        hard: data.hardSolved ?? null,
        ranking: data.ranking ? `#${data.ranking.toLocaleString()}` : null,
        rating: data.contestRating ? Math.round(data.contestRating) : null,
        profileUrl
      };

      setCachedData(cacheKey, result);
      return result;
    }
  } catch (err) {
    console.warn(`⚠️ LeetCode API fetch failed for ${handle}:`, err.message);
  }

  // Graceful fallback response when API is temporarily unavailable
  const fallbackResult = {
    success: false,
    platform: 'LeetCode',
    username: handle,
    solved: null,
    easy: null,
    medium: null,
    hard: null,
    ranking: null,
    rating: null,
    profileUrl
  };
  return fallbackResult;
}

/**
 * Fetches real GeeksforGeeks profile data from public API endpoints
 * @param {string} username 
 */
export async function fetchGeeksForGeeksStats(username = '') {
  const handle = username.trim() || process.env.GFG_USERNAME || 'pragyagupta14';
  const cacheKey = `gfg_${handle}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const profileUrl = `https://www.geeksforgeeks.org/user/${handle}/`;

  try {
    const res = await fetch(`https://geeks-for-geeks-api.vercel.app/${handle}`, {
      signal: AbortSignal.timeout(6000)
    });

    if (res.ok) {
      const data = await res.json();
      const result = {
        success: true,
        platform: 'GeeksforGeeks',
        username: handle,
        solved: data.totalProblemsSolved ?? data.info?.totalProblemsSolved ?? null,
        score: data.overallCodingScore ?? data.info?.overallCodingScore ?? null,
        ranking: data.instituteRank ?? data.info?.instituteRank ? `#${data.instituteRank || data.info?.instituteRank}` : null,
        rating: data.monthlyCodingScore ?? null,
        profileUrl
      };

      setCachedData(cacheKey, result);
      return result;
    }
  } catch (err) {
    console.warn(`⚠️ GeeksforGeeks API fetch failed for ${handle}:`, err.message);
  }

  const fallbackResult = {
    success: false,
    platform: 'GeeksforGeeks',
    username: handle,
    solved: null,
    score: null,
    ranking: null,
    rating: null,
    profileUrl
  };
  return fallbackResult;
}

/**
 * Fetches real CodeChef profile data from public API endpoints
 * @param {string} username 
 */
export async function fetchCodeChefStats(username = '') {
  const handle = username.trim() || process.env.CODECHEF_USERNAME || 'pragya_gupta';
  const cacheKey = `codechef_${handle}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const profileUrl = `https://www.codechef.com/users/${handle}`;

  try {
    const res = await fetch(`https://codechef-api.vercel.app/handle/${handle}`, {
      signal: AbortSignal.timeout(6000)
    });

    if (res.ok) {
      const data = await res.json();
      const result = {
        success: true,
        platform: 'CodeChef',
        username: handle,
        rating: data.currentRating ? `${data.stars || ''} (${data.currentRating})`.trim() : null,
        highestRating: data.highestRating ? `${data.highestRating}` : null,
        stars: data.stars || null,
        globalRank: data.globalRank ? `#${data.globalRank.toLocaleString()}` : null,
        solved: data.totalSolved ?? null,
        profileUrl
      };

      setCachedData(cacheKey, result);
      return result;
    }
  } catch (err) {
    console.warn(`⚠️ CodeChef API fetch failed for ${handle}:`, err.message);
  }

  const fallbackResult = {
    success: false,
    platform: 'CodeChef',
    username: handle,
    rating: null,
    highestRating: null,
    stars: null,
    globalRank: null,
    solved: null,
    profileUrl
  };
  return fallbackResult;
}

/**
 * Aggregates all 3 profile fetchers concurrently
 */
export async function fetchAllCodingStats(handles = {}) {
  const [leetcode, gfg, codechef] = await Promise.all([
    fetchLeetCodeStats(handles.leetcode),
    fetchGeeksForGeeksStats(handles.gfg),
    fetchCodeChefStats(handles.codechef)
  ]);

  return {
    leetcode,
    gfg,
    codechef
  };
}
