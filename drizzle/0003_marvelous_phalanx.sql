CREATE TYPE "public"."Is_Home" AS ENUM('yes', 'no');--> statement-breakpoint
ALTER TABLE "job_internship" ADD COLUMN "Is_Home" "Is_Home" DEFAULT 'no';