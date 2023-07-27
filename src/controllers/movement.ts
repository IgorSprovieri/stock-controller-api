import { Request, Response } from "express";
import { boolean, date as yupDate, number, object, string } from "yup";
import { dataBase } from "../db";
import { Product } from "../entities/product";
import { Movement } from "../entities/movement";
import { Between } from "typeorm";

export class MovementController {
  async post(req: Request, res: Response) {
    try {
      const { body } = req;

      const schema = object({
        product_id: string().required(),
        date: yupDate().required(),
        quantity: number().integer().required(),
        leftover: boolean().required(),
      });

      await schema.validate(body);

      const { product_id, user, date, quantity, leftover } = body;

      const product = await dataBase
        .getRepository(Product)
        .findOneBy({ id: product_id });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      product.quantity = Number(product.quantity) + Number(quantity);

      await dataBase.getRepository(Product).save(product);

      const movement = new Movement({
        date: date,
        quantity: Number(quantity),
        leftover: leftover,
        user: user,
        product: product,
      });

      const movementCreated = await dataBase
        .getRepository(Movement)
        .save(movement);

      if (!movementCreated) {
        throw new Error("Movement not created");
      }

      return res.status(201).json(movementCreated);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { query }: any = req;

      const schema = object({
        initialDate: yupDate().required(),
        finalDate: yupDate().required(),
        leftover: boolean(),
      });

      await schema.validate(query);

      const {
        initialDate,
        finalDate,
        leftover,
      }: { initialDate: Date; finalDate: Date; leftover: boolean | undefined } =
        query;

      const movements = await dataBase.getRepository(Movement).find({
        where: { date: Between(initialDate, finalDate), leftover: leftover },
        relations: ["product"],
      });

      return res.status(200).json(movements);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async put(req: Request, res: Response) {
    try {
      const { body, params } = req;

      const schema = object({
        product_id: string(),
        date: yupDate(),
        quantity: number().integer(),
      });

      await schema.validate(body);

      const { product_id, quantity, date, leftover } = body;
      const { id } = params;

      const movement = await dataBase
        .getRepository(Movement)
        .findOneBy({ id: id });

      if (!movement) {
        return res.status(404).json({ error: "Movement not found" });
      }

      if (product_id) {
        const oldProduct = await dataBase
          .getRepository(Product)
          .findOneBy({ id: product_id });

        if (!oldProduct) {
          return res.status(404).json({ error: "Old product not found" });
        }

        const newProduct = await dataBase
          .getRepository(Product)
          .findOneBy({ id: product_id });

        if (!newProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        oldProduct.quantity =
          Number(oldProduct.quantity) - Number(movement.quantity);

        if (quantity) {
          movement.quantity = Number(quantity);
        }

        newProduct.quantity =
          Number(newProduct.quantity) + Number(movement.quantity);

        await dataBase.getRepository(Product).save(oldProduct);
        await dataBase.getRepository(Product).save(newProduct);

        movement.product = newProduct;
      }

      if (quantity && !product_id) {
        const product = await dataBase
          .getRepository(Product)
          .findOneBy({ id: product_id });

        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        product.quantity =
          Number(product.quantity) +
          Number(quantity) -
          Number(movement.quantity);

        await dataBase.getRepository(Product).save(product);

        movement.quantity = Number(quantity);
      }

      if (date) {
        movement.date = date;
      }

      if (leftover) {
        movement.leftover = leftover;
      }

      const movementUpdated = await dataBase
        .getRepository(Movement)
        .save(movement);

      if (!movementUpdated) {
        throw new Error("Rent not updated");
      }

      return res.status(200).json(movementUpdated);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
