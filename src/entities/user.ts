import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

interface userDTO {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
}

@Entity({ name: "users" })
export class User {
  constructor(data: userDTO) {
    Object.assign(this, data);

    if (!data?.id) {
      this.id = v4();
    }
  }

  @PrimaryColumn("text")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @Column("text")
  password_hash: string;
}
