/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Social.behance_unique";

-- DropIndex
DROP INDEX "Social.discord_unique";

-- DropIndex
DROP INDEX "Social.dribbble_unique";

-- DropIndex
DROP INDEX "Social.github_unique";

-- DropIndex
DROP INDEX "Social.instagram_unique";

-- DropIndex
DROP INDEX "Social.linkedin_unique";

-- DropIndex
DROP INDEX "Social.medium_unique";

-- DropIndex
DROP INDEX "Social.pinterest_unique";

-- DropIndex
DROP INDEX "Social.soundcloud_unique";

-- DropIndex
DROP INDEX "Social.spotify_unique";

-- DropIndex
DROP INDEX "Social.userId_unique";

-- DropIndex
DROP INDEX "Social.vimeo_unique";

-- DropIndex
DROP INDEX "Social.youtube_unique";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "Social" ADD PRIMARY KEY ("userId");
