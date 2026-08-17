/**
 * Client service to fetch real dynamic coding profile statistics from the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchAllCodingProfilesStats() {
  const endpoint = `${API_BASE_URL}/api/coding/all`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Backend coding stats API unavailable, client falling back gracefully:', error);
    return null;
  }
}
