import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173", // React dev server
    "X-Title": "My React App",
  },
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [{ role: "user", content: message },
        {role: "system", content: "You are a professional movie film critic. Give helpful movie suggestions."}
      ],
    });

    res.json({ reply: completion.choices[0].message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
