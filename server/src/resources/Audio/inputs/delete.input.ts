import { Field, InputType } from "type-graphql";
import {
  IsString
} from "class-validator";


@InputType()
export default class DeleteAudioInput {
  @Field((type) => String )
  @IsString()
  id: string;
}
