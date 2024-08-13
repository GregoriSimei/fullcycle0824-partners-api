/*
  Warnings:

  - The values [test] on the enum `ReservationHistory_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `ReservationHistory` MODIFY `status` ENUM('reserved', 'canceled') NOT NULL;
