import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const router = express.Router();

// TMDB MOVIE SEARCH
router.get("/tmdb/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json({ results: [] });

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`, // VERY IMPORTANT
        "Content-Type": "application/json;charset=utf-8"
      }
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.error("TMDB ERROR:", data);
      return res.status(500).json({ error: "TMDB request failed", data });
    }

    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
