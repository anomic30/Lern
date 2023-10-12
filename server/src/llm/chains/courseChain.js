import { LLMChain } from "langchain/chains";
import { palmModel } from "../models/palm.js";
import { coursePrompt } from "../templates/courseTemplate.js";

/**
 * Generate a course syllabus using the Google PaLM model.
 * 
 * @param {string} topic - The topic for which to generate a course syllabus.
 * @returns {Promise<string>} A Promise that resolves to the model-generated course syllabus string.
 * @throws {Error} An error is thrown if the model fails to generate a course syllabus.
 */

export const generateCourse = async(topic) => {
    const model = palmModel(0.2);
    const chain = new LLMChain({
        model: model,
        prompt: coursePrompt,
    });

    try {
        const result = await chain.call({topic: topic});
        return JSON.parse(result.text);
    } catch (error) {
        console.error("❌ Error inside course generation:", error);
        throw new Error("Course generation failed!");
    }
}