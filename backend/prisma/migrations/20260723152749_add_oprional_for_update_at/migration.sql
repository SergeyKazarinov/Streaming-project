-- AlterTable
ALTER TABLE "chat_messages" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "follows" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "notification_settings" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "social_links" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "updated_at" DROP NOT NULL;
