const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");

const API_KEY = process.env.BARD_API_KEY;
const CHAT_MODEL_NAME = "models/chat-bison-001";
const TEXT_MODEL_NAME = "models/text-bison-001";

const chatClient = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const textClient = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function chatBard(prompt) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await chatClient.generateMessage({
                model: CHAT_MODEL_NAME,
                temperature: 0.5,
                candidateCount: 1,
                maxOutputTokens: 256,
                prompt: {
                    messages: [{ author: "user", content: initialPrompt+prompt }],
                },
            });

            resolve(result[0]?.candidates[0]?.content);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

async function textBard(prompt) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await textClient.generateText({
                model: TEXT_MODEL_NAME,
                temperature: 0.5,
                candidateCount: 1,
                maxOutputTokens: 300,
                prompt: {
                    text: prompt,
                },
            });

            resolve(result[0]?.candidates[0]?.output);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports = { chatBard, textBard };
