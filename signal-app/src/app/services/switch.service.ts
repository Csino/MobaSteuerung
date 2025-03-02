import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Switch {
  id: string;
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
    this.containersSource.next(this.containers);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.containers));
  }

  isSwitchIdUnique(id: string): boolean {
    return !this.switches.some(sw => sw.id === id);
  }

  addSwitch(sw: Switch): boolean {
    if (this.isSwitchIdUnique(sw.id)) {
      const container = this.containers.find(c => c.type === sw.type);
      if (container) {
        container.switches.push(sw);
        this.containersSource.next([...this.containers]);
        this.saveToStorage();
        return true;
      }
    }
    return false;
  }

  removeSwitch(type: string, id: string): void {
    const container = this.containers.find(c => c.type === type);
    if (container) {
      container.switches = container.switches.filter(s => s.id !== id);
      this.containersSource.next([...this.containers]);
      this.saveToStorage();
    }
  }
}
