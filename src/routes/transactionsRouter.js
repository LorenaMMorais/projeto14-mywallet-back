import express from "express";
import { transactions, inputs, outputs } from "../controllers/transactionsController.js";
import { validateFormat } from "../middlewares/formatMiddleware.js";
import { validateHeader } from "../middlewares/headersMiddleware.js";


const transactionsRouter = express.Router();

transactionsRouter.use(validateHeader);
transactionsRouter.get('/transactions', transactions);
transactionsRouter.post('/transactions/inputs', validateFormat, inputs);
transactionsRouter.post('/transactions/outputs', validateFormat, outputs);

export default transactionsRouter;