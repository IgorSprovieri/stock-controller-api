import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class users {
  @PrimaryColumn("text")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  lastName: string;
}
