const {textBard} = require('./bard.js');

async function generateCourse(topic){
    let prompt = `Generate a syllabus for the topic: ${topic}. The syllabus should consist of a list of comprehensive titles that covers the entire topic. Could you limit the number of chapters to 15 or less if possible? Please provide the syllabus as an array of strings. The format should be in a JSON. Example: {title: short title, syllabus: ["Introduction to Thermodynamics",  "The First Law of Thermodynamics", ]}`
    return new Promise(async(resolve, reject) => {
        try{
            let syllabus = await textBard(prompt);
            resolve(syllabus);
        }catch(error){
            reject(error);
        }
    });
}

async function generateChapter(chapter){
    let prompt = `Create fun and engaging content on the topic: ${chapter}. Your content should be informative and enjoyable. Incorporate easy-to-understand relatable examples and use a conversational tone to engage the reader. The format should be JSON. Example: {title: "", content: ""}`
    return new Promise(async(resolve, reject) => {
        try{
            let chapterDetails = await textBard(prompt);
            resolve(chapterDetails);
        }catch(error){
            reject(error);
        }
    });
}

async function generateQuiz(chapter){
    let prompt = `Create 5 MCQ quizzes having 4 options on the topic: ${chapter}. The format is JSON. Example: {title: "", questions: [{question:"", options: ["",""], answer: index}]}`
    return new Promise(async(resolve, reject) => {
        try{
            let quiz = await textBard(prompt);
            resolve(quiz);
        }catch(error){
            reject(error);
        }
    });
}

module.exports = {generateCourse, generateChapter, generateQuiz};