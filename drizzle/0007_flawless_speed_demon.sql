CREATE TYPE "public"."status" AS ENUM('new', 'read', 'resolved');--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "status" "status" DEFAULT 'new';