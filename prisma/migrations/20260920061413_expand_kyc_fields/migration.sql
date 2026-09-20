/*
  Warnings:

  - You are about to drop the column `kycAddress` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the column `kycFullName` on the `Verification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Verification" DROP COLUMN "kycAddress",
DROP COLUMN "kycFullName",
ADD COLUMN     "kycAddress1" TEXT,
ADD COLUMN     "kycAddress2" TEXT,
ADD COLUMN     "kycCity" TEXT,
ADD COLUMN     "kycCountry" TEXT,
ADD COLUMN     "kycFirstName" TEXT,
ADD COLUMN     "kycLastName" TEXT,
ADD COLUMN     "kycState" TEXT,
ADD COLUMN     "kycZip" TEXT;
