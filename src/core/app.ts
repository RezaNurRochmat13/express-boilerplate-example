import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import articleRouter from "../routes/article.route";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', articleRouter);


function useApp() {

    app.get("/", (req: Request, res: Response) => {
        res.send("Ping successfully");
    });

    return app
}

export { useApp }