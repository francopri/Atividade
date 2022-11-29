import express from "express";
import * as dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", userRoute);


app.listen(process.env.PORT, () => {
    console.log(`App up and running on port http://localhost:${process.env.PORT}`);
})