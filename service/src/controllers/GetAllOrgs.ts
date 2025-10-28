import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { cachedOrgs } from "../utils/cached";

export const getAllOrgs = (prisma: PrismaClient) => async (req: Request, res: Response): Promise<void> => {
    if (cachedOrgs.length == 0) {
        try {
            const orgs = await prisma.organization.findMany({
                include: {
                    details: { select: { year: true, term: true } },
                    _count: { select: { projects: true } },
                },
            });

            const formatted = orgs.map((org: any) => ({
                id: org.id,
                name: org.name,
                description: org.description,
                years: [...new Set(org.details.map((d: any) => d.year))],
                logoUrl: org.logoUrl,
                totalProjects: org._count.projects,
            }));

            cachedOrgs.push(...formatted);  // populate cache 
            res.status(200).json(cachedOrgs);
            return;

        } catch (err) {
            console.error("Error fetching home data:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    res.status(200).json(cachedOrgs);
};
