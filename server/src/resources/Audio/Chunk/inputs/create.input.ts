import { Field, InputType } from "type-graphql";
import {
  IsString,
  IsNumber,
} from "class-validator";


@InputType()
export default class CreateChunkInput {

  @Field((type) => String )
  @IsString()
  audioId: string;

  @Field((type) => Number )
  @IsNumber()
  index: number;

  @Field((type) => Number )
  @IsNumber()
  duration: number;

  @Field((type) => Number )
  @IsNumber()
  size: number;

}
