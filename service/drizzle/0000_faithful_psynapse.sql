-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"logoUrl" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "OrgDetail" (
	"id" serial PRIMARY KEY NOT NULL,
	"orgId" integer NOT NULL,
	"year" integer NOT NULL,
	"term" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Project" (
	"id" serial PRIMARY KEY NOT NULL,
	"orgId" integer NOT NULL,
	"orgDetailId" integer NOT NULL,
	"title" text NOT NULL,
	"upstreamIssue" text,
	"lfxUrl" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProjectSkill" (
	"projectId" integer NOT NULL,
	"skillId" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "ProjectSkill_pkey" PRIMARY KEY("projectId","skillId")
);
--> statement-breakpoint
ALTER TABLE "OrgDetail" ADD CONSTRAINT "OrgDetail_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "public"."Organization"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "public"."Organization"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_orgDetailId_fkey" FOREIGN KEY ("orgDetailId") REFERENCES "public"."OrgDetail"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ProjectSkill" ADD CONSTRAINT "ProjectSkill_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ProjectSkill" ADD CONSTRAINT "ProjectSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "Organization_logoUrl_key" ON "Organization" USING btree ("logoUrl" text_ops);--> statement-breakpoint
CREATE INDEX "Organization_name_idx" ON "Organization" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "OrgDetail_orgId_year_term_key" ON "OrgDetail" USING btree ("orgId" int4_ops,"year" int4_ops,"term" int4_ops);--> statement-breakpoint
CREATE INDEX "OrgDetail_year_term_idx" ON "OrgDetail" USING btree ("year" int4_ops,"term" int4_ops);--> statement-breakpoint
CREATE INDEX "Project_orgDetailId_idx" ON "Project" USING btree ("orgDetailId" int4_ops);--> statement-breakpoint
CREATE INDEX "Project_orgId_idx" ON "Project" USING btree ("orgId" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill" USING btree ("name" text_ops);
*/