import { Field, ID, ObjectType, Directive, InterfaceType } from "type-graphql";
import { GraphQLDateTime } from "graphql-scalars";
import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
  Unique,
  Index,
  OneToMany,
} from "@mikro-orm/core";
import { DefaultFields } from "../DefaultFields/model";
import { User } from "resources/User/model";

export interface IDefaultAudioFields {
  duration: number;
  size: number;
  uri: string;
}

@ObjectType()
export class DefaultAudioFields extends DefaultFields {

  @Field((type) => Number, {
    description: "Duration of the audio file in milliseconds",
  })
  @Property({
    fieldName: "duration",
    
  })
  duration: number;

  @Field((type) => Number, {
    description: "Size of the audio file in milliseconds",
  })
  @Property({
    fieldName: "size",
    
  })
  size: number;

  @Field((type) => String, {
    description: "URI to the audio file",
  })
  @Property({
    fieldName: "uri",
    
  })
  uri: string;


  @Field(() => String, { description: 'Presigned URL for accessing the audio file' })
  presignedUrl: string; 

  constructor(    
    currentUser: User,
    input: IDefaultAudioFields
  ){
    super(currentUser);
    this.duration = input.duration;
    this.size = input.size;
    this.uri = input.uri;
  }
}

