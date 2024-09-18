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
import CreateChunkInput from "./inputs/create.input";
import { Chunk } from "./model";
import { generatePresignedUrl } from "services/fileUpload";
import { ChunkSuccessOutput } from "resources/Audio/Chunk/outputs/create.output";
import { Audio } from "../model";

@Resolver((of) => Chunk)
export class ChunkResolver {
  constructor() {}

  @Mutation((returns) => ChunkSuccessOutput, { nullable: true })
  async createChunk(
    @Arg("input") input: CreateChunkInput,
    @Ctx() context: Context,
  ): Promise<ChunkSuccessOutput> {

    const { user, em } = context;

    const chunkName = `${user.id}-${input.audioId}-${input.index}`;

    const audio = await em.findOneOrFail(Audio, { id: input.audioId });

    const presignedUrl = await generatePresignedUrl(chunkName);

    const chunk = new Chunk(user, {
      ...input,
      audio
    });

    em.persist(chunk);
    await em.flush();

    return {
      success: true,
      uploadToken: presignedUrl,
      chunkName
    };
  }

  @Mutation((returns) => SuccessOutput, { nullable: true })
  async updateChunk(
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {

    return {
      success: true,
    };
  }

  @Mutation((returns) => SuccessOutput, { nullable: true })
  async deleteChunk(
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {

    return {
      success: true,
    };
  }

  @Query((returns) => SuccessOutput, { nullable: true })
  async queryChunk(
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {

    return {
      success: true,
    };
  }
}
