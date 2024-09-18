import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SuccessOutput {
  @Field((type) => Boolean)
  success!: boolean;

  @Field((type) => String, { nullable: true})
  id?: string;

  @Field((type) => String, { nullable: true})
  uploadToken?: string;
}
