/*
  Warnings:

  - You are about to drop the column `position` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `department` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joiningDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `position`,
    DROP COLUMN `salary`,
    ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `designation` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `joiningDate` DATETIME(3) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_email_key` ON `Employee`(`email`);
