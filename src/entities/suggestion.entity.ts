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
  @JoinColumn({ name: "suggester" })
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

  @Column({ name: "solution", type: "text", nullable: false })
  solution: string;
  
  @Column({ name: "description", type: "text", nullable: false })
  description: string;

  @Column({ name: "image", type: "varchar", nullable: true })
  image: string;

  @Column({ name: "vote_count", type: "numeric", nullable: true, default: 0 })
  voteCount: number;
}
