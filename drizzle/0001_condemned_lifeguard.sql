CREATE TYPE "public"."job_level" AS ENUM('beginner', 'intermediate', 'advance');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('open', 'close', 'upcoming');--> statement-breakpoint
CREATE TABLE "job_internship" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"domain" text,
	"status" "job_status" DEFAULT 'open',
	"mode" text,
	"level" "job_level",
	"stipend" text,
	"certificate" text,
	"deadline" text,
	"bg_color" text,
	"border_color" text,
	"overview" text,
	"eligibility" jsonb,
	"tasks" jsonb,
	"technology_stack" jsonb,
	"submission_process" jsonb,
	"timeline" text,
	"criteria" jsonb,
	"interview_call" text
);
--> statement-breakpoint
CREATE INDEX "job_internship_domain_idx" ON "job_internship" USING btree ("domain");--> statement-breakpoint
CREATE INDEX "job_internship_status_idx" ON "job_internship" USING btree ("status");--> statement-breakpoint
CREATE INDEX "job_internship_level_idx" ON "job_internship" USING btree ("level");