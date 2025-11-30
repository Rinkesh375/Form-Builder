import express from "express";
import cors from "cors";
import formSchemaRoutes from "./routes/formSchema.routes.js";
import submissionsRoutes from "./routes/submissions.routes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  })
);

app.use("/api/form-schema", formSchemaRoutes);
app.use("/api/submissions", submissionsRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
