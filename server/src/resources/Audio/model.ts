import { Field, ObjectType } from "type-graphql";
import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
} from "@mikro-orm/core";
import { DefaultFields } from "resources/utils/models/DefaultFields/model";
import { User } from "resources/User/model";
import { DefaultAudioFields, IDefaultAudioFields } from "resources/utils/models/DefaultAudioFields/model";
import { Chunk } from "./Chunk/model";



export interface IAudio extends IDefaultAudioFields {}

@ObjectType({ simpleResolvers: true })
@Entity()
export class Audio extends DefaultAudioFields {

  @Field((type) => User)
  @ManyToOne({
    entity: () => User,
    fieldName: "owner",
    cascade: [Cascade.MERGE, Cascade.PERSIST],
  })
  owner: User;

  @Field(() => [Chunk])
  @OneToMany(() => Chunk, (chunk) => chunk.audio, { cascade: [Cascade.REMOVE] })
  chunks = new Collection<Chunk>(this);


  constructor(
    currentUser: User,
    input: IAudio
  ) {
    super(currentUser, input);
    this.owner = currentUser;
  }
}
