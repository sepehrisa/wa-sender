const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const excelController = require('../controllers/excelController');

const uploadDir = path.join(__dirname, '../uploads/contacts');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /excel/upload:
 *   post:
 *     summary: آپلود فایل اکسل مخاطبین و دریافت پیش‌نمایش
 *     tags: [Excel]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: فایل اکسل مخاطبین
 *     responses:
 *       200:
 *         description: پیش‌نمایش مخاطبین اکسل
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 preview:
 *                   type: array
 *                   items:
 *                     type: object
 *                 total:
 *                   type: integer
 *       400:
 *         description: هیچ فایلی ارسال نشد
 */
router.post('/upload', upload.single('file'), excelController.readExcel);

module.exports = router;
