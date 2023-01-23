import express from "express";
import { login, register } from "../controllers/authController.js";
import { inputs, outputs, transactions } from "../controllers/transactionsController.js";

const router = express.Router();
router.post('/sign-up', register);
router.post('/', login);
router.get('/transactions', transactions);
router.post('/transactions/inputs', inputs);
router.post('/transactions/outputs', outputs);

export default router;