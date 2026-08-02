-- AlterEnum
ALTER TYPE "token_types" ADD VALUE 'TELEGRAM_VERIFY';

-- AlterTable
ALTER TABLE "notification_settings" ADD COLUMN     "telegram_chat_id" TEXT,
ADD COLUMN     "telegram_notification_enabled" BOOLEAN NOT NULL DEFAULT false;
