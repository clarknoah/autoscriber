import { Field, ObjectType } from "type-graphql";
import { SuccessOutput } from "../../../utils/outputs/Success/output";

@ObjectType()
export class ChunkSuccessOutput extends SuccessOutput {

  @Field((type) => String, { nullable: false})
  chunkName: string;

  @Field((type) => String, { nullable: false})
  uploadToken: string;
}
