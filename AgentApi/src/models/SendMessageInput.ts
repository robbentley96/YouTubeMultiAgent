export interface SendMessageInput {
    messages: ChatHistoryEntry[];
}

export interface ChatHistoryEntry {
    message: string;
    messageSender: 'ai' | 'human'
}