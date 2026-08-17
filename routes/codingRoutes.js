import express from 'express';
import {
  getLeetCodeStats,
  getGFGStats,
  getCodeChefStats,
  getAllCodingStats
} from '../controllers/codingController.js';

const router = express.Router();

router.get('/coding/leetcode', getLeetCodeStats);
router.get('/coding/gfg', getGFGStats);
router.get('/coding/codechef', getCodeChefStats);
router.get('/coding/all', getAllCodingStats);

export default router;
