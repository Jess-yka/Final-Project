import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGrades } from 'app/shared/model/grades.model';
import { GradesService } from './grades.service';

@Component({
  templateUrl: './grades-delete-dialog.component.html'
})
export class GradesDeleteDialogComponent {
  grades?: IGrades;

  constructor(protected gradesService: GradesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gradesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gradesListModification');
      this.activeModal.close();
    });
  }
}
