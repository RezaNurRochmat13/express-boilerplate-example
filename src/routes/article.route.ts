import express from "express";
import { ArticleController } from "../controller/article.controller";
import { useAuth } from "../middleware/auth.middleware";

const articleRouter = express.Router();
const {  authenticate } = useAuth();
const { index, show, create, update, destroy, sendEmail } = ArticleController()


/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           example: "clp8p8z0x0000s9ukf7ydxv1c"
 *         title:
 *           type: string
 *           example: "Judul Artikel"
 *         content:
 *           type: string
 *           example: "Ini konten lengkap artikel."
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get list of articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
articleRouter.get("/articles", authenticate, index);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: A single article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */
articleRouter.get("/articles/:id", show);

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */
articleRouter.post("/articles", create);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Update an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */
articleRouter.put("/articles/:id", update);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Article deleted
 */
articleRouter.delete("/articles/:id", destroy);

/**
 * @swagger
 * /articles/send-email:
 *   post:
 *     summary: Send email related to articles
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent
 */
articleRouter.post("/articles/send-email", sendEmail);

export default articleRouter;