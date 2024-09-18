import { Request as ExpressRequest } from "express";
import { User } from "resources/models";

import { EntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { GraphQLResolveInfo } from "graphql";


export interface Context<VD = {}> {
  req: ExpressRequest;
  // authorization?: string;
  user: User;
  em: EntityManager<PostgreSqlDriver>;
}

export type HandlerArgs<T, IT> = {
  context: Context<T>;
  input: IT;
  info?: GraphQLResolveInfo;
};
