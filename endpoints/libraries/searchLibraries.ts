import { Request, Response } from "express";
import axios from "axios";

export const searchLibraries = async (req: Request, res: Response) => {
  const { libraryId, query } = req.params;

  try {
    const response = await axios.get(
      `http://localhost:13378/api/libraries/${libraryId}/search?`,
      {
        params: {
          q: query,
        },
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );

    res.json(response.data);
  } catch (error: unknown) {
    res.status(500).json({ error: error.message });
  }
};
