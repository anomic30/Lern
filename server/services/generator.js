const {
    textBard
} = require('./bard.js');

async function formatResponse(result) {
    return new Promise(async (resolve, reject) => {
        try {
            const jsonString = result.output.replace('```json\n', '').replace('\n```', '').replace('```', '');
            // console.log(jsonString);
            resolve(jsonString);
        } catch (error) {
            reject(error);
        }
    });
}

async function generateCourse(topic) {
    let prompt = `Generate a syllabus for the topic: ${topic}. The syllabus should consist of a list of comprehensive titles that covers the entire topic. Could you limit the number of chapters to 5 or less if possible? Please provide the syllabus as an array of strings. The format should be in a JSON. Example: {title: short title, syllabus: ["Introduction to Thermodynamics",  "The First Law of Thermodynamics", ]}`
    return new Promise(async (resolve, reject) => {
        try {
            let syllabus = await textBard(prompt);
            let formattedResponse = await formatResponse(syllabus);
            resolve(JSON.parse(formattedResponse));
        } catch (error) {
            console.log("Error in generateCourse: ")
            reject(error);
        }
    });
}

async function generateChapter(chapter) {
    let prompt = `Create fun and engaging reading content on the topic: ${chapter}. The content should be informative and enjoyable. Incorporate easy-to-understand relatable examples and use a conversational tone to engage the reader.`
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Generating chapter: ", chapter);
            let chapterDetails = await textBard(prompt);
            resolve(chapterDetails.output);
        } catch (error) {
            console.log("Error in generateChapter: ", error);
            console.log("Generating chapter again!");
            let chapterDetails = await textBard(prompt);
            resolve(chapterDetails.output);
        }
    });
}

async function generateQuiz(chapter) {
    let prompt = `Create very short 4 MCQ quizzes having 4 options on the topic: ${chapter}. The answer will be zero based indexing. The format is JSON. Example: {title: "", questions: [{question:"", options: ["",""], answer: index}]}`
    return new Promise(async (resolve, reject) => {
        try {
            let quiz = await textBard(prompt);
            let formattedResponse = await formatResponse(quiz);
            resolve(JSON.parse(formattedResponse));
        } catch (error) {
            //if error, generate a quiz again with a different prompt
            generateQuiz(chapter);
            reject(error);
        }
    });
}

module.exports = {
    generateCourse,
    generateChapter,
    generateQuiz
};