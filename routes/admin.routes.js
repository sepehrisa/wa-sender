const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

router.use(verifyToken, isAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: مدیریت کاربران توسط ادمین
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: دریافت لیست همه کاربران
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: موفقیت‌آمیز
 */
router.get("/users", adminController.getAllUsers);

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: ساخت کاربر جدید
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "کاربر تستی"
 *               phone:
 *                 type: string
 *                 example: "09123456789"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: "user"
 *               field:
 *                 type: string
 *                 example: "فروش"
 *               subscriptionEndsAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-21T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: کاربر ساخته شد
 *       409:
 *         description: شماره تکراری است
 */
router.post("/users", adminController.createUser);

/**
 * @swagger
 * /admin/users/{id}/toggle-active:
 *   patch:
 *     summary: فعال یا غیرفعال کردن کاربر
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: آیدی کاربر
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: وضعیت کاربر تغییر کرد
 *       404:
 *         description: کاربر پیدا نشد
 */
router.patch("/users/:id/toggle-active", adminController.toggleUserStatus);
/**
 * @swagger
 * /admin/users/{id}/extend:
 *   patch:
 *     summary: تمدید اشتراک کاربر
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: آیدی کاربر
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               days:
 *                 type: integer
 *                 example: 3
 *                 description: تعداد روز برای تمدید اشتراک
 *     responses:
 *       200:
 *         description: اشتراک تمدید شد
 */
router.patch("/users/:id/extend", adminController.extendSubscription);

/**
 * @swagger
 * /admin/search:
 *   get:
 *     summary: جستجو و فیلتر کاربران
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: query
 *         in: query
 *         required: false
 *         description: متن جستجو
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: نتایج جستجو
 */
router.get("/search", adminController.searchUsers);

module.exports = router;
