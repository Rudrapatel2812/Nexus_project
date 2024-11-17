import { Router } from "express";
import { getProjects, publishProject } from "../controller/publishController";
import {
  collaboratorsProject,
  deleteCollaborator,
  projectCollaborators,
  projectPermissions,
  shareProject,
} from "../controller/shareController";

const route = Router();

route.post("/publish", publishProject);
route.post("/community", getProjects);

route.post("/share", shareProject);
route.post("/collaborators", projectCollaborators);
route.get("/collaborators/:projectId", collaboratorsProject);
route.patch("/permissions", projectPermissions);
route.delete("/collaborators", deleteCollaborator);
