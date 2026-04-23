import path from "path";
import dotenv from "dotenv";
import express from "express";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: process.env.SHARED_ENV_PATH || "/Users/stephenbeale/Desktop/shared.env", quiet: true });
dotenv.config({ quiet: true });

const app = express();
const port = Number(process.env.PORT || 8080);
const distDir = path.resolve(process.cwd(), "dist");
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

app.use(express.json({ limit: "1mb" }));
app.use(express.static(distDir));

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const error = new Error("API_KEY_MISSING");
    error.code = "API_KEY_MISSING";
    throw error;
  }

  return new GoogleGenAI({ apiKey });
}

function sendApiError(res, error, fallbackMessage) {
  const message = error instanceof Error ? error.message : fallbackMessage;
  const normalized = message.includes("429") || message.toLowerCase().includes("quota")
    ? { status: 429, code: "QUOTA_EXCEEDED", message: "AI usage limit reached. Please try again later." }
    : message === "API_KEY_MISSING"
      ? { status: 503, code: "API_KEY_MISSING", message: "AI features are currently unavailable." }
      : { status: 500, code: "REQUEST_FAILED", message: fallbackMessage };

  res.status(normalized.status).json({
    error: {
      code: normalized.code,
      message: normalized.message,
    },
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/interaction-explanation", async (req, res) => {
  const { drug1, drug2, interactionLabel, interactionDescription } = req.body ?? {};

  if (!drug1 || !drug2 || !interactionLabel || !interactionDescription) {
    res.status(400).json({
      error: {
        code: "REQUEST_FAILED",
        message: "Missing required interaction fields.",
      },
    });
    return;
  }

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: `Explain the drug interaction between ${drug1} and ${drug2}.
The interaction is categorized as "${interactionLabel}".
General description: ${interactionDescription}.

Provide a concise, empathetic, and harm-reduction focused explanation of why this interaction occurs and what the specific risks or effects are.
Keep it under 100 words.
Include a clear warning if it is dangerous.
Format the output in Markdown.`,
      config: {
        systemInstruction: "You are a harm reduction expert. Your goal is to provide clear, non-judgmental, and scientifically accurate information about drug interactions to help people stay safe. Always prioritize safety and suggest seeking medical help if in doubt.",
      },
    });

    if (!response.text) {
      throw new Error("EMPTY_RESPONSE");
    }

    res.json({ text: response.text });
  } catch (error) {
    console.error("Interaction explanation error:", error);
    sendApiError(res, error, "We couldn't generate the interaction explanation.");
  }
});

app.post("/api/drug-summary", async (req, res) => {
  const { drug1Name, drug2Name } = req.body ?? {};

  if (!drug1Name) {
    res.status(400).json({
      error: {
        code: "REQUEST_FAILED",
        message: "Missing required drug summary fields.",
      },
    });
    return;
  }

  const prompt = drug2Name
    ? `Provide a combined summary for the interaction between ${drug1Name} and ${drug2Name}.
For each drug, include:
- Typical Effects
- Onset Time
- Duration

Then, summarize the interaction risks and safety profile based on harm reduction principles.
Present this in a clear, easy-to-understand Markdown format with headers.
Keep the total response concise but informative.`
    : `Provide a comprehensive summary for ${drug1Name}.
Include:
- Typical Effects
- Onset Time
- Duration
- Potential Risks (Short and Long term)

Present this in a clear, easy-to-understand Markdown format with headers.
Keep it concise and focused on harm reduction.`;

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
      config: {
        systemInstruction: "You are a harm reduction expert. Provide accurate, non-judgmental information about substances to help people stay safe. Use clear headings and bullet points. Always include a disclaimer that this is not medical advice.",
      },
    });

    if (!response.text) {
      throw new Error("EMPTY_RESPONSE");
    }

    res.json({ text: response.text });
  } catch (error) {
    console.error("Drug summary error:", error);
    sendApiError(res, error, "We couldn't generate the substance summary.");
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`SeshGuard server listening on ${port}`);
});
