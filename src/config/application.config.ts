import dotenv from "dotenv";

dotenv.config();

const {
    APP_PORT,
} = process.env;

export default {
    port: APP_PORT || 3000,
}
