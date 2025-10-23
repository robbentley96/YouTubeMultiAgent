import { Video } from "./video";

export interface ChatMessage {
    text: string;
    sender: 'ai' | 'human',
    id: string,
    videos?: Video[]
}