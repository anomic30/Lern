const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");
require("dotenv").config();

const API_KEY = process.env.BARD_API_KEY;
const TEXT_MODEL_NAME = "models/text-bison-001";

const bardClient = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function textBard(prompt) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Calling Bard");
            const result = await bardClient.generateText({
                model: TEXT_MODEL_NAME,
                temperature: 0.8,
                candidateCount: 1,
                maxOutputTokens: 1024,
                prompt: {
                    text: prompt,
                },
            });

            if(result[0]?.candidates[0]?.output === undefined) {
                reject("No output");
            }
            resolve(result[0]?.candidates[0]?.output);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

// textBard("Hello world").then((result) => {
//     console.log("Output: ",result);
// }).catch((error) => {
//     console.log(error);
// });

module.exports = { textBard };