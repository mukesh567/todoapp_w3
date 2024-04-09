import express from "express";
import { apiRoute, protectedRoute } from "./utils/api.js";
import connectDb from "./utils/db.js";
import { AuthMiddleware } from "./middlewears/auth-middleware.js";
import cors from 'cors'

const app = express();

//Middleware for non-blocking urls
app.use(cors())

//For the frontend data
app.use(express.json());

app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, protectedRoute);

//And here we run our site if connection is correct
const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Our server running at port : ${PORT}`);
  });
});
