import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chatMessage';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat-window',
  imports: [
    ChatMessageComponent
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit {
  
  messages: ChatMessage[] = [];

  constructor(private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.messageService.updateChatEvent$.subscribe(() => {
      this.messages = this.messageService.getMessages();
    });
  }
}
