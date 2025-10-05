import { Injectable, signal, computed } from '@angular/core';

export interface Signal {
  id: string;        // Format: S1, S2, etc.
  signalId: string;  // Nur die Nummer
  type: 'blocksignal' | 'einfahrsignal' | 'ausfahrsignal' | 'vorsignal';
  state: 'halt' | 'fahrt';
  switches?: string[];  // Optionales Array für assoziierte Weichen
}

interface SignalContainer {
  type: 'blocksignal' | 'einfahrsignal' | 'ausfahrsignal' | 'vorsignal';
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

  private containersSignal = signal<SignalContainer[]>(this.containers);
  currentContainers = computed(() => this.containersSignal());

  private readonly defaultContainers: SignalContainer[] = [
    { type: 'einfahrsignal', title: 'Einfahrsignal', signals: [] },
    { type: 'ausfahrsignal', title: 'Ausfahrsignal', signals: [] },
    { type: 'blocksignal', title: 'Blocksignal', signals: [] },
    { type: 'vorsignal', title: 'Vorsignal', signals: [] }
  ];

  constructor() {
    // Versuche die gespeicherten Daten zu laden
    const saved = localStorage.getItem(this.STORAGE_KEY);
    
    try {
      if (saved) {
        const parsedData = JSON.parse(saved);
        // Überprüfe, ob die geladenen Daten gültig sind
        if (Array.isArray(parsedData) && 
            parsedData.every(container => 
              container.type && 
              container.title && 
              Array.isArray(container.signals)
            )) {
          this.containers = parsedData;
          // Stelle sicher, dass alle erforderlichen Container vorhanden sind
          this.defaultContainers.forEach(defaultContainer => {
            if (!this.containers.find(c => c.type === defaultContainer.type)) {
              this.containers.push({...defaultContainer});
            }
          });
        } else {
          throw new Error('Ungültige Datenstruktur');
        }
      } else {
        this.containers = [...this.defaultContainers];
      }
    } catch (e) {
      console.warn('Fehler beim Laden der Daten:', e);
      this.containers = [...this.defaultContainers];
    }

    // Signals aus allen Containern sammeln
    this.signals = [];
    this.containers.forEach(container => {
      this.signals.push(...container.signals);
    });
    
    // Initialisiere das Signal
    this.containersSignal.set(this.containers);
    console.log('Initialisierte Container:', this.containers);
    
    // Speichere die initialisierten Container
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.containers));
    this.containersSignal.set([...this.containers]);
  }

  isSignalIdUnique(id: string): boolean {
    return !this.signals.some(signal => signal.id === id);
  }

  hasSignalWithId(id: string): boolean {
    const formattedId = `S${id}`;
    return this.signals.some(signal => signal.id === formattedId);
  }

  saveSignal(signalData: { type: 'blocksignal' | 'einfahrsignal' | 'ausfahrsignal' | 'vorsignal', id: string, signalId: string, switches?: string[] }): boolean {
    console.log('Saving signal:', signalData);
    
    if (!this.isSignalIdUnique(signalData.id)) {
      console.log('Signal ID already exists');
      return false;
    }

    const container = this.containers.find(c => c.type === signalData.type);
    if (container) {
      const newSignal: Signal = {
        ...signalData,
        state: 'halt',
        switches: signalData.switches || []
      };
      
      // Füge das Signal sowohl zum Container als auch zur signals-Liste hinzu
      container.signals.push(newSignal);
      this.signals.push(newSignal);
      
      // Aktualisiere den State und speichere
      this.containersSignal.set([...this.containers]);
      this.saveToStorage();
      
      console.log('Signal saved successfully');
      console.log('Updated containers:', this.containers);
      return true;
    }
    console.log('No container found for type:', signalData.type);
    return false;
  }

  addSignal(signal: Signal): boolean {
    if (this.isSignalIdUnique(signal.id)) {
      const newSignal: Signal = {
        ...signal,
        state: signal.state || 'halt'
      };
      this.signals.push(newSignal);
      return true;
    }
    return false;
  }

  removeSignal(type: string, id: string): void {
    const container = this.containers.find(c => c.type === type);
    if (container) {
      container.signals = container.signals.filter(s => s.id !== id);
      this.containersSignal.set([...this.containers]);
      this.saveToStorage();
    }
  }
}
