/*
  Warnings:

  - Added the required column `desc` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tags` ADD COLUMN `desc` VARCHAR(191) NOT NULL;
