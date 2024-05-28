import { Column, Entity } from "typeorm";

import { CoreEntity } from "./Core.entity";

@Entity({
  name: "users",
})
export class UserEntity extends CoreEntity {
  @Column({ name: "uuid", nullable: false })
  uuid: string;

  @Column({ name: "username", nullable: false })
  username: string;

  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "avatar", nullable: true})
  avatar: string;

}
