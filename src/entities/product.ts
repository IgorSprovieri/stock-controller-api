import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 } from "uuid";
import { User } from "./user";

interface productDTO {
  id?: string;
  user: User;
  name: string;
}

@Entity({ name: "products" })
export class Product {
  constructor(data: productDTO) {
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

  @Column("text")
  name: string;
}
