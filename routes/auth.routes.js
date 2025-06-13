const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: ورود کاربر
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "09123456789"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: ورود موفق
 *       401:
 *         description: اطلاعات ورود اشتباه است
 */
router.post("/login", authController.login);

module.exports = router;
