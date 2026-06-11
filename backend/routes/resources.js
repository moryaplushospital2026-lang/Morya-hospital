import { Router } from "express";
import { query } from "../config/db.js";
import { requireAdmin } from "../middleware/auth.js";
import { upload, uploadedPath } from "../middleware/upload.js";
import {
  createItem,
  dashboardCounts,
  deleteItem,
  getBySlug,
  listAdmin,
  listPublic,
  updateItem,
} from "../utils/crud.js";

const router = Router();
const resources = ["blogs", "departments", "facilities", "doctors", "gallery", "insurance"];

async function normalizeDoctorDepartment(req, res, next) {
  if (!req.body.department_id) {
    req.body.department_id = null;
    next();
    return;
  }

  const departmentId = Number(req.body.department_id);
  if (!Number.isInteger(departmentId) || departmentId <= 0) {
    res.status(400).json({ message: "Please select a valid department" });
    return;
  }

  const rows = await query("SELECT id FROM departments WHERE id = ? LIMIT 1", [departmentId]);
  if (!rows.length) {
    res.status(400).json({ message: "Selected department does not exist" });
    return;
  }

  req.body.department_id = departmentId;
  next();
}

function resourceMiddleware(resource) {
  return resource === "doctors" ? [normalizeDoctorDepartment] : [];
}

router.get("/admin/dashboard", requireAdmin, async (_req, res) => {
  res.json(await dashboardCounts());
});

resources.forEach((resource) => {
  router.get(`/${resource}`, async (_req, res) => {
    res.json(await listPublic(resource));
  });

  if (resource === "blogs" || resource === "departments") {
    router.get(`/${resource}/:slug`, async (req, res) => {
      const row = await getBySlug(resource, req.params.slug);
      if (!row) return res.status(404).json({ message: "Not found" });
      return res.json(row);
    });
  }

  router.get(`/admin/${resource}`, requireAdmin, async (_req, res) => {
    res.json(await listAdmin(resource));
  });

  router.post(
    `/admin/${resource}`,
    requireAdmin,
    upload.single("image"),
    ...resourceMiddleware(resource),
    async (req, res) => {
      const item = await createItem(resource, req.body, uploadedPath(req));
      res.status(201).json(item);
    },
  );

  router.put(
    `/admin/${resource}/:id`,
    requireAdmin,
    upload.single("image"),
    ...resourceMiddleware(resource),
    async (req, res) => {
      await updateItem(resource, req.params.id, req.body, uploadedPath(req));
      res.json({ message: "Updated" });
    },
  );

  router.delete(`/admin/${resource}/:id`, requireAdmin, async (req, res) => {
    await deleteItem(resource, req.params.id);
    res.json({ message: "Deleted" });
  });
});

export default router;
