import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 } from "uuid";
import { User } from "./user";
import { Product } from "./product";

interface movementDTO {
  id?: string;
  user: User;
  product: Product;
}

@Entity({ name: "movements" })
export class Movement {
  constructor(data: movementDTO) {
    Object.assign(this, data);

    if (!data?.id) {
      this.id = v4();
    }
  }

  @PrimaryColumn("text")
  id: string;

  @ManyToOne(() => User, (user: User) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Product, (product: Product) => product.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column("date")
  date: Date;

  @Column("numeric")
  quantity: number;

  @Column("boolean")
  leftover: boolean;
}
