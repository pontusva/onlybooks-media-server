import express from "express";
import { createLibrary } from "./endpoints/libraries/createLibrary";
import { uploadFile } from "./endpoints/misc/uploadFile";

const app = express();

app.use(express.json());

app.post("/api/libraries", createLibrary);
app.post("/api/upload", uploadFile);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
