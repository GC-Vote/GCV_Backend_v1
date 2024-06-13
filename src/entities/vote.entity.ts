import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";
import { ChannelEntity } from "./channel.entity";
import { TitleEntity } from "./title.entity";
import { SuggestionEntity } from "./suggestion.entity";

@Entity({
  name: "votes",
})
export class VoteEntity extends CoreEntity {
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

  @ManyToOne(() => SuggestionEntity, (suggestion) => suggestion.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "suggestion_index" })
  suggestion: SuggestionEntity;

  @Column({ name: "nonce", type: "numeric", nullable: true })
  nonce: number;

  @Column({ name: "vote_hash", type: "numeric", nullable: false })
  voteHash: number;
}
