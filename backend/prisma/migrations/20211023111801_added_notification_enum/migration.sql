/*
  Warnings:

  - You are about to drop the column `message` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `notificationCode` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationCode" AS ENUM ('PROJECT_DELETED', 'PROJECT_TITLE_UPDATED', 'PROJECT_INVITATION', 'PROJECT_KICKED', 'CONTACT_USERNAME_UPDATED', 'CONTACT_REQUEST', 'ADMIN_ASSIGNED');

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "message",
DROP COLUMN "userId",
ADD COLUMN     "notificationCode" "NotificationCode" NOT NULL,
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
