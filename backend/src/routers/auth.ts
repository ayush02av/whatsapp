import Router from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router.post("/entry", UserController.onboardUser);

export default router;