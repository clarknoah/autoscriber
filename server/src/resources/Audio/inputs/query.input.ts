// File path: src/resources/Audio/inputs/query.input.ts

import { Field, InputType } from "type-graphql";
import { IsOptional, IsString, IsInt, Min } from "class-validator";

@InputType()
export class QueryAudioInput {
  @Field({ nullable: true, description: "Filter by Audio ID" })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true, description: "Filter by Owner ID" })
  @IsOptional()
  @IsString()
  ownerId?: string;

  @Field({ nullable: true, description: "Filter by URI" })
  @IsOptional()
  @IsString()
  uri?: string;

  @Field(type => Number, { defaultValue: 10, description: "Number of records to fetch" })
  @IsInt()
  @Min(1)
  limit: number = 10;

  @Field(type => Number, { defaultValue: 0, description: "Number of records to skip" })
  @IsInt()
  @Min(0)
  offset: number = 0;
}
