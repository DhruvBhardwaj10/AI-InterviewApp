import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let chatSession;

async function initializeChatSession() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    // Initialize chat session
    chatSession = await model.startChat({
      generationConfig,
    });

  } catch (error) {
    console.error("Error initializing chat session:", error);
    throw error;
  }
}

// Ensure chatSession is initialized
(async () => {
  try {
    await initializeChatSession();
  } catch (error) {
    console.error("Error during chat session initialization:", error);
  }
})();

export { chatSession };
