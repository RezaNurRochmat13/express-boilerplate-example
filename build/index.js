"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./core/app");
const application_config_1 = __importDefault(require("./config/application.config"));
const app = (0, app_1.useApp)();
app.listen(application_config_1.default.port, () => {
    console.log(`[server]: Server is running at http://localhost:${application_config_1.default.port}`);
});
