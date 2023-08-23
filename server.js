import express from "express";
import compression from "compression";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = express();
app.use(compression());

app.use(express.static("dist/client", { maxAge: "7d" }));
app.use((req, res, next) => {
  ssrHandler(req, res, next);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Application is running at http://127.0.0.1:3000");
});
