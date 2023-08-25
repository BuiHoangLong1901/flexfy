import express from "express";

import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = express();

app.use(express.static("./dist/client", { maxAge: "7d" }));
app.use(ssrHandler);
console.log("Connect success!!!!");
app.listen(3000, "0.0.0.0", () => {
  console.log("Application is running at http://127.0.0.1:3000");
});
