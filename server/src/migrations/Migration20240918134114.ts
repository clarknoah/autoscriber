import { Migration } from '@mikro-orm/migrations';

export class Migration20240918134114 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "created_by" type text using ("created_by"::text);`);
    this.addSql(`alter table "user" alter column "created_by" drop not null;`);
    this.addSql(`alter table "user" alter column "last_modified_by" type text using ("last_modified_by"::text);`);
    this.addSql(`alter table "user" alter column "last_modified_by" drop not null;`);
    this.addSql(`alter table "user" alter column "deleted_at" type timestamp using ("deleted_at"::timestamp);`);
    this.addSql(`alter table "user" alter column "deleted_at" drop not null;`);

    this.addSql(`alter table "audio" alter column "deleted_at" type timestamp using ("deleted_at"::timestamp);`);
    this.addSql(`alter table "audio" alter column "deleted_at" drop not null;`);

    this.addSql(`alter table "chunk" alter column "deleted_at" type timestamp using ("deleted_at"::timestamp);`);
    this.addSql(`alter table "chunk" alter column "deleted_at" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "audio" alter column "deleted_at" type timestamp(6) using ("deleted_at"::timestamp(6));`);
    this.addSql(`alter table "audio" alter column "deleted_at" set not null;`);

    this.addSql(`alter table "chunk" alter column "deleted_at" type timestamp(6) using ("deleted_at"::timestamp(6));`);
    this.addSql(`alter table "chunk" alter column "deleted_at" set not null;`);

    this.addSql(`alter table "user" alter column "created_by" type text using ("created_by"::text);`);
    this.addSql(`alter table "user" alter column "created_by" set not null;`);
    this.addSql(`alter table "user" alter column "last_modified_by" type text using ("last_modified_by"::text);`);
    this.addSql(`alter table "user" alter column "last_modified_by" set not null;`);
    this.addSql(`alter table "user" alter column "deleted_at" type timestamp(6) using ("deleted_at"::timestamp(6));`);
    this.addSql(`alter table "user" alter column "deleted_at" set not null;`);
  }

}
