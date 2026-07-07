import { GoogleGenerativeAI } from "@google/generative-ai";

// API key for the Generative AI API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Make the model configurable via env. Set VITE_GEMINI_MODEL to a valid model name in your GCP project.
// If not provided, we fall back to a known-supported model identifier.
// Example: VITE_GEMINI_MODEL=models/text-bison-001
const configuredModel = import.meta.env.VITE_GEMINI_MODEL || "models/text-bison-001";

let chatSession;

async function initializeChatSession() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    let model;
    try {
      model = await genAI.getGenerativeModel({
        model: configuredModel,
      });
    } catch (err) {
      console.error(`Failed to load configured model (${configuredModel}):`, err);

      // Try a safer fallback model. Update VITE_GEMINI_MODEL in your environment to a supported model
      // (use ModelService.ListModels or the Google docs to find available models).
      const fallbackModel = "models/text-bison-001";
      if (configuredModel !== fallbackModel) {
        console.log(`Falling back to ${fallbackModel}`);
        model = await genAI.getGenerativeModel({ model: fallbackModel });
      } else {
        // Nothing left to try — rethrow for upper-level handling
        throw err;
      }
    }

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
