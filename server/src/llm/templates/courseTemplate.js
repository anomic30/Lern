import {
    ChatPromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "langchain/prompts";

const systemTemplate = `As a robust syllabus generator, craft a syllabus for the designated topic: {topic}. The syllabus should encompass a series of comprehensive titles, strategically condensed to no more than 5 chapters. Present the syllabus as an array of strings, formatted in JSON. For reference, consider the following example structure:
  {{
    "title": "short title",
    "syllabus": [
      "Introduction to Thermodynamics",  
	  "The First Law of Thermodynamics"
    ]
  }}
  `;

// export const coursePrompt = SystemMessagePromptTemplate.fromTemplate(systemTemplate);

export const coursePrompt = new PromptTemplate({
  inputVariables: ["topic"],
  template: systemTemplate
})