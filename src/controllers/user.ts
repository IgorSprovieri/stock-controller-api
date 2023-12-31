import { Request, Response } from "express";
import { object, string } from "yup";
import { dataBase } from "../db";
import { User } from "../entities/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  async post(req: Request, res: Response) {
    try {
      const { body } = req;

      const schema = object({
        name: string().required(),
        email: string().email().required(),
        password: string().required(),
      });

      await schema.validate(body);

      const { name, email, password } = body;

      const userFound = await dataBase
        .getRepository(User)
        .findOneBy({ email: email });

      if (userFound) {
        throw new Error("User already exists");
      }

      const password_hash = await bcrypt.hash(password, 8);

      const user = new User({
        name: name,
        email: email,
        password_hash: password_hash,
      });

      const userCreated = await dataBase.getRepository(User).save(user);

      if (!userCreated) {
        throw new Error("User not created");
      }

      userCreated.password_hash = "";

      return res.status(201).json(userCreated);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected Error",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { body } = req;

      const schema = object({
        email: string().email().required(),
        password: string().required(),
      });

      await schema.validate(body);

      const { email, password } = body;

      const user = await dataBase
        .getRepository(User)
        .findOneBy({ email: email });

      if (!user) {
        throw new Error("User or password is invalid");
      }

      const passwordIsValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!passwordIsValid) {
        throw new Error("User or password is invalid");
      }

      const secret = process.env.HASH_SECRET || "secret";
      const token = jwt.sign({ user_id: user.id }, secret, {
        expiresIn: "1d",
      });

      user.password_hash = "";

      return res.status(200).json({ ...user, token: token });
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected Error",
      });
    }
  }
}
