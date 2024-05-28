import { Column, Entity } from "typeorm";

import { CoreEntity } from "./Core.entity";

@Entity({
  name: "users",
})
export class UserEntity extends CoreEntity {
  @Column({ name: "username", nullable: true })
  username: string;

  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "avatar", default: "logo.png" })
  avatar: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @Column({ name: "verifycode", nullable: true })
  verifyCode: Number;

  @Column({ name: "verifystatus", default: false })
  verifyStatus: Boolean;
}
