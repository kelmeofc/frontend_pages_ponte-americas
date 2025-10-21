/*
  Warnings:

  - You are about to drop the `ebook_leads` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."ebook_leads";

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone_number" TEXT,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "company_size" INTEGER,
    "company_segment" TEXT,
    "company_on_market" TEXT,
    "website" TEXT,
    "origin" INTEGER NOT NULL,
    "origin_font" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
