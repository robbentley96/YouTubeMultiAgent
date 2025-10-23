import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { SendMessageInput } from "../models/SendMessageInput";

export function GetChatHistoryFromInput(input: SendMessageInput): (HumanMessage | AIMessage)[] {
    let chatHistory: (HumanMessage | AIMessage)[] = [];
    input.messages.forEach((x) => {
        if(x.messageSender === 'ai') {
            if(x.message.length < 200) {
                chatHistory.push(new AIMessage(x.message));
            }
            else {
                chatHistory.push(new AIMessage(x.message));
            }
        }
        else {
            if(x.message.length < 200) {
                chatHistory.push(new HumanMessage(x.message));
            }
            else {
                chatHistory.push(new HumanMessage(x.message));
            }
        }
    });
    return chatHistory;
}