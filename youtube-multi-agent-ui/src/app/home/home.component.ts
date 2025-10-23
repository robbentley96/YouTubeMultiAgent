import { Component } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-home',
  imports: [
    ChatWindowComponent,
    ChatInputComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
