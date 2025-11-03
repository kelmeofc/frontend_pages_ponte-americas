-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('EBOOK', 'ENROLLMENT');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('IDENTIFICATION_PENDING', 'IDENTIFICATION_COMPLETED', 'PAYMENT_ATTEMPTED', 'WAITLISTED', 'ENROLLED');

-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('EBOOK_DOWNLOAD', 'ENROLLMENT_ATTEMPT');

-- CreateEnum
CREATE TYPE "WaitlistStatus" AS ENUM ('ACTIVE', 'NOTIFIED', 'ENROLLED', 'EXPIRED');

-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "enrollment_status" "EnrollmentStatus",
ADD COLUMN     "lead_type" "LeadType" NOT NULL DEFAULT 'EBOOK',
ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "submissions" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "type" "SubmissionType" NOT NULL,
    "success" BOOLEAN NOT NULL,
    "data" JSONB NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "step_progress" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "step_name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "validation_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "step_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waitlist_entries" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "position" INTEGER,
    "enrollment_attempt_at" TIMESTAMP(3) NOT NULL,
    "notification_preferences" JSONB NOT NULL DEFAULT '{}',
    "status" "WaitlistStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "waitlist_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment_leads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "step_completed" INTEGER NOT NULL DEFAULT 1,
    "enrollment_status" "EnrollmentStatus" NOT NULL DEFAULT 'IDENTIFICATION_COMPLETED',
    "waitlist_position" INTEGER,
    "city" TEXT,
    "country" TEXT,
    "ip_address" TEXT,
    "route" TEXT,
    "user_agent" TEXT,
    "origin_font" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollment_leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "submissions_lead_id_idx" ON "submissions"("lead_id");

-- CreateIndex
CREATE INDEX "submissions_type_idx" ON "submissions"("type");

-- CreateIndex
CREATE INDEX "submissions_created_at_idx" ON "submissions"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "step_progress_lead_id_step_number_key" ON "step_progress"("lead_id", "step_number");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_entries_lead_id_key" ON "waitlist_entries"("lead_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_leads_email_key" ON "enrollment_leads"("email");

-- CreateIndex
CREATE INDEX "leads_lead_type_idx" ON "leads"("lead_type");

-- CreateIndex
CREATE INDEX "leads_enrollment_status_idx" ON "leads"("enrollment_status");

-- CreateIndex
CREATE INDEX "leads_email_lead_type_idx" ON "leads"("email", "lead_type");

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_progress" ADD CONSTRAINT "step_progress_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waitlist_entries" ADD CONSTRAINT "waitlist_entries_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
