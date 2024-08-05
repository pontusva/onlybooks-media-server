import axios from "axios";
import { Request, Response } from "express";
import FormData from "form-data";
import fs from "fs";
import dotnenv from "dotenv";

dotnenv.config();

export const uploadFile = async (req: Request, res: Response) => {
  const form = new FormData();
  form.append("title", "Wizard's First Rule");
  form.append("author", "Terry Goodkind");
  form.append("series", "Sword of Truth");
  form.append("library", "1304adc5-55af-485c-8416-7fab78d238a6");
  form.append("folder", "e7f451e6-d01b-4214-83ee-7a13a5fc51c0");
  form.append("0", fs.createReadStream("Free_Test_Data_2MB_MP3.mp3"));

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
