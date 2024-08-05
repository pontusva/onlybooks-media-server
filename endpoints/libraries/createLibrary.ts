import { Request, Response } from "express";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config();

export const createLibrary = async (req: Request, res: Response) => {
  const { name, mediaType, provider } = req.body;

  const data = {
    name,
    folders: [{ fullPath: "/audiobooks" }],
    icon: "books-2",
    mediaType,
    provider,
  };

  try {
    const response = await axios.post(
      `http://localhost:${process.env.SERVER_PORT}/api/libraries`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(response.status).send(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
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
