import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @CreateDateColumn({ name: "createdAt", nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt", nullable: true })
  updateAt?: Date;

  @DeleteDateColumn({ name: "deletedAt", nullable: true })
  deleteAt?: Date;
}
