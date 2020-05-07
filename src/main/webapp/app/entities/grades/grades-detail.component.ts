import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrades } from 'app/shared/model/grades.model';

@Component({
  selector: 'jhi-grades-detail',
  templateUrl: './grades-detail.component.html'
})
export class GradesDetailComponent implements OnInit {
  grades: IGrades | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grades }) => (this.grades = grades));
  }

  previousState(): void {
    window.history.back();
  }
}
