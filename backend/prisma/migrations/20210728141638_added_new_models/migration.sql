/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "discplines" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "instagram" TEXT,
    "linkedin" TEXT,
    "dribbble" TEXT,
    "behance" TEXT,
    "pinterest" TEXT,
    "soundcloud" TEXT,
    "spotify" TEXT,
    "medium" TEXT,
    "vimeo" TEXT,
    "youtube" TEXT,
    "github" TEXT,
    "discord" TEXT,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile.userId_unique" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Social.instagram_unique" ON "Social"("instagram");

-- CreateIndex
CREATE UNIQUE INDEX "Social.linkedin_unique" ON "Social"("linkedin");

-- CreateIndex
CREATE UNIQUE INDEX "Social.dribbble_unique" ON "Social"("dribbble");

-- CreateIndex
CREATE UNIQUE INDEX "Social.behance_unique" ON "Social"("behance");

-- CreateIndex
CREATE UNIQUE INDEX "Social.pinterest_unique" ON "Social"("pinterest");

-- CreateIndex
CREATE UNIQUE INDEX "Social.soundcloud_unique" ON "Social"("soundcloud");

-- CreateIndex
CREATE UNIQUE INDEX "Social.spotify_unique" ON "Social"("spotify");

-- CreateIndex
CREATE UNIQUE INDEX "Social.medium_unique" ON "Social"("medium");

-- CreateIndex
CREATE UNIQUE INDEX "Social.vimeo_unique" ON "Social"("vimeo");

-- CreateIndex
CREATE UNIQUE INDEX "Social.youtube_unique" ON "Social"("youtube");

-- CreateIndex
CREATE UNIQUE INDEX "Social.github_unique" ON "Social"("github");

-- CreateIndex
CREATE UNIQUE INDEX "Social.discord_unique" ON "Social"("discord");

-- CreateIndex
CREATE UNIQUE INDEX "Social.userId_unique" ON "Social"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
