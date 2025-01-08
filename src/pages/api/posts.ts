import { NextApiRequest, NextApiResponse } from "next";

interface Photo {
  url: string;
  cdnUrl: string;
  uuid: string;
}

interface Post {
  caption: string;
  photos: Photo[];
  likes: number;
  userLikes: string[];
  userId: string;
  date: string;
}

const UPLOADCARE_SECRET_KEY = process.env.UPLOADCARE_SECRET_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!UPLOADCARE_SECRET_KEY) {
    return res.status(500).json({ error: "Uploadcare secret key is missing" });
  }

  try {
    const response = await fetch("https://api.uploadcare.com/files/", {
      headers: {
        Authorization: `Uploadcare.Simple ${UPLOADCARE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Uploadcare API Error:", response.status, errorText);
      return res
        .status(response.status)
        .json({ error: `Uploadcare API request failed: ${response.statusText}` });
    }

    const data = await response.json();

    const posts: Post[] = data.results.map((file: any) => ({
      caption: "Sample Caption",
      photos: [
        {
          url: file.original_file_url,
          cdnUrl: file.cdn_url,
          uuid: file.uuid,
        },
      ],
      likes: 0,
      userLikes: [],
      userId: "sampleUserId",
      date: file.datetime_uploaded,
    }));

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export default handler;
