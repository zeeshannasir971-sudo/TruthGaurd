import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

export interface AnalysisResult {
  label: number;
  prob_fake: number;
  sentiment: { polarity: number; subjectivity: number };
}

export interface Corroboration {
  title?: string;
  link?: string;
  snippet?: string;
}

export async function analyzeContent(
  mode: "url" | "text",
  value: string
): Promise<{ result: AnalysisResult; corroboration: Corroboration[] }> {
  const payload = mode === "url" ? { mode: "url", url: value } : { mode: "text", text: value };
  const { data } = await axios.post(`${API_BASE.replace(/\/$/, "")}/analyze`, payload, {
    headers: { "Content-Type": "application/json" },
    timeout: 60000,
  });
  return data;
}
