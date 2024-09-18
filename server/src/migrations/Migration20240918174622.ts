import { Migration } from '@mikro-orm/migrations';

export class Migration20240918174622 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "chunk" rename column "last_name" to "index";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "chunk" rename column "index" to "last_name";`);
  }

}
