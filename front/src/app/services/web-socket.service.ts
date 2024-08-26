import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws!: WebSocket;
  private messageSubject = new Subject<any>();
  private errorSubject = new Subject<Event>();

  messages$ = this.messageSubject.asObservable();
  errors$ = this.errorSubject.asObservable();

  constructor() { }

  connect(url: string): void {
    if (this.ws) {
      this.ws.close();
    }
    this.ws = new WebSocket(url);

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageSubject.next(data);
      } catch (error) {
        console.error('Erreur de parsing des données:', error);
      }
    };

    this.ws.onopen = () => {
      console.log('Connexion WebSocket établie');
    };

    this.ws.onclose = () => {
      console.log('Connexion WebSocket fermée');
    };

    this.ws.onerror = (error) => {
      console.error('Erreur WebSocket :', error);
      this.errorSubject.next(error);
    };
  }

  send(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket n\'est pas connecté ou prêt à envoyer des données');
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined as any; // Réinitialiser la variable ws
    }
  }
}
