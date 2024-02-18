/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `waifus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `waifus` DROP COLUMN `imageUrl`,
    ADD COLUMN `backgroundUrl` VARCHAR(191) NULL,
    ADD COLUMN `heroUrl` VARCHAR(191) NULL;
