import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";
import { ChannelEntity } from "./channel.entity";

@Entity({
  name: "titles",
})
export class TitleEntity extends CoreEntity {
  @ManyToOne(() => UserEntity, (user) => user.uuid, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "titler" })
  user: UserEntity;

  @ManyToOne(() => ChannelEntity, (channel) => channel.channelName, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "channel_index" })
  channel: ChannelEntity;

  @Column({ name: "title_name", type: "varchar", nullable: false })
  titleName: string;

  @Column({ name: "title", type: "varchar", nullable: false })
  title: string;

  @Column({ name: "description", type: "text", nullable: true })
  description: string;

  @Column({ name: "image", type: "varchar", nullable: true })
  image: string;

  @Column({ name: "voting_period", type: "timestamp", nullable: false })
  period: Date;

  // 0: Head counting   1: Token counting   2: Token holding
  @Column({
    name: "voting_method",
    type: "numeric",
    nullable: false,
    default: 0,
  })
  method: number;

  @Column({ name: "suggestion_limit", type: "numeric", nullable: true })
  suggestionLimit: number;

  // whether enable to be searched or not
  @Column({
    name: "permissioned",
    type: "boolean",
    nullable: false,
    default: true,
  })
  permissioned: boolean;

  @Column({
    name: "suggestion_count",
    type: "numeric",
    nullable: false,
    default: 0,
  })
  suggestionCount: number;

  @Column({ name: "vote_count", type: "numeric", nullable: false, default: 0 })
  voteCount: number;

  // 0: candidate period   1: progress period   2: checking period   3: expire period
  @Column({ name: "status", type: "numeric", nullable: false, default: 0 })
  status: number;
}
