import { Field, InputType } from "type-graphql";
import {
  IsString,
  IsEmail,
  IsDateString,
  IsBoolean,
  IsEnum,
  IsJSON,
  ValidateNested,
  IsAlphanumeric,
} from "class-validator";


@InputType()
export default class CreateAudioInput {
  @Field((type) => String )
  @IsString()
  uri: string;
}
