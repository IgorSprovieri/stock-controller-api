import { Request, Response } from "express";
import { object, string } from "yup";
import { dataBase } from "../db";
import { User } from "../entities/user";
import bcrypt from "bcrypt";

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
}
