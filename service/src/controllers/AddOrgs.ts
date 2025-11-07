import { Request, Response } from "express";
import { db } from "../db";
import { cachedOrgs } from "../utils/cached";
import { organizations, orgDetails, projects, skills, projectSkills } from "../db/schema";
import { eq, and } from "drizzle-orm";

async function findOrCreateOrganization(orgName: string) {
  const existing = await db.query.organizations.findFirst({
    where: eq(organizations.name, orgName),
  });

  if (existing) return existing;

  const [created] = await db.insert(organizations)
    .values({ name: orgName })
    .returning();
  return created;
}

async function findOrCreateorgDetails(orgId: number, year: number, term: number) {
  const existing = await db.query.orgDetails.findFirst({
    where: and(
      eq(orgDetails.orgId, orgId),
      eq(orgDetails.year, year),
      eq(orgDetails.term, term)
    ),
  });

  if (existing) return existing;

  const [created] = await db.insert(orgDetails)
    .values({ orgId, year, term })
    .returning();
  return created;
}

async function createProject(
  orgId: number,
  orgDetailsId: number,
  projectData: any
) {
  const { project: title, upstreamIssue, lfxUrl } = projectData;

  const [newProject] = await db.insert(projects)
    .values({
      orgId,
      orgDetailId: orgDetailsId,
      title,
      upstreamIssue,
      lfxUrl,
    })
    .returning();

  return newProject;
}

async function attachSkillsToProject(projectId: number, requiredSkills: string[]) {
  for (const skillName of requiredSkills) {
    const existingSkill = await db.query.skills.findFirst({
      where: eq(skills.name, skillName),
    });

    let skillId: number;
    if (existingSkill) {
      skillId = existingSkill.id;
    } else {
      const [createdSkill] = await db.insert(skills)
        .values({ name: skillName })
        .returning();
      skillId = createdSkill.id;
    }

    await db.insert(projectSkills)
      .values({ projectId, skillId })
      .onConflictDoNothing(); // prevents duplicate linking
  }
}

export const addOrgs = async (req: Request, res: Response) => {
  console.log("📩 Received bulk insert request");

  const projects = req.body;
  if (!Array.isArray(projects) || projects.length === 0) {
    return res.status(400).json({ error: "Invalid input format" });
  }

  try {
    await db.transaction(async (tx) => {
      for (const p of projects) {
        const { org, year: rawYear, term: rawTerm, requiredSkills = [] } = p;
        const year = parseInt(String(rawYear), 10);
        const term = parseInt(String(rawTerm), 10);

        const organization = await findOrCreateOrganization(org);
        const orgDetails = await findOrCreateorgDetails(organization.id, year, term);
        const newProject = await createProject(organization.id, orgDetails.id, p);

        if (requiredSkills.length > 0) {
          await attachSkillsToProject(newProject.id, requiredSkills);
        }
      }
    });

    cachedOrgs.length = 0;
    res.json({ message: `${projects.length} Projects inserted successfully` });
  } catch (err) {
    console.error("❌ Error inserting projects:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
