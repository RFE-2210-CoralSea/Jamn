-- AlterTable
CREATE SEQUENCE posts_id_seq;
ALTER TABLE "posts" ALTER COLUMN "id" SET DEFAULT nextval('posts_id_seq');
ALTER SEQUENCE posts_id_seq OWNED BY "posts"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "users"."id";
