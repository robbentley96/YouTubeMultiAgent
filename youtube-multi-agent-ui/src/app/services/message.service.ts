import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chatMessage';
import { v4 as uuidv4} from 'uuid';
import { HttpService } from './http.service';
import { ChatMessageInput } from '../models/sendMessageInput';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private updateChatSubject = new Subject<void>();
  updateChatEvent$ = this.updateChatSubject.asObservable();
  private messages: ChatMessage[] = [];

  constructor(private httpService: HttpService) { }

  sendMessage(text: string) {
    this.messages.push({ id: uuidv4(), text: text, sender: 'human'});
    this.updateChatSubject.next();
    const responseId = uuidv4();
    this.messages.push({ id: responseId, text: '', sender: 'ai'});
    this.httpService.SendMessage({ messages: this.formatMessages()}).subscribe({
      next: chunk => {
        this.processChunk(chunk, responseId);
        this.updateChatSubject.next();
      },
      error: err => console.error(err),
      complete: () => {
        
      }
    })
  }

  formatMessages(): ChatMessageInput[] {
    return this.messages.filter(x => x.text !== '').map(msg => ({
      messageSender: msg.sender,
      message: msg.text
    }));
  }

  getMessages() {
    return this.messages;
  }

  processStructuredResponse(structuredResponse: string, messageId: string) {
    let structuredResponseJson = JSON.parse(structuredResponse);
    let videoIds = JSON.parse(structuredResponseJson.input);
    this.httpService.getVideos(videoIds.videoIds).subscribe(v => {
      this.messages.filter(x => x.id == messageId)[0].videos = v;
      this.updateChatSubject.next();
    })
  }

  processChunk(chunk: string, responseId: string) {
    const jsonStartMarker = "STRUCTURED_VIDEO_RESPONSE:";
    const jsonEndMarker = "END_OF_STRUCTURED_RESPONSE";
    if(chunk.includes(jsonStartMarker) && chunk.includes(jsonEndMarker)) {
          const startIndex = chunk.indexOf(jsonStartMarker);
          const endIndex = chunk.indexOf(jsonEndMarker);

          if(startIndex !== 0) {
            this.messages.filter(x => x.id == responseId)[0].text += chunk.slice(0, startIndex);
          }

          this.processStructuredResponse(chunk.slice(startIndex + jsonStartMarker.length, endIndex), responseId);

          this.messages.filter(x => x.id == responseId)[0].text += chunk.slice(endIndex + jsonEndMarker.length);
          
        } else {
          this.messages.filter(x => x.id == responseId)[0].text += chunk;
        }
  }
}
