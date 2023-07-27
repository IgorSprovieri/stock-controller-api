import express, { Request, Response } from "express";
import { userController } from "../controllers";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ Api: "Success" });
});

router.post("/user", userController.post);
export { router };
