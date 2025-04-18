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
    // Signals aus allen Containern sammeln
    this.signals = [];
    this.containers.forEach(container => {
      this.signals.push(...container.signals);
    });
    this.containersSource.next(this.containers);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.containers));
  }

  isSignalIdUnique(id: string): boolean {
    return !this.signals.some(signal => signal.id === id);
  }

  hasSignalWithId(id: string): boolean {
    const formattedId = `S${id}`;
    return this.signals.some(signal => signal.id === formattedId);
  }

  saveSignal(signalData: { type: string, id: string, signalId: string }): boolean {
    console.log('Saving signal:', signalData);
    
    if (!this.isSignalIdUnique(signalData.id)) {
      console.log('Signal ID already exists');
      return false;
    }

    const container = this.containers.find(c => c.type === signalData.type);
    if (container) {
      const newSignal: Signal = {
        ...signalData,
        state: 'halt'
      };
      
      // Füge das Signal sowohl zum Container als auch zur signals-Liste hinzu
      container.signals.push(newSignal);
      this.signals.push(newSignal);
      
      this.containersSource.next([...this.containers]);
      this.saveToStorage();
      console.log('Signal saved successfully');
      return true;
    }
    console.log('No container found for type:', signalData.type);
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
