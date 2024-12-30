-- AlterTable
ALTER TABLE `Articles` ADD COLUMN `summary` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `content` TEXT NOT NULL;
