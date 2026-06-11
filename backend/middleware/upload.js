import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir = path.resolve("backend/uploads");
const allowedImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);
const allowedImageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedImageExtensions.has(extension) || !allowedImageMimeTypes.has(file.mimetype)) {
      cb(new Error("Only JPG, PNG, WEBP, and SVG image uploads are allowed"));
      return;
    }
    cb(null, true);
  },
});

export function uploadedPath(req, fieldName = "image") {
  return req.file ? `/uploads/${req.file.filename}` : req.body[fieldName] || null;
}
