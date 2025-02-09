import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SignalData {
  id: string;
  type: string;
}

interface SignalContainer {
  type: string;
  title: string;
  signals: SignalData[];
}

@Injectable({
  providedIn: 'root'
})
export class ControlCreateService {
  private containers: SignalContainer[] = [
    { type: 'einfahrsignal', title: 'Einfahrsignal', signals: [] },
    { type: 'ausfahrsignal', title: 'Ausfahrsignal', signals: [] },
    { type: 'blocksignal', title: 'Blocksignal', signals: [] }
  ];

  private containersSource = new BehaviorSubject<SignalContainer[]>(this.containers);
  currentContainers = this.containersSource.asObservable();

  updateSignalData(data: SignalData) {
    if (data.type && data.id) {
      const container = this.containers.find(c => c.type === data.type);
      if (container && !container.signals.find(s => s.id === data.id)) {
        container.signals.push(data);
        this.containersSource.next(this.containers);
      }
    }
  }

  removeSignal(type: string, id: string) {
    const container = this.containers.find(c => c.type === type);
    if (container) {
      container.signals = container.signals.filter(s => s.id !== id);
      this.containersSource.next(this.containers);
    }
  }

  saveSignal(signalData: { type: string, id: string }) {
    const container = this.containers.find(c => c.type === signalData.type);
    if (container && !container.signals.find(s => s.id === signalData.id)) {
      container.signals.push(signalData);
      this.containersSource.next([...this.containers]); // Emit new value to trigger updates
      console.log('Signal saved:', signalData);
      console.log('Current containers:', this.containers);
    }
  }
}
