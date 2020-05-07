import { IUnit } from 'app/shared/model/unit.model';
import { GradesEnum } from 'app/shared/model/enumerations/grades-enum.model';

export interface IGrades {
  id?: number;
  grades?: GradesEnum;
  unit?: IUnit;
}

export class Grades implements IGrades {
  constructor(public id?: number, public grades?: GradesEnum, public unit?: IUnit) {}
}
