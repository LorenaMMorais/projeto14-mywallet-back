import express from "express";
import { login, register } from "../controllers/authController.js";
import { transactions } from "../controllers/transactionsController.js";

const router = express.Router();
router.post('/sign-up', register);
router.post('/', login);
router.get('/transactions', transactions);

export default router;