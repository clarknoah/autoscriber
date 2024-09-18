import { Field, ObjectType } from "type-graphql";

import {
  Entity,
  Property,
  OneToMany,
  Collection,
} from "@mikro-orm/core";

import { DefaultFieldsOptionalBy } from "resources/utils/models/DefaultFields/model";
import { Audio } from "resources/Audio/model";



@ObjectType({ simpleResolvers: true })
@Entity()
export class User extends DefaultFieldsOptionalBy {

  @Field({ description: "The firstname of the user" })
  @Property({
    fieldName: "first_name",
  })
  firstname!: string;

  @Field({ description: "The lastname of the user" })
  @Property({
    fieldName: "last_name",
  })
  lastname!: string;

  @Field((type) => [Audio])
  @OneToMany({
    entity: () => Audio,
    mappedBy: "owner",
    orphanRemoval: true,
  })
  audioFiles = new Collection<Audio>(this);


  constructor(input: {
    firstname: string;
    lastname: string;
  }) {
    super();
    this.firstname = input.firstname;
    this.lastname = input.lastname;
  }
}
