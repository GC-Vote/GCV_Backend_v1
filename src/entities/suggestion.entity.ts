import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";
import { ChannelEntity } from "./channel.entity";
import { TitleEntity } from "./title.entity";

@Entity({
  name: "suggestions",
})
export class SuggestionEntity extends CoreEntity {
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

  @ManyToOne(() => TitleEntity, (title) => title.titleName, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "title_index" })
  title: TitleEntity;

  @Column({ name: "description", type: "text", nullable: false })
  description: string;

  @Column({ name: "vote_count", type: "numeric", nullable: true, default: 0 })
  voteCount: number;
}
