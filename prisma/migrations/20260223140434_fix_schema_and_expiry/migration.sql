/*
  Warnings:

  - You are about to drop the column `desiredJob` on the `DetailInfo` table. All the data in the column will be lost.
  - You are about to drop the column `employmentType` on the `DetailInfo` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `target` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

-- CreateTable
CREATE TABLE "Employer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DesiredJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "detailInfoId" TEXT NOT NULL,
    CONSTRAINT "DesiredJob_detailInfoId_fkey" FOREIGN KEY ("detailInfoId") REFERENCES "DetailInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmploymentType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "detailInfoId" TEXT NOT NULL,
    CONSTRAINT "EmploymentType_detailInfoId_fkey" FOREIGN KEY ("detailInfoId") REFERENCES "DetailInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicantId" TEXT NOT NULL,
    "vacancyId" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Application_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "salaryFrom" INTEGER,
    "salaryTo" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'UAH',
    "salaryPeriod" TEXT NOT NULL DEFAULT 'month',
    "negotiable" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT,
    "country" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'junior',
    "stack" TEXT NOT NULL DEFAULT '',
    "employmentType" TEXT NOT NULL,
    "postedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    "employerId" TEXT NOT NULL,
    CONSTRAINT "Vacancy_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "vacancyId" TEXT,
    CONSTRAINT "Conversation_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Conversation" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Conversation";
DROP TABLE "Conversation";
ALTER TABLE "new_Conversation" RENAME TO "Conversation";
CREATE TABLE "new_DetailInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "location" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "readyToRelocate" BOOLEAN NOT NULL DEFAULT false,
    "readyForWorkAbroad" BOOLEAN NOT NULL DEFAULT false,
    "lastWorkplace" TEXT NOT NULL,
    "previousPosition" TEXT NOT NULL,
    "experienceDuration" TEXT NOT NULL,
    "searchMode" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "customImage" TEXT,
    "salaryAmount" TEXT,
    "salaryCurrency" TEXT NOT NULL DEFAULT 'USD',
    "salaryPeriod" TEXT NOT NULL DEFAULT 'month',
    "aboutMe" TEXT,
    CONSTRAINT "DetailInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DetailInfo" ("dateOfBirth", "experienceDuration", "firstName", "gender", "id", "isCompleted", "lastName", "lastWorkplace", "location", "previousPosition", "readyForWorkAbroad", "readyToRelocate", "resumeUrl", "role", "searchMode", "userId") SELECT "dateOfBirth", "experienceDuration", "firstName", "gender", "id", "isCompleted", "lastName", "lastWorkplace", "location", "previousPosition", "readyForWorkAbroad", "readyToRelocate", "resumeUrl", "role", "searchMode", "userId" FROM "DetailInfo";
DROP TABLE "DetailInfo";
ALTER TABLE "new_DetailInfo" RENAME TO "DetailInfo";
CREATE UNIQUE INDEX "DetailInfo_userId_key" ON "DetailInfo"("userId");
CREATE TABLE "new_VerificationToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "target" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VerificationToken" ("expires", "token") SELECT "expires", "token" FROM "VerificationToken";
DROP TABLE "VerificationToken";
ALTER TABLE "new_VerificationToken" RENAME TO "VerificationToken";
CREATE UNIQUE INDEX "VerificationToken_target_key" ON "VerificationToken"("target");
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Employer_email_key" ON "Employer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_companyName_key" ON "Employer"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
