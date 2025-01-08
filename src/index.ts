import { useApp } from "./core/app";
import applicationConfig from "./config/application.config";

const app = useApp();

app.listen(applicationConfig.port, () => {
  console.log(`[server]: Server is running at http://localhost:${applicationConfig.port}`);
});