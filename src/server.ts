import app from "./app";
import dotenv from "dotenv";
import { initTables } from "./utils/init.tables";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await initTables();

  app.listen(PORT, () => {
    console.log(`http://localhost: ${PORT}`);
  });
};

startServer();