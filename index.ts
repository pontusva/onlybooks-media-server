import express from "express";
import { createLibrary } from "./endpoints/libraries/createLibrary";
import { uploadFile } from "./endpoints/misc/uploadFile";
import { createUser } from "./endpoints/users/createUser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/libraries", createLibrary);
app.post("/api/upload", uploadFile);
app.post("/api/users", createUser);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
