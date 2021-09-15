/*
  Warnings:

  - The primary key for the `BlockedUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BlockedUser` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `BlockedUser` table. All the data in the column will be lost.
  - You are about to drop the column `readBy` on the `ChatRoom` table. All the data in the column will be lost.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlockedUser" DROP CONSTRAINT "BlockedUser_pkey",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD CONSTRAINT "BlockedUser_pkey" PRIMARY KEY ("userId", "blockedUserId");

-- AlterTable
ALTER TABLE "ChatRoom" DROP COLUMN "readBy";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "contactReadChatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userReadChatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "id",
ADD COLUMN     "readChatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("userId", "projectId");

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "fullName" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "ReportProject" ALTER COLUMN "body" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ReportUser" ALTER COLUMN "body" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BlockedUser" ADD CONSTRAINT "BlockedUser_blockedUserId_fkey" FOREIGN KEY ("blockedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "ChatRoom.contactId_unique" RENAME TO "ChatRoom_contactId_key";

-- RenameIndex
ALTER INDEX "ChatRoom.projectId_unique" RENAME TO "ChatRoom_projectId_key";

-- RenameIndex
ALTER INDEX "Contact.id_unique" RENAME TO "Contact_id_key";

-- RenameIndex
ALTER INDEX "Discipline.title_unique" RENAME TO "Discipline_title_key";

-- RenameIndex
ALTER INDEX "Profile.userId_unique" RENAME TO "Profile_userId_key";

-- RenameIndex
ALTER INDEX "Social.userId_unique" RENAME TO "Social_userId_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.username_unique" RENAME TO "User_username_key";
