import { Router } from "express";
import { newAuditor } from "../controllers/auditor.js";

const router = Router();

router.post("/new", newAuditor);

export default router;
