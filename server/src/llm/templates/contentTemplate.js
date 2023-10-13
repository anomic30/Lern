import {
    ChatPromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "langchain/prompts";

const systemTemplate = `As an intricate content creator, generate detailed content on the chapter: {chapter}. The content for the chapter should be informative and educational. Utilize clear and engaging language to convey concepts, principles, and practical applications. Present the content in a format suitable for educational materials, such as textbooks or online resources. Use a conversational tone to engage the reader.`;

// export const contentPrompt = SystemMessagePromptTemplate.fromTemplate(systemTemplate);

export const contentPrompt = new PromptTemplate({
    inputVariables: ["chapter"],
    template: systemTemplate
})