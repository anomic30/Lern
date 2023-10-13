import { GooglePaLM } from "langchain/llms/googlepalm";

/**
 * Generate a Google PaLM model.
 * 
 * @param {number} temperature - The temperature to use for the model.
 * @returns {GooglePaLM} A Google PaLM model.
 */

export const palmModel = (temperature) => {
    const model = new GooglePaLM({
        apiKey: process.env.PALM_API_KEY,
        temperature: temperature,
        modelName: "models/text-bison-001", // OPTIONAL
        maxOutputTokens: 1024, // OPTIONAL
    });

    return model;
}