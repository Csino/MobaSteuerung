import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Switch {
  id: string;        // Format: W1, W2, etc.
  type: string;
  position: 'gerade' | 'abzweig';
}

interface SwitchContainer {
  type: string;
  title: string;
  switches: Switch[];
}

@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  private readonly STORAGE_KEY = 'switch-containers';
  private containers: SwitchContainer[] = [];
  private switches: Switch[] = [];

  private containersSource = new BehaviorSubject<SwitchContainer[]>(this.containers);
  currentContainers = this.containersSource.asObservable();

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    this.containers = saved ? JSON.parse(saved) : [
      { type: 'rechtsweiche', title: 'Rechtsweiche', switches: [] },
      { type: 'linksweiche', title: 'Linksweiche', switches: [] },
      { type: 'doppelkreuzweiche', title: 'Doppelkreuzweiche', switches: [] }
    ];
    // Switches aus allen Containern sammeln
    this.switches = [];
    this.containers.forEach(container => {
      this.switches.push(...container.switches);
    });
    this.containersSource.next(this.containers);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.containers));
  }

  isSwitchIdUnique(id: string): boolean {
    return !this.switches.some(sw => sw.id === id);
  }

  hasSwitchWithId(id: string): boolean {
    const formattedId = `W${id}`;
    return this.switches.some(sw => sw.id === formattedId);
  }

  private validateSwitchData(switchData: { type: string; id: string; position: 'gerade' | 'abzweig' }): boolean {
    const validTypes = ['rechtsweiche', 'linksweiche', 'doppelkreuzweiche'];
    if (!validTypes.includes(switchData.type)) {
      console.error(`Invalid switch type: ${switchData.type}`);
      return false;
    }
    
    if (!/^W\d+$/.test(switchData.id)) {
      console.error('Switch ID must be in format "W" followed by numbers');
      return false;
    }
    
    return true;
  }

  saveSwitch(switchData: { type: string; id: string; position: 'gerade' | 'abzweig' }): boolean {
    if (!this.validateSwitchData(switchData)) {
      return false;
    }
    console.log('Saving switch:', switchData);
    
    // Prüfe ob die ID bereits existiert
    if (!this.isSwitchIdUnique(switchData.id)) {
      console.log('Switch ID already exists');
      return false;
    }

    // Finde den richtigen Container
    const container = this.containers.find(c => c.type === switchData.type);
    console.log('Container found:', container);

    if (!container) {
      console.log('No container found for type:', switchData.type);
      return false;
    }

    const newSwitch: Switch = {
      type: switchData.type,
      id: switchData.id,
      position: switchData.position
    };
    
    // Füge die neue Weiche hinzu
    container.switches.push(newSwitch);
    this.switches.push(newSwitch);
    
    // Aktualisiere die Anzeige und speichere
    this.containersSource.next([...this.containers]);
    this.saveToStorage();
    console.log('Switch saved successfully');
    return true;
  }

  addSwitch(sw: Switch): boolean {
    return this.saveSwitch(sw);  // Verwende saveSwitch für Konsistenz
  }

  removeSwitch(type: string, id: string): void {
    const container = this.containers.find(c => c.type === type);
    if (container) {
      container.switches = container.switches.filter(s => s.id !== id);
      // Aktualisiere auch das zentrale switches-Array
      this.switches = this.switches.filter(s => s.id !== id);
      this.containersSource.next([...this.containers]);
      this.saveToStorage();
    }
  }

  toggleSwitchPosition(type: string, id: string): boolean {
    const container = this.containers.find(c => c.type === type);
    if (!container) {
      console.error(`Container with type ${type} not found`);
      return false;
    }

    const switchItem = container.switches.find(s => s.id === id);
    if (!switchItem) {
      console.error(`Switch with id ${id} not found`);
      return false;
    }

    switchItem.position = switchItem.position === 'gerade' ? 'abzweig' : 'gerade';
    this.containersSource.next([...this.containers]);
    this.saveToStorage();
    return true;
  }
}
