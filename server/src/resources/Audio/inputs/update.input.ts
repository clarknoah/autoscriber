import { Field, InputType } from "type-graphql";
import {
  IsString,
  IsNumber,
} from "class-validator";


@InputType()
export default class UpdateAudioInput {

  @Field((type) => String )
  @IsString()
  id: string;

  @Field((type) => Number )
  @IsNumber()
  duration: number;

  @Field((type) => Number )
  @IsNumber()
  size: number;

}
