import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {

  messageText: string = '';

  constructor(private messageService: MessageService) {

  }

  onSendMessage() {
    this.messageService.sendMessage(this.messageText);
    this.messageText = '';
  }
}
