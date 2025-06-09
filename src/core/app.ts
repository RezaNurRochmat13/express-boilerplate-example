import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { emailQueue } from "../jobs/email/queue";
import { smsQueue } from "../jobs/sms/queue";
import articleRouter from "../routes/article.route";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

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


function useApp() {

    app.get("/", (req: Request, res: Response) => {
        res.send("Ping successfully");
    });

    return app
}

export { useApp }