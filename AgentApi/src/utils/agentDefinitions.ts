import { BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { AgentSystemPrompts } from "./agentSystemPrompts";
import { GetTool, AgentSearchTool } from "./toolDefinitions";
import { AnnotationRoot, BinaryOperatorAggregate, CompiledStateGraph } from "@langchain/langgraph";
import { RunnableConfig } from "@langchain/core/runnables";

export enum SearchAgent {
    YouTubeSearcher
}

export function GetAgent(
    agent: SearchAgent,
    llm: ChatOpenAI
) {
    switch (agent) {
        case SearchAgent.YouTubeSearcher:
            return createReactAgent({
                llm,
                tools: [
                    GetTool(AgentSearchTool.SearchYouTube),
                    GetTool(AgentSearchTool.SendVideosToUser)
                ],
                prompt: new SystemMessage(AgentSystemPrompts.youtubeSearcher)
            });
        }
}