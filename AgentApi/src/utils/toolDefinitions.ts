import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { SearchYouTube } from "./youtubeSearch";

export enum AgentSearchTool {
    SearchYouTube,
    SendVideosToUser
}

export function GetTool(tool: AgentSearchTool): DynamicStructuredTool {
    switch (tool) {
        case AgentSearchTool.SearchYouTube:
            return new DynamicStructuredTool({
                name: "SearchYouTube",
                description: "Use this tool to search YouTube for videos",
                schema: z.object({
                    query: z.string().describe("The search query to return relevant videos"),
                    duration: z.string().describe("The approximate duration of the video. Valid values are 'short','medium','long','any'")
                }),
                func: async (data: { query, duration }) => {
                    let result = await SearchYouTube(data.query, data.duration);
                    return JSON.stringify(result);
                } 
            });
        case AgentSearchTool.SendVideosToUser:
            return new DynamicStructuredTool({
                name: "SendVideosToUser",
                description: "Use this tool to send videos to the user so that they can view them",
                schema: z.object({
                    videoIds: z.array(z.string()).describe("List of videoIds to send to user")
                }),
                func: async (data: { videoIds }) => {} 
            });
    }
}