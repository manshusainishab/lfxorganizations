import { relations } from "drizzle-orm/relations";
import { organization, orgDetail, project, projectSkill, skill } from "./schema";

export const orgDetailRelations = relations(orgDetail, ({one, many}) => ({
	organization: one(organization, {
		fields: [orgDetail.orgId],
		references: [organization.id]
	}),
	projects: many(project),
}));

export const organizationRelations = relations(organization, ({many}) => ({
	orgDetails: many(orgDetail),
	projects: many(project),
}));

export const projectRelations = relations(project, ({one, many}) => ({
	organization: one(organization, {
		fields: [project.orgId],
		references: [organization.id]
	}),
	orgDetail: one(orgDetail, {
		fields: [project.orgDetailId],
		references: [orgDetail.id]
	}),
	projectSkills: many(projectSkill),
}));

export const projectSkillRelations = relations(projectSkill, ({one}) => ({
	project: one(project, {
		fields: [projectSkill.projectId],
		references: [project.id]
	}),
	skill: one(skill, {
		fields: [projectSkill.skillId],
		references: [skill.id]
	}),
}));

export const skillRelations = relations(skill, ({many}) => ({
	projectSkills: many(projectSkill),
}));