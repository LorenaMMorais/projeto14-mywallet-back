import express from "express";
import { register, login } from "../controllers/authController.js";

const authRouter = express.Router();
authRouter.post('/', login);
authRouter.post('/cadastro', register);

export default authRouter;