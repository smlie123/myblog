/*
  Warnings:

  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tags` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Articles` ADD COLUMN `tags` VARCHAR(191) NOT NULL,
    MODIFY `category` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Comments`;
