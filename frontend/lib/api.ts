import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AnalysisResult {
  label: number;
  prob_fake: number;
  sentiment: {
    polarity: number;
    subjectivity: number;
  };
}

export interface Corroboration {
  title: string;
  link: string;
  snippet: string;
}

export interface AnalysisResponse {
  result: AnalysisResult;
  corroboration: Corroboration[];
}

export const analyzeContent = async (mode: 'url' | 'text', content: string): Promise<AnalysisResponse> => {
  const payload = mode === 'url' 
    ? { mode: 'url', url: content }
    : { mode: 'text', text: content };
  
  const response = await api.post<AnalysisResponse>('/analyze', payload);
  return response.data;
};
