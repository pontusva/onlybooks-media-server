import { Request, Response } from "express";
import axios from "axios";

export const playLibraryItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;

  try {
    const response = await axios.post(
      `http://localhost:13378/api/items/${itemId}/play`,
      {
        deviceInfo: { clientVersion: "0.0.1" },
        supportedMimeTypes: ["audio/flac", "audio/mpeg", "audio/mp4"],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
};
