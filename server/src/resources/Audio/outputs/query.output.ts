// File path: src/resources/Audio/outputs/query.output.ts

import { Field, ObjectType } from "type-graphql";
import { Audio } from "../model";

@ObjectType()
export class QueryAudioOutput {
  @Field(type => Number, { description: "Total number of matching Audio records" })
  totalCount: number;

  @Field(type => [Audio], { description: "Paginated list of Audio records" })
  results: Audio[];
}
