/*
  Warnings:

  - You are about to drop the column `telegram_chat_id` on the `notification_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification_settings" DROP COLUMN "telegram_chat_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "telegram_chat_id" TEXT;
