import express from "express";
import { createLibrary } from "./endpoints/libraries/createLibrary";
import { searchLibraries } from "./endpoints/libraries/searchLibraries";
import { uploadFile } from "./endpoints/misc/uploadFile";
import { createUser } from "./endpoints/users/createUser";
import { playLibraryItem } from "./endpoints/libraries/playLibraryItem";
import multer from "multer";
import cors from "cors";
const upload = multer();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/libraries", createLibrary);
app.post("/api/upload", upload.single("file"), uploadFile);
app.post("/api/users", createUser);
app.get("/api/libraries/:libraryId/:query", searchLibraries);
app.post("/api/items/:itemId/play", playLibraryItem);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
