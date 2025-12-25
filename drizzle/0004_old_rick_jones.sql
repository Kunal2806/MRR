CREATE TABLE "faq" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text,
	"answer" text
);
--> statement-breakpoint
CREATE INDEX "faq_id_idx" ON "faq" USING btree ("id");