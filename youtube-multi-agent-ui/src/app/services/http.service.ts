import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendMessageInput } from '../models/sendMessageInput';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  SendMessage(questionRequest: SendMessageInput): Observable<string> {
    const fullUrl = `${environment.LLM_INTEGRATION_URL}/SendMessage`;
    return this.createStream(fullUrl, questionRequest);
  }

  private createStream(url: string, body: SendMessageInput): Observable<any> {
    return new Observable<string>((observer: Observer<string>) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.responseType = 'text';

      let previousLength = 0;

      xhr.onprogress = (event) => {
        const target = event.currentTarget as XMLHttpRequest;
        if (target && target.response) {
          const newChunk = target.response.substring(previousLength);
          previousLength = target.response.length;
          observer.next(newChunk as any);
        }
      };

      xhr.onload = () => {
        observer.complete();
      };

      xhr.onerror = (error) => {
        console.error('Error in stream', error);
        observer.error(error);
      };

      xhr.send(JSON.stringify(body));

      return () => {
        xhr.abort();
      };
    });
  }

  getVideos(videos: string[]): Observable<Video[]> {
    return this.http.post<Video[]>(`${environment.API_URL}/YouTube/GetVideos`, { videoIds: videos});
  }
}
