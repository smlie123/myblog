/*
  Warnings:

  - You are about to drop the `Categorys` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Articles` MODIFY `category` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Categorys`;
