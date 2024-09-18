import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { User } from "resources/User/model";
import { v4 as uuidv4 } from 'uuid';


@ObjectType()
export class DefaultFieldsOptionalBy {
  @Field((type) => ID)
  @PrimaryKey()
  id: string = uuidv4();

  @Field((type) => Date)
  @Property({
    columnType: "timestamp",
    fieldName: "created_at",
    onCreate: () => new Date(),
  })
  createdAt!: Date;

  @Field((type) => ID, { nullable: true })
  @Property({ columnType: "text", nullable: true })
  createdBy?: string;

  @Field((type) => ID, { nullable: true })
  @Property({ columnType: "text", nullable: true })
  lastModifiedBy?: string;

  @Field((type) => Date)
  @Property({
    columnType: "timestamp",
    fieldName: "modified_at",
    onUpdate: () => new Date(),
  })
  lastModifiedAt!: Date;

  @Field((type) => Date, { nullable: true })
  @Property({
    columnType: "timestamp",
    fieldName: "deleted_at",
    onUpdate: () => new Date(),
    nullable: true
  })
  deletedAt?: Date;

  @Field((type) => ID, { nullable: true })
  deletedBy?: string;

  constructor(){
    this.createdAt = new Date();
    this.lastModifiedAt = new Date();
  }
}

@ObjectType()
export class DefaultFields extends DefaultFieldsOptionalBy {
  @Field((type) => ID)
  @Property({ columnType: "text" })
  createdBy!: string;

  @Field((type) => ID)
  @Property({ columnType: "text" })
  lastModifiedBy!: string;

  constructor(currentUser: User){
    super();
    this.createdBy = currentUser.id;
    this.lastModifiedBy = currentUser.id;
  }

}
