import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGrades, Grades } from 'app/shared/model/grades.model';
import { GradesService } from './grades.service';
import { IUnit } from 'app/shared/model/unit.model';
import { UnitService } from 'app/entities/unit/unit.service';

@Component({
  selector: 'jhi-grades-update',
  templateUrl: './grades-update.component.html'
})
export class GradesUpdateComponent implements OnInit {
  isSaving = false;
  units: IUnit[] = [];

  editForm = this.fb.group({
    id: [],
    grades: [],
    unit: []
  });

  constructor(
    protected gradesService: GradesService,
    protected unitService: UnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grades }) => {
      this.updateForm(grades);

      this.unitService.query().subscribe((res: HttpResponse<IUnit[]>) => (this.units = res.body || []));
    });
  }

  updateForm(grades: IGrades): void {
    this.editForm.patchValue({
      id: grades.id,
      grades: grades.grades,
      unit: grades.unit
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grades = this.createFromForm();
    if (grades.id !== undefined) {
      this.subscribeToSaveResponse(this.gradesService.update(grades));
    } else {
      this.subscribeToSaveResponse(this.gradesService.create(grades));
    }
  }

  private createFromForm(): IGrades {
    return {
      ...new Grades(),
      id: this.editForm.get(['id'])!.value,
      grades: this.editForm.get(['grades'])!.value,
      unit: this.editForm.get(['unit'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrades>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUnit): any {
    return item.id;
  }
}
