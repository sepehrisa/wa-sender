const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { verifyToken } = require("../middlewares/auth.middleware");
const messageController = require("../controllers/message.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/contacts");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: ذخیره پیام اولیه (مرحله اول ویزارد)
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "سلام {{name}}، این یک پیام تستی است."
 *     responses:
 *       201:
 *         description: پیام ذخیره شد
 *       400:
 *         description: متن پیام الزامی است
 */
router.post("/", verifyToken, messageController.saveMessage);


module.exports = router;
