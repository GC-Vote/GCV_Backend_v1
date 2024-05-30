import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity({
  name: "channels",
})
export class ChannelEntity extends CoreEntity {
  @JoinColumn({ name: "channeler" })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.uuid, { nullable: false })
  @Column({ name: "channel_name", type: "varchar", nullable: false })
  channelName: string;

  @Column({ name: "title", type: "varchar", nullable: false })
  title: string;

  @Column({ name: "description", type: "text", nullable: true })
  description: string;

  @Column({ name: "image", type: "varchar", nullable: true })
  image: string;

  @Column({
    name: "visibility",
    type: "boolean",
    nullable: false,
    default: true,
  })
  visibility: Boolean;

  @Column({ name: "rate", type: "number", nullable: false, default: 0 })
  rate: Number;

  @Column({ name: "password", type: "varchar", nullable: true })
  password: string;

  @Column({ name: "user_list", type: "jsonb", nullable: false, default: [] })
  userList: any[];
}
