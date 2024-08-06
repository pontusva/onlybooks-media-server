import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.SERVER_PORT);
export const createUser = async (req: Request, res: Response) => {
  const { username, password, type = "user" } = req.body;

  const data = {
    username,
    password,
    type,
    permissions: {
      download: false,
      update: false,
      delete: false,
      upload: false,
      accessAllLibraries: false,
      accessAllTags: false,
      accessExplicitContent: false,
    },
  };

  try {
    const response = await axios.post(
      `http://localhost:${process.env.SERVER_PORT}/api/users`,
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
