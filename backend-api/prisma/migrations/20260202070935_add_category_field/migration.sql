/*
  Warnings:

  - You are about to drop the column `category` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "category";
