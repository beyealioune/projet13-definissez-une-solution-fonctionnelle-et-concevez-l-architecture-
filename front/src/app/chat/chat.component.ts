import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public username: string = '';
  public text: string = '';
  public connected: boolean = false;
  public sent: Message[] = [];
  public received: Message[] = [];

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.messages$.subscribe(
      (message: Message) => {
        // Distinguish between sent and received messages
        if (message.name === this.username) {
          this.sent.push(message);
        } else {
          this.received.push(message);
        }
      },
      (error) => {
        console.error('Erreur reçue depuis le service de chat:', error);
      }
    );
  }

  connect() {
    this.chatService.connect();
    this.connected = true;
  }

  disconnect() {
    this.chatService.disconnect();
    this.connected = false;
  }

  sendMessage() {
    if (this.text.trim()) {
      const message: Message = {
        name: this.username,
        text: this.text,
        time: new Date()
      };
      this.chatService.sendMessage(message);
      this.sent.push(message); // Add to sent messages
      this.text = '';
    }
  }
}
