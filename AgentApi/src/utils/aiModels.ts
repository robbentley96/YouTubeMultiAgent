import { ChatOpenAI } from "@langchain/openai";

export function InitialiseOpenAIModel() {
    return new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0.3
        });
}