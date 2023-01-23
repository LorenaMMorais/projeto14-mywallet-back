import express from "express";
import { register } from "../controllers/signUpController.js";

const router = express.Router();
router.post('/sign-up', register);

export default router;