/*
  Warnings:

  - You are about to alter the column `category` on the `Articles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Articles` MODIFY `category` INTEGER NOT NULL;
