import express from "express";
import { transactions, inputs, outputs, exclude } from "../controllers/transactionsController.js";
import { validateFormat } from "../middlewares/formatMiddleware.js";
import { validateHeader } from "../middlewares/headersMiddleware.js";


const transactionsRouter = express.Router();

transactionsRouter.use(validateHeader);
transactionsRouter.get('/home', transactions);
transactionsRouter.post('/home/nova-entrada', validateFormat, inputs);
transactionsRouter.post('/home/nova-saida', validateFormat, outputs);
transactionsRouter.delete('/home/:id', exclude);

export default transactionsRouter;