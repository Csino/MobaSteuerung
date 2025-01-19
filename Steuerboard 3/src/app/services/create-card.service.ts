import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum SignalTyp {
  EINFAHRT = 'EINFAHRT',
  AUSFAHRT = 'AUSFAHRT',
  BLOCK = 'BLOCK'
}

export interface ISignal {
  id: number;
  bezeichnung: string;
  typ: SignalTyp;
  aspekte: string[];
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateCardService {

    signalCreated = new EventEmitter<{type: string, id: string}>();

  private signale = new BehaviorSubject<ISignal[]>([
    {
      id: 1,
      bezeichnung: 'Einfahrsignal Nord',
      typ: SignalTyp.EINFAHRT,
      aspekte: ['Hp0', 'Hp1', 'Hp2'],
      status: 'Hp0'
    }
  ]);

  getSignale(): Observable<ISignal[]> {
    return this.signale.asObservable();
  }

  setSignalStatus(signalId: number, neuerStatus: string): void {
    const aktuelleSignale = this.signale.getValue();
    const aktualisierteSignale = aktuelleSignale.map(signal => 
      signal.id === signalId ? { ...signal, status: neuerStatus } : signal
    );
    this.signale.next(aktualisierteSignale);
  }
}
