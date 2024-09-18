import { User } from "./User/model";
import { Audio } from "./Audio/model";
import { Chunk } from "./Audio/Chunk/model";
import { UserResolver } from "./User/resolver";
import { AudioResolver } from "./Audio/resolver";
import { ChunkResolver } from "./Audio/Chunk/resolver";


const entities = [
  User,
  Audio,
  Chunk,
];

const resolvers = [
  UserResolver,
  AudioResolver,
  ChunkResolver,
]

export {
  User,
  Audio,
  Chunk,
  UserResolver,
  AudioResolver,
  ChunkResolver,
  resolvers,
  entities
};