import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config/youtubeapi.js";

/**
 * Analyzes the sentiment of YouTube comments using Gemini AI.
 * @param {string[]} comments
 * @returns {Promise<object>}
 */
export async function analyzeCommentsWithGemini(comments) {
  if (!Array.isArray(comments)) {
    throw new Error("Comments must be an array.");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const commentsString = JSON.stringify(comments);
    const prompt = ` Here are the comments: ${commentsString} Instructions: - For each comment, determine the sentiment ("agree," "disagree," or "neutral"). - Calculate the percentage of comments that fall into each category. - Return the results ONLY in this JSON format: { "sentiments": { "agree": 60, "disagree": 20, "neutral": 20 } } AND DO NOT GIVE ANYTHING EXCEPT FOR THE REQUESTED JSON FORMAT IN RESPONSE, FORMAT THE RESPONSE IN JSON SYNTAX.`;

    // Use the Gemini model to analyze the sentiment
    const result = await model.generateContent(prompt);

    // Extract the text response
    const text = result.response.candidates[0].content.parts[0].text;
    console.log(text);
    const jsonString = text
      .replace(/```json\n/, "")
      .replace(/```/, "")
      .trim();

    const parsedResponse = JSON.parse(jsonString);

    // Extract the sentiments
    const { agree, disagree, neutral } = parsedResponse.sentiments;

    // Parse the text into a JSON object
    // const jsonString = text.replace(/^json\n/, "").trim();
    // const jsonObject = JSON.parse(jsonString);

    return { agree, disagree, neutral }; // Return the parsed JSON object
  } catch (error) {
    console.error("Error analyzing comments with Gemini:", error);
    throw new Error("Failed to analyze comments with Gemini");
  }
}
