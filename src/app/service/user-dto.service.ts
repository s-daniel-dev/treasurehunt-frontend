import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDtoService {

  private name: string;
  private lifeLeft: number;
  private record: number | null;

  constructor() {
      this.name = "";
      this.lifeLeft = 0;
      this.record = null;
  }

  public getName(): string {
      return this.name;
  }
  public setName(name: string) {
      this.name = name;
  }

  public getLifeLeft(): number {
      return this.lifeLeft;
  }
  public setLifeLeft(lifeLeft: number) {
      this.lifeLeft = lifeLeft;
  }

  public getRecord(): number | null {
      return this.record;
  }
  public setRecord(record: number | null) {
      this.record = record;
  }
}
