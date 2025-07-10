import express, { Express, Request, Response } from "express";
import pinoHttp from 'pino-http';
import dotenv from "dotenv";
import cors from "cors";
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import swaggerUi from 'swagger-ui-express';
import { emailQueue } from "../jobs/email/queue";
import { smsQueue } from "../jobs/sms/queue";
import articleRouter from "../routes/article.route";
import authRouter from "../routes/authentication.route";
import logger from './../logger'
import { swaggerSpec } from '../config/swagger.config';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(pinoHttp({ logger }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Bull Board setup
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullMQAdapter(emailQueue),
    new BullMQAdapter(smsQueue),
  ],
  serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

// Route registration
app.use('/api/v1', articleRouter);
app.use('/api/v1/auth', authRouter);


function useApp() {

    app.get("/", (req: Request, res: Response) => {
        res.send("Ping successfully");
    });

    return app
}

export { useApp }