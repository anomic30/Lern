import {
    ChatPromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "langchain/prompts";

const systemTemplate = `You are a quiz master. Generate multiple-choice quizzes (MCQs) for the chapter: {chapter}. The quiz should consist of a maximum of five questions. Each question should have four unique options. For reference, consider the following JSON example structure below:  
{{
  "title": "Chapter Title",
  "questions": [
    {{
      "question": "Question 1?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 1
    }},
    {{
      "question": "Question 2?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 3
    }},
    // ... (up to 5 questions)
  ]
}}

`;

// export const quizPrompt = SystemMessagePromptTemplate.fromTemplate(systemTemplate);

export const quizPrompt = new PromptTemplate({
  inputVariables: ["chapter"],
  template: systemTemplate
})