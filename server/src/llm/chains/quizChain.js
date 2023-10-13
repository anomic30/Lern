import { LLMChain } from "langchain/chains";
import { palmModel } from "../models/palm.js";
import { quizPrompt } from "../templates/quizTemplate.js";
import { jsonParser, formatResponse } from "../utils/jsonParser.js";

/**
 * Generate a quiz for a chapter using the Google PaLM model.
 * 
 * @param {string} chapter - The chapter for which to generate a quiz.
 * @returns {Promise<string>} A Promise that resolves to the model-generated quiz string.
 * @throws {Error} An error is thrown if the model fails to generate a quiz.
 */

export const generateQuiz = async (chapter) => {
    const model = palmModel(0.8);
    const chain = new LLMChain({
        llm: model,
        prompt: quizPrompt,
        verbose: true,
    });

    try {
        const result = await chain.call({ chapter: chapter });
        return jsonParser(result.text);
    } catch (error) {
        console.error("❌ Error inside quiz generation:", error);
        throw new Error("Quiz generation failed!");
    }
}