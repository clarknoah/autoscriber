import { Field, ObjectType } from "type-graphql";
import {
  Cascade,
  Entity,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { DefaultFields } from "resources/utils/models/DefaultFields/model";
import { User } from "resources/User/model";
import { Audio } from "../model";
import { DefaultAudioFields, IDefaultAudioFields } from "resources/utils/models/DefaultAudioFields/model";


export interface IChunk extends IDefaultAudioFields {
  index: number;
  audio: Audio;
}


@ObjectType({ simpleResolvers: true })
@Entity()
export class Chunk extends DefaultAudioFields {

  @Field((type) => Audio)
  @ManyToOne({
    entity: () => Audio,
    fieldName: "audio",
    cascade: [Cascade.REMOVE],
  })
  audio: Audio;

  @Field((type) => Number)
  @Property({
    fieldName: "index",
  })
  index: number;

  constructor(
    currentUser: User,
    input: IChunk
  ) {
    super(currentUser, input);
    this.createdBy = currentUser.id;
    this.index = input.index;
    this.audio = input.audio;
  }
}
