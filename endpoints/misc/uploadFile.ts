import axios from "axios";
import { Request, Response } from "express";
import FormData from "form-data";
import fs from "fs";
import dotnenv from "dotenv";

dotnenv.config();

export const uploadFile = async (req: Request, res: Response) => {
  const { title, author, series, library, folder } = req.body;
  const file = req.file; // Access the uploaded file from multer
  console.log(file);
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const form = new FormData();
  form.append("title", title);
  form.append("author", author);
  form.append("series", series);
  form.append("library", library);
  form.append("folder", folder);
  form.append("file", file.buffer, file.originalname); // Append the file

  const headers = {
    Authorization: `Bearer ${process.env.TOKEN}`,
    ...form.getHeaders(),
  };

  try {
    const response = await axios.post(
      `http://localhost:${process.env.SERVER_PORT}/api/upload`,
      form,
      { headers }
    );
    res.status(response.status).send(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      res
        .status(error.response ? error.response.status : 500)
        .send(error.message);
    } else {
      console.error("Unexpected error:", error);
      res.status(500).send("An unexpected error occurred");
    }
  }
};
