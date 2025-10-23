import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { SendMessageInput } from "../models/SendMessageInput";
import { InitialiseOpenAIModel } from "../utils/aiModels";
import { GetAgent, SearchAgent } from "../utils/agentDefinitions";
import { GetChatHistoryFromInput } from "../utils/messagingUtil";
import { Readable } from "stream";

export async function SendMessage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const requestBody = (await request.json()) as SendMessageInput;
    const model = InitialiseOpenAIModel();

    const youtubeAgent = GetAgent(SearchAgent.YouTubeSearcher, model);

    const history = GetChatHistoryFromInput(requestBody);

    const eventStream = youtubeAgent.streamEvents(
        {messages: history},
        { version: "v2", recursionLimit: 100 }
    );

    const responseStream = new Readable({
        read() {}
    });

    (async () => {
        for await (const { event, tags, data } of eventStream) {
            if(event === "on_chat_model_stream") {
                if(data.chunk && data.chunk.content) {
                    responseStream.push(data.chunk.content);
                }
            }
            else if(event === "on_tool_end") {
                if(data.output?.name === "SendVideosToUser") {
                    responseStream.push(`STRUCTURED_VIDEO_RESPONSE:${JSON.stringify(data.input)}END_OF_STRUCTURED_RESPONSE`);
                }
            }
        }
        responseStream.push(null);
        
    })();

    return { body: responseStream };
};

app.http('SendMessage', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: SendMessage
});
