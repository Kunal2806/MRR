CREATE TYPE "public"."query_type" AS ENUM('Event Query', 'Mentorship Help', 'Internship Support', 'Partnership', 'Other');--> statement-breakpoint
CREATE TABLE "contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullname" text,
	"email" text,
	"number" text,
	"query_type" "query_type",
	"message" text
);
--> statement-breakpoint
CREATE INDEX "contact_id_email_idx" ON "contact" USING btree ("id","email");