import { Field, ObjectType } from "type-graphql";
import { SuccessOutput } from "resources/utils/outputs/Success/output";

@ObjectType()
export class UpdateAudioOutput extends SuccessOutput {
  @Field((type) => String, { nullable: false})
  id: string;

  @Field((type) => String, { nullable: false})
  uploadToken: string;
}
