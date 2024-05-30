import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService as NgxMqttService, IMqttServiceOptions } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttMobaService {

  private options: IMqttServiceOptions = {
    // Setzen Sie hier Ihre MQTT-Serverdaten ein
    hostname: 'dein.mqtt.broker',
    port: 1883,
    path: '/mqtt'
  };

  constructor(private _mqttService: NgxMqttService) {
    this._mqttService.connect(this.options);
  }

  // Abonnieren eines Topics
  public subscribeToTopic(topic: string): Observable<IMqttMessage> {
    return this._mqttService.observe(topic);
  }

  // Senden einer Nachricht an ein Topic
  public publishMessage(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  // Trennen der Verbindung
  public disconnect(): void {
    this._mqttService.disconnect();
  }
}
