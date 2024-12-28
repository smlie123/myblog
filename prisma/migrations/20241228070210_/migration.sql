/*
  Warnings:

  - You are about to drop the column `desc` on the `Tags` table. All the data in the column will be lost.
  - Added the required column `nick` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `nick` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `desc`;
