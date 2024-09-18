import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "util/interfaces";
import { User } from "resources/User/model";
import { SuccessOutput } from "resources/utils/outputs/Success/output";

@Resolver((of) => User)
export class UserResolver {
  constructor() {}

  @Mutation((returns) => SuccessOutput, { nullable: true })
  async createUser(
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {

    return {
      success: true,
    };
  }

  @Mutation((returns) => SuccessOutput, { nullable: true })
  async updateUser(
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {

    return {
      success: true,
    };
  }

  @Mutation((returns) => SuccessOutput, { nullable: true })
  async deleteUser(
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {

    return {
      success: true,
    };
  }

  @Query((returns) => SuccessOutput, { nullable: true })
  async queryUsers(
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {

    return {
      success: true,
    };
  }
}
