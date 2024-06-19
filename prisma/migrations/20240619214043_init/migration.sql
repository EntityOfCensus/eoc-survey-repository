/*
  Warnings:

  - Added the required column `othentId` to the `ClientSurveyRef` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "survey_repository"."ClientSurveyRef" ADD COLUMN     "othentId" TEXT NOT NULL;
