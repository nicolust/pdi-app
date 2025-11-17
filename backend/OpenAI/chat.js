import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
});

export async function askOpenAI(message) {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [{ role: "user", content: message }, {role: "system", content: "You are a professional movie film critic. Give helpful movie suggestions."}],
  });

  return completion.choices[0].message;
}
