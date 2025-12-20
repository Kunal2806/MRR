CREATE TYPE "public"."job_internship_application_status" AS ENUM('applied', 'selected', 'rejected');--> statement-breakpoint
CREATE TABLE "job_internship_application" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"internship_job_id" uuid NOT NULL,
	"status" "job_internship_application_status" DEFAULT 'applied',
	"applied_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_internship_application" ADD CONSTRAINT "job_internship_application_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_internship_application" ADD CONSTRAINT "job_internship_application_internship_job_id_job_internship_id_fk" FOREIGN KEY ("internship_job_id") REFERENCES "public"."job_internship"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "job_internship_application_id_idx" ON "job_internship_application" USING btree ("id");--> statement-breakpoint
CREATE INDEX "job_internship_application_user_id_idx" ON "job_internship_application" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "job_internship_application_internship_job_id_idx" ON "job_internship_application" USING btree ("internship_job_id");--> statement-breakpoint
CREATE UNIQUE INDEX "job_internship_application_user_job_unique" ON "job_internship_application" USING btree ("user_id","internship_job_id");