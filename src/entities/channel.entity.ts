import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";
import { UserListType } from "@/types";

@Entity({
  name: "channels",
})
export class ChannelEntity extends CoreEntity {
  @ManyToOne(
    () => UserEntity,
    (user) => user.uuid,
    { onDelete: "CASCADE", onUpdate:'CASCADE' },
  )
  @JoinColumn({ name: "channeler" })
  user: UserEntity;

  @Column({ name: "channel_name", type: "varchar", nullable: false })
  channelName: string;

  @Column({ name: "title", type: "varchar", nullable: false })
  title: string;

  @Column({ name: "description", type: "text", nullable: true })
  description: string;

  @Column({ name: "image", type: "varchar", nullable: true })
  image: string;

  // whether public or private channel
  @Column({
    name: "visibility",
    type: "boolean",
    nullable: false,
    default: true,
  })
  visibility: Boolean;

  @Column({ name: "rate", type: "numeric", nullable: false, default: 0 })
  rate: number;

  @Column({ name: "password", type: "varchar", nullable: true })
  password: string;

  // list of users joined for public channel & users who can join for private channel
  @Column({ name: "user_list", type: "jsonb", nullable: false, default: [] })
  userList: UserListType[];
}
