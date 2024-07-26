import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketService } from './web-socket.service';

export interface Message {
  name: string;
  text: string;
  time: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new Subject<Message>();
  public messages$ = this.messagesSubject.asObservable();

  private readonly URL = "ws://localhost:8080/ws";

  constructor(private websocketService: WebSocketService) {
    this.websocketService.messages$.subscribe(
      (message: Message) => this.messagesSubject.next(message)
    );
  }

  public connect() {
    this.websocketService.connect(this.URL);
  }

  public disconnect() {
    this.websocketService.disconnect();
  }

  public sendMessage(message: Message) {
    this.websocketService.send(message);
  }
}
