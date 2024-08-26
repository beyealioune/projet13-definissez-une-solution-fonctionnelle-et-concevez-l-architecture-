import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public username: string = '';
  public text: string = '';
  public connected: boolean = false;
  public messages: Message[] = []; // Combined list of messages

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.messages$.subscribe(
      (message: Message) => {
        this.messages.push(message); // Add incoming messages to the combined list
        this.messages.sort((a, b) => a.time.getTime() - b.time.getTime()); // Sort by time
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
      this.messages.push(message); // Add sent message to the combined list
      this.messages.sort((a, b) => a.time.getTime() - b.time.getTime()); // Sort by time
      this.text = '';
    }
  }
}
