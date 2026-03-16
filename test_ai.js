
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.replace(/^["'\s]+|["'\s]+$/g, ''));

async function testAI() {
  try {
    console.log("Testing with gemini-2.5-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("Success with 2.5-flash:", result.response.text());
  } catch (err) {
    console.error("Failed with 2.5-flash:", err.message);
    
    try {
      console.log("\nTesting with gemini-1.5-flash...");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Hello");
      console.log("Success with 1.5-flash:", result.response.text());
    } catch (err2) {
      console.error("Failed with 1.5-flash:", err2.message);
    }
  }
}

testAI();
