/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===== 1. UPDATED SCHEMA (schema.ts) =====
// import { InferModel } from "drizzle-orm";
import { table } from "console";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";
// import { Phone } from "lucide-react";
// import { array, number, string } from "zod";

// ===== ENUMS =====
export const UserRole = pgEnum("user_role", ["ADMIN", "USER","JUDGE"]);
export const VerificationStatus = pgEnum("verification_status", ["PENDING", "APPROVED", "REJECTED"]);
// export const ProjectStatus = pgEnum("project_status", ["DRAFT", "PUBLISHED", "ARCHIVED"]);

// ===== USERS =====
export const UsersTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    password: text("password").notNull(),
    // phone: text("phone").notNull(),
    // phoneVerified: timestamp("phone_verified", { mode: "date" }),
    role: UserRole("role").default("USER").notNull(),
    // organizationId: uuid("organization_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // uniqueIndex("users_email_key").on(table.email),
    index("users_name_email_idx").on(table.name, table.email),
    // index("users_organization_idx").on(table.organizationId),
  ]
);

export type User = InferSelectModel<typeof UsersTable>;
export type NewUser = InferInsertModel<typeof UsersTable>;

// // ===== PROJECTS =====
// export const ProjectsTable = pgTable(
//   "projects",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull(),
//     description: text("description"),
//     logo: text("logo"),
//     status: ProjectStatus("status").default("DRAFT").notNull(),
//     coverImage: text("cover_image"),
//     websiteUrl:text("website_url"),
//     bio:text("bio"),
//     slug: text("slug"), // Added for URL-friendly project identification
//     userId: uuid("user_id").notNull(),
//     contentJson: jsonb("content_json"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     uniqueIndex("projects_slug_key").on(table.slug),
//     index("projects_user_idx").on(table.userId),
//     index("projects_name_idx").on(table.name),
//     index("projects_status_idx").on(table.status),
//     index("projects_created_at_idx").on(table.createdAt),
//   ]
// );

// export type Project = InferModel<typeof ProjectsTable>;
// export type NewProject = InferModel<typeof ProjectsTable, "insert">;

// // Type definitions for JSON content
// export interface ProjectContentItem {
//   id: string;
//   heading: string;
//   description: string;
//   order?: number;
// }

// export interface ProjectContent {
//   sections: ProjectContentItem[];
//   metadata?: {
//     version?: string;
//     lastModified?: string;
//     [key: string]: any;
//   };
// }

// ===== AUTH TABLES (keeping existing) =====
export const EmailVerificationTokenTable = pgTable(
  "email_verification_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    email: text("email").notNull(),
    token: uuid("token").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("email_verification_tokens_email_token_key").on(table.email, table.token),
    uniqueIndex("email_verification_tokens_token_key").on(table.token),
  ]
);

export const PhoneVerificationTable = pgTable(
  "phone_verification_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    phone: text("phone").notNull(),
    otp: text("otp").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("phone_verification_tokens_phone_otp_key").on(table.phone, table.otp),
    uniqueIndex("phone_verification_tokens_otp_key").on(table.otp),
  ]
);

export const PasswordResetTokenTable = pgTable(
  "password_reset_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    email: text("email").notNull(),
    token: uuid("token").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("password_reset_tokens_email_token_key").on(table.email, table.token),
    uniqueIndex("password_reset_tokens_token_key").on(table.token),
  ]
);

export const UserStatus = pgEnum("user_status",["active", "inactive"]);

export const UserDataTable = pgTable(
  "user_data_table",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(()=>UsersTable.id, {onDelete: "cascade"}),
    phone: text("phone"),
    status: UserStatus("status").default("active"),
    location: text("location"),
    birthdate: timestamp("birthdate", {mode: "date"}),
    githubLink: text("github_link"),
    linkedinLink: text("linkedin_link"),
    portfolioLink: text("portfolio_link"),
    socialLinks: jsonb("social_links").$type<{name: string; link: string}[]>(),
    skillsAndExpertise: jsonb("skills_and_expertise").$type<string[]>(),
    careerGoals: text("career_goals"),
    roleInterests: jsonb("role_interests").$type<string[]>(),
    availability: text("availability"),
    academic: jsonb("academic").$type<{title: string, yearLevel: string, majors: string , score: string, passingYear: string}[]>(),
  },
  (table)=> [
    uniqueIndex("users_data_table_user_id_unique").on(table.userId),
  ]
)


export const JobStatus = pgEnum("job_status", ["open","close","upcoming"]);
export const JobLevel = pgEnum("job_level",["beginner","intermediate", "advance"]);
export const IsHome = pgEnum("Is_Home", ['yes', 'no'])
export const JobInternshipTable = pgTable(
  "job_internship", {
    id: uuid("id").defaultRandom().primaryKey(),
    ishome: IsHome('Is_Home').default('no'),
    title: text("title"), // NEW
    domain: text("domain"),
    status: JobStatus("status").default("open"),
    mode: text("mode"), // NEW (remote/onsite/hybrid)
    level: JobLevel("level"), // NEW (beginner/intermediate/advanced)
    stipend: text("stipend"), // NEW
    certificate: text("certificate"), // NEW
    deadline: text("deadline"), // NEW
    bgColor: text("bg_color"),
    borderColor: text("border_color"),
    overview: text("overview"),
    eligibility: jsonb("eligibility").$type<string[]>(), // NEW
    tasks: jsonb("tasks").$type<{id: string, title: string, description: string, status: "open" | "close" | "upcoming", links: string[]}[]>(),
    technologyStack: jsonb("technology_stack").$type<string[]>(),
    submissionProcess: jsonb("submission_process").$type<string[]>(),
    timeline: text("timeline"),
    criteria: jsonb("criteria").$type<{ name: string; weightage: string }[]>(),
    interviewCall: text("interview_call")
  },
  (table)=>[
    index("job_internship_domain_idx").on(table.domain),
    index("job_internship_status_idx").on(table.status),
    index("job_internship_level_idx").on(table.level)
  ]
)

export const JobInternshipApplicationStatus = pgEnum("job_internship_application_status", ["applied", "selected", "rejected"]);

export const JobInternshipApplication = pgTable(
  "job_internship_application", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(()=> UsersTable.id, {onDelete: "cascade"}),
    internshipJobId: uuid("internship_job_id").notNull().references(()=> JobInternshipTable.id, {onDelete: "cascade"}),
    status: JobInternshipApplicationStatus("status").default("applied"),
    appliedAt: timestamp("applied_at").defaultNow().notNull()
  },
  (table)=>[
    index("job_internship_application_id_idx").on(table.id),
    index("job_internship_application_user_id_idx").on(table.userId),
    index("job_internship_application_internship_job_id_idx").on(table.internshipJobId),
    uniqueIndex("job_internship_application_user_job_unique").on(table.userId, table.internshipJobId)
  ]
)

export const Faq = pgTable(
  "faq", {
    id: uuid('id').defaultRandom().primaryKey(),
    question: text("question"),
    answer: text("answer")
  },
  (table)=>[
    index("faq_id_idx").on(table.id)
  ]
)


export const QueryType = pgEnum("query_type", ['Event Query', 'Mentorship Help', 'Internship Support', 'Partnership', 'Other']);

export const Contact = pgTable(
  "contact", {
    id: uuid('id').defaultRandom().primaryKey(),
    fullname: text('fullname'),
    email: text('email'),
    number: text('number'),
    querytype: QueryType('query_type'),
    message: text('message')
  },
  (table)=>[
    index('contact_id_email_idx').on(table.id, table.email)
  ]
)