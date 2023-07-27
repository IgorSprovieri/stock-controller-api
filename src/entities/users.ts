import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class users {
  @PrimaryColumn("text")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @Column("text")
  password_hash: string;
}
