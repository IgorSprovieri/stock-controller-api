import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { dataBase } from "../db";
import { User } from "../entities/user";

class Auth {
  async validateJwt(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;

      const decodedToken = token?.split(" ")[1];

      const secret = process.env.HASH_SECRET || "secret";
      const decoded: any = await jwt.verify(decodedToken || "", secret);

      const user = await dataBase
        .getRepository(User)
        .findOneBy({ id: decoded.user_id });

      if (!user) {
        throw new Error();
      }

      req.body.user = user;
      next();
    } catch (error: Error | unknown) {
      return res.status(403).json({ error: "Access denied" });
    }
  }
}

export { Auth };
