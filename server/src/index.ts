import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {profileRouter} from "./routes/profile";
import {planRouter} from "./routes/plan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Api Routes
app.use("/api/profile",profileRouter);
app.use("/api/plan",planRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});