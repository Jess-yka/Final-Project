import { UnitType } from 'app/shared/model/enumerations/unit-type.model';

export interface IUnit {
  id?: number;
  unitenum?: UnitType;
  name?: string;
  text?: string;
  comments?: string;
}

export class Unit implements IUnit {
  constructor(public id?: number, public unitenum?: UnitType, public name?: string, public text?: string, public comments?: string) {}
}
