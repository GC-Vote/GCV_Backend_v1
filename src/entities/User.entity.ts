import { Column, Entity } from "typeorm";

import { CoreEntity } from "./core.entity";

@Entity({
  name: "users",
})
export class UserEntity extends CoreEntity {
  @Column({ name: "uuid", type: "varchar", nullable: false })
  uuid: string;

  @Column({ name: "username", type: "varchar", nullable: false })
  username: string;

  @Column({ name: "email", type: "varchar", nullable: false })
  email: string;

  @Column({ name: "avatar", type: "varchar", nullable: true })
  avatar: string;

  @Column({ name: "reason", type: "numeric", nullable: false, default: 0 })
  reason: number;
}
