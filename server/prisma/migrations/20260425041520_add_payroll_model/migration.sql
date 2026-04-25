/*
  Warnings:

  - You are about to drop the column `basic` on the `payroll` table. All the data in the column will be lost.
  - Added the required column `basicSalary` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payroll` DROP COLUMN `basic`,
    ADD COLUMN `basicSalary` DOUBLE NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
