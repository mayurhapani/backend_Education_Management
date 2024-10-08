import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set!");
  process.exit(1);
}

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection failed:", err.message));
