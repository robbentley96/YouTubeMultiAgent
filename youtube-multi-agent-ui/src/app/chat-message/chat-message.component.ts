import { Component, Input } from '@angular/core';
import { ChatMessage } from '../models/chatMessage';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { VideoComponent } from '../video/video.component';

@Component({
  selector: 'app-chat-message',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    VideoComponent
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  @Input() message!: ChatMessage;
}
