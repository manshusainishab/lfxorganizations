import { Router } from "express";
import { getAllOrgs } from "../controllers/GetAllOrgs";
import { getOrgById } from "../controllers/GetSpecificOrg";
import { addOrgs } from "../controllers/AddOrgs";

export const router = Router();

router.get("/orgs", getAllOrgs);
router.get("/:orgId/details", getOrgById);
router.post("/orgs", addOrgs);