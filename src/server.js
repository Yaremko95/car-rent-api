import cors from "cors";
import express from "express";
import carsRouter from "./services/cars/index.js";
import { syncDB, testDB } from "./db/index.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use("/cars", carsRouter);

const { PORT = 5001 } = process.env;

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("✅ Server is listening on port " + PORT);
    });

    await testDB();
    await syncDB();

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initalize();
