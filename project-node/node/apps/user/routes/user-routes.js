import express from "express";
import { user } from "../controllers/user-controllers.js";

export const userRouter = express.Router();

userRouter.get("/", user);