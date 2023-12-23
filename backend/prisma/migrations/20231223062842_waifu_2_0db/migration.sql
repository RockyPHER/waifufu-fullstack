/*
  Warnings:

  - You are about to drop the column `bio` on the `waifus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `waifus` DROP COLUMN `bio`,
    ADD COLUMN `origin` VARCHAR(191) NULL;
