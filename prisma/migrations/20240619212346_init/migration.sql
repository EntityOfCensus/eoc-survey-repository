-- CreateTable
CREATE TABLE "survey_repository"."ClientSurveyRef" (
    "surveyId" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "ClientSurveyRef_pkey" PRIMARY KEY ("surveyId")
);
