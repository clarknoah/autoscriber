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
import { Audio } from "./model";
import { generatePresignedUrl } from "services/fileUpload";
import { env } from "config/globals";
import uuid from "uuid";
import UpdateAudioInput from "./inputs/update.input";
import { UpdateAudioOutput } from "./outputs/update.output";
import DeleteAudioInput from "./inputs/delete.input";
import { QueryAudioOutput } from "./outputs/query.output";
import { QueryAudioInput } from "./inputs/query.input";

@Resolver((of) => Audio)
export class AudioResolver {
  constructor() {}

  @Mutation((returns) => SuccessOutput, { nullable: true })
  async createAudio(
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {
    const { em, user } = context;

    console.log(user);
    const audio = new Audio(user, {
      duration: 0,
      size: 0,
      uri: "1234"
    });

    em.persist(audio);
    await em.flush();


    return {
      success: true,
      id: audio.id,
      uploadToken: "yolo"
    };
  }


  @Mutation((returns) => UpdateAudioOutput, { nullable: true })
  async updateAudio(
    @Arg("input") input: UpdateAudioInput,
    @Ctx() context: Context,
  ): Promise<UpdateAudioOutput> {
    const { user, em } = context;

    const audioName = `${user.id}-${input.id}`;

    const audio = await em.findOneOrFail(Audio, { id: input.id });

    audio.duration = input.duration;
    audio.size = input.size;

    em.persist(audio);
    await em.flush();

    const presignedUrl = await generatePresignedUrl(audioName);

    return {
      success: true,
      uploadToken: presignedUrl,
      id: audio.id
    };
  }

  @Mutation((returns) => SuccessOutput, { nullable: true })
  async deleteAudio(
    @Arg("input") input: DeleteAudioInput,
    @Ctx() context: Context,
  ): Promise<SuccessOutput> {

    const { user, em } = context;

    console.log({input})

    const audio = await em.findOneOrFail(Audio, { id: input.id });

    em.removeAndFlush(audio);

    return {
      success: true,
    };
  }

  @Query((returns) => QueryAudioOutput, { nullable: true })
  async queryAudio(
    @Arg("input", { nullable: true }) input: QueryAudioInput,
    @Ctx() context: Context,
  ): Promise<QueryAudioOutput> {
    const { em } = context;

    // Build filter conditions
    const filters: any = {};
    if (input?.id) {
      filters.id = input.id;
    }
    if (input?.ownerId) {
      filters.owner = { id: input.ownerId };
    }
    if (input?.uri) {
      filters.uri = { $ilike: `%${input.uri}%` }; // Case-insensitive like
    }

    // Fetch total count
    const totalCount = await em.count(Audio, filters);

    // Fetch paginated results
    const results = await em.find(Audio, filters, {
      limit: input?.limit,
      offset: input?.offset,
      populate: ['owner', 'chunks'], // Adjust based on relations
      orderBy: { createdAt: 'DESC' }, // Adjust sorting as needed
    });

    return {
      totalCount,
      results,
    };
  }
}
