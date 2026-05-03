import { GoogleGenAI } from "@google/genai";

// Safe access to environment variables in Vite
const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : (import.meta.env?.VITE_GEMINI_API_KEY || '');

const ai = new GoogleGenAI({ apiKey });

export async function generateBPAReport(processDescription: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        You are ProcessPilot, a GenAI-Powered BPA 4.0 Accelerator. 
        Analyze the following business process description and generate a structured BPA Value Finder report.
        
        Process Description: ${processDescription}

        The report should follow the Techolution BPA 4.0 methodology:
        1. Executive Summary
        2. Process Discovery (Map bottlenecks)
        3. Inefficiency Ranking (Anti-pattern analysis)
        4. ROI Forecast (P10/P50/P90)
        5. 30/60/90 Day Implementation Plan
        
        Use a professional, data-driven tone. Context: Indian Enterprise Market (e.g., Banks, Healthcare, Manufacturing).
        Return the response in Markdown format.
      `,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate report. Please check API key.";
  }
}
