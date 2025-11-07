import { pgTable, serial, varchar, text, integer, timestamp, unique, index, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const organizations = pgTable("Organization", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  description: text("description"),
  logoUrl: varchar("logoUrl", { length: 255 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (t) => ({
  nameIdx: index("organization_name_idx").on(t.name),
}));

export const orgDetails = pgTable("OrgDetail", {
  id: serial("id").primaryKey(),
  orgId: integer("orgId").references(() => organizations.id, { onDelete: "cascade" }).notNull(),
  year: integer("year").notNull(),
  term: integer("term").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (t) => ({
  uniq: unique("org_year_term_unique").on(t.orgId, t.year, t.term),
  yearTermIdx: index("orgdetail_year_term_idx").on(t.year, t.term),
}));

export const projects = pgTable("Project", {
  id: serial("id").primaryKey(),
  orgId: integer("orgId").references(() => organizations.id, { onDelete: "cascade" }).notNull(),
  orgDetailId: integer("orgDetailId").references(() => orgDetails.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  upstreamIssue: text("upstreamIssue"),
  lfxUrl: text("lfxUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (t) => ({
  orgIdx: index("project_org_idx").on(t.orgId),
  orgDetailIdx: index("project_orgdetail_idx").on(t.orgDetailId),
}));

export const skills = pgTable("Skill", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const projectSkills = pgTable("ProjectSkill", {
  projectId: integer("projectId").references(() => projects.id, { onDelete: "cascade" }).notNull(),
  skillId: integer("skillId").references(() => skills.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.projectId, t.skillId] }),
}));

// Relations
export const orgRelations = relations(organizations, ({ many }) => ({
  details: many(orgDetails),
  projects: many(projects),
}));

export const orgDetailRelations = relations(orgDetails, ({ one, many }) => ({
  org: one(organizations, { fields: [orgDetails.orgId], references: [organizations.id] }),
  projects: many(projects),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  org: one(organizations, { fields: [projects.orgId], references: [organizations.id] }),
  orgDetail: one(orgDetails, { fields: [projects.orgDetailId], references: [orgDetails.id] }),
  skills: many(projectSkills),
}));

export const projectSkillRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, { fields: [projectSkills.projectId], references: [projects.id] }),
  skill: one(skills, { fields: [projectSkills.skillId], references: [skills.id] }),
}));
