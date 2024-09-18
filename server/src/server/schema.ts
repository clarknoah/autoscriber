import * as TypeGraphQL from "type-graphql";
import { 
  UserResolver,
  AudioResolver,
  ChunkResolver,
 } from "resources";

export default function initializeSchema() {
  return TypeGraphQL.buildSchema({
    validate: {
      forbidUnknownValues: false,
    },
    resolvers: [
      UserResolver,
      AudioResolver,
      ChunkResolver
    ]
  });
}
