/*
  Warnings:

  - Made the column `content` on table `Articles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Articles` MODIFY `content` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Categorys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
