import { Request, Response } from "express";
import { db } from "../db";
import { organizations, orgDetails, projects } from "../db/schema";
import { cachedOrgs } from "../utils/cached";
import { sql } from "drizzle-orm";

export const getAllOrgs = async (req: Request, res: Response): Promise<void> => {
  if (cachedOrgs.length === 0) {
    try {
      const orgs = await db.query.organizations.findMany({
        with: {
          details: { columns: { year: true, term: true } },
          projects: { columns: { id: true } },
        },
      });

      const formatted = orgs.map((org) => ({
        id: org.id,
        name: org.name,
        description: org.description,
        years: [...new Set(org.details.map((d) => d.year))],
        logoUrl: org.logoUrl,
        totalProjects: org.projects.length,
      }));

      cachedOrgs.push(...formatted);
      res.status(200).json(cachedOrgs);
    } catch (err) {
      console.error("Error fetching orgs:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(200).json(cachedOrgs);
  }
};
