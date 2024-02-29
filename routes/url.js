import express from 'express';
import { analytics, generate } from '../controllers/url.js';

const router=express.Router();

router.post('/',generate);
router.get('/analytics/:shortId',analytics);

export default router;