import { Migration } from '@mikro-orm/migrations';

export class Migration20240918184344 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "chunk" drop constraint "chunk_audio_foreign";`);

    this.addSql(`alter table "chunk" alter column "audio" type varchar(255) using ("audio"::varchar(255));`);
    this.addSql(`alter table "chunk" alter column "audio" drop not null;`);
    this.addSql(`alter table "chunk" add constraint "chunk_audio_foreign" foreign key ("audio") references "audio" ("id") on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "chunk" drop constraint "chunk_audio_foreign";`);

    this.addSql(`alter table "chunk" alter column "audio" type varchar(255) using ("audio"::varchar(255));`);
    this.addSql(`alter table "chunk" alter column "audio" set not null;`);
    this.addSql(`alter table "chunk" add constraint "chunk_audio_foreign" foreign key ("audio") references "audio" ("id") on update cascade;`);
  }

}
