import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Signal {
  id: string;        // Format: S1, S2, etc.
  signalId: string;  // Nur die Nummer
  type: string;
  state: 'halt' | 'fahrt';
}

interface SignalContainer {
  type: string;
  title: string;
  signals: Signal[];
}

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private readonly STORAGE_KEY = 'signal-containers';
  private containers: SignalContainer[] = [];
  private signals: Signal[] = [];

  private containersSource = new BehaviorSubject<SignalContainer[]>(this.containers);
  currentContainers = this.containersSource.asObservable();

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    this.containers = saved ? JSON.parse(saved) : [
      { type: 'einfahrsignal', title: 'Einfahrsignal', signals: [] },
      { type: 'ausfahrsignal', title: 'Ausfahrsignal', signals: [] },
      { type: 'blocksignal', title: 'Blocksignal', signals: [] }
    ];
    this.containersSource.next(this.containers);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.containers));
  }

  isSignalIdUnique(id: string): boolean {
    return !this.signals.some(signal => signal.id === id);
  }

  saveSignal(signalData: { type: string, id: string, signalId: string }): boolean {
    if (!this.isSignalIdUnique(signalData.id)) {
      return false;
    }

    const container = this.containers.find(c => c.type === signalData.type);
    if (container) {
      const newSignal: Signal = {
        ...signalData,
        state: 'halt' // Standardzustand für neue Signale
      };
      container.signals.push(newSignal);
      this.containersSource.next([...this.containers]);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  addSignal(signal: Signal): boolean {
    if (this.isSignalIdUnique(signal.id)) {
      this.signals.push(signal);
      return true;
    }
    return false;
  }

  removeSignal(type: string, id: string): void {
    const container = this.containers.find(c => c.type === type);
    if (container) {
      container.signals = container.signals.filter(s => s.id !== id);
      this.containersSource.next([...this.containers]);
      this.saveToStorage();
    }
  }
}
