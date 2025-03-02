import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SwitchData {
  id: string;
  type: string;
}

interface SwitchContainer {
  type: string;
  title: string;
  switches: SwitchData[];
}

@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  private readonly STORAGE_KEY = 'switch-containers';
  private containers: SwitchContainer[] = [];

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
    return !this.containers.some(container => 
      container.switches.some(switch_ => switch_.id === id)
    );
  }

  saveSwitch(switchData: { type: string, id: string }): boolean {
    if (!this.isSwitchIdUnique(switchData.id)) {
      return false;
    }

    const container = this.containers.find(c => c.type === switchData.type);
    if (container) {
      container.switches.push(switchData);
      this.containersSource.next([...this.containers]);
      this.saveToStorage();
      return true;
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
