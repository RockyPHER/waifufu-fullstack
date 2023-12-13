-- CreateTable
CREATE TABLE `waifus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `hairColor` VARCHAR(191) NULL,
    `eyeColor` VARCHAR(191) NULL,
    `height` INTEGER NULL,
    `weight` INTEGER NULL,
    `birthday` DATETIME(3) NULL,
    `bio` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
