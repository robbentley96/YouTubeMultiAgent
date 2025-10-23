

export interface SendMessageInput {
    messages: ChatMessageInput[];
}

export interface ChatMessageInput {
    message: string,
    messageSender: 'ai' | 'human'
}