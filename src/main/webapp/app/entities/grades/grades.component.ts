import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGrades } from 'app/shared/model/grades.model';
import { GradesService } from './grades.service';
import { GradesDeleteDialogComponent } from './grades-delete-dialog.component';

@Component({
  selector: 'jhi-grades',
  templateUrl: './grades.component.html'
})
export class GradesComponent implements OnInit, OnDestroy {
  grades?: IGrades[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected gradesService: GradesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.gradesService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IGrades[]>) => (this.grades = res.body || []));
      return;
    }

    this.gradesService.query().subscribe((res: HttpResponse<IGrades[]>) => (this.grades = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGrades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGrades): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGrades(): void {
    this.eventSubscriber = this.eventManager.subscribe('gradesListModification', () => this.loadAll());
  }

  delete(grades: IGrades): void {
    const modalRef = this.modalService.open(GradesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.grades = grades;
  }
}
