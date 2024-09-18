import * as TypeGraphQL from "type-graphql";

// import { pubSub } from "services/pubSub";


export default function initializeSchema() {
  return TypeGraphQL.buildSchema({
    validate: {
      forbidUnknownValues: false,
    },
    resolvers: [
      // User
    ]
    // pubSub,
  });
}
