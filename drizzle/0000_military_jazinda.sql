CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'USER', 'JUDGE');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "email_verification_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" uuid NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" uuid NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "phone_verification_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone" text NOT NULL,
	"otp" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_verification_tokens_email_token_key" ON "email_verification_tokens" USING btree ("email","token");--> statement-breakpoint
CREATE UNIQUE INDEX "email_verification_tokens_token_key" ON "email_verification_tokens" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "password_reset_tokens_email_token_key" ON "password_reset_tokens" USING btree ("email","token");--> statement-breakpoint
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "phone_verification_tokens_phone_otp_key" ON "phone_verification_tokens" USING btree ("phone","otp");--> statement-breakpoint
CREATE UNIQUE INDEX "phone_verification_tokens_otp_key" ON "phone_verification_tokens" USING btree ("otp");--> statement-breakpoint
CREATE INDEX "users_name_email_phone_idx" ON "users" USING btree ("name","email");