import {
  fetchLeetCodeStats,
  fetchGeeksForGeeksStats,
  fetchCodeChefStats,
  fetchAllCodingStats
} from '../services/codingFetcherService.js';

export async function getLeetCodeStats(req, res, next) {
  try {
    const handle = req.query.username || req.query.handle;
    const data = await fetchLeetCodeStats(handle);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getGFGStats(req, res, next) {
  try {
    const handle = req.query.username || req.query.handle;
    const data = await fetchGeeksForGeeksStats(handle);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getCodeChefStats(req, res, next) {
  try {
    const handle = req.query.username || req.query.handle;
    const data = await fetchCodeChefStats(handle);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getAllCodingStats(req, res, next) {
  try {
    const handles = {
      leetcode: req.query.leetcode,
      gfg: req.query.gfg,
      codechef: req.query.codechef
    };
    const data = await fetchAllCodingStats(handles);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
