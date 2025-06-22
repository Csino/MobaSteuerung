import { Injectable } from '@angular/core';
import mqtt from 'mqtt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private client!: mqtt.MqttClient;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  public connectionStatus$ = new BehaviorSubject<'connected' | 'disconnected' | 'error'>('disconnected');

  constructor() {
    this.connectToBroker();
  }

  private connectToBroker(): void {
    const options = {
      protocol: 'ws' as 'ws',
      hostname: '192.168.2.129',
      port: 8083,  // MQTT-WebSocket Port
      path: '/mqtt',   // Typischer WebSocket-Pfad für MQTT
      clientId: `mqtt_${Math.random().toString(16).slice(2, 10)}`,
      keepalive: 60,
      connectTimeout: 4000,
      reconnectPeriod: 5000,
      clean: true
    };

    try {
      const wsUrl = `ws://${options.hostname}:${options.port}${options.path}`;
      console.log('Versuche Verbindung zu:', wsUrl);
      
      this.client = mqtt.connect(wsUrl, options);

      this.client.on('connect', () => {
        console.log('MQTT WebSocket verbunden');
        this.reconnectAttempts = 0;
        this.connectionStatus$.next('connected');
        this.subscribeToTopic('/Moba/ESPNetzwerk');
      });

      this.client.on('disconnect', () => {
        console.log('MQTT WebSocket getrennt');
        this.connectionStatus$.next('disconnected');
      });

      this.client.on('error', (error) => {
        console.error('MQTT WebSocket Fehler:', error);
        this.connectionStatus$.next('error');
        this.handleConnectionError();
      });

      this.client.on('offline', () => {
        console.log('MQTT WebSocket offline');
        this.connectionStatus$.next('disconnected');
      });

    } catch (error) {
      console.error('WebSocket Verbindungsfehler:', error);
      this.handleConnectionError();
    }
  }

  private handleConnectionError(): void {
    this.reconnectAttempts++;
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      console.log(`Verbindungsversuch ${this.reconnectAttempts} von ${this.maxReconnectAttempts}`);
      setTimeout(() => this.connectToBroker(), 5000);
    } else {
      console.error('Maximale Anzahl an Verbindungsversuchen erreicht');
    }
  }

  private subscribeToTopic(topic: string): void {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to topic ${topic}:`, err);
      } else {
        console.log(`Subscribed to topic ${topic}`);
      }
    });
  }

  public publishMessage(topic: string, message: string): void {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error(`Failed to publish message to topic ${topic}:`, err);
      } else {
        console.log(`Message published to topic ${topic}: ${message}`);
      }
    });
  }
}
