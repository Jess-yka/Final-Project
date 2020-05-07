import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipsterhackSharedModule } from 'app/shared/shared.module';
import { GradesComponent } from './grades.component';
import { GradesDetailComponent } from './grades-detail.component';
import { GradesUpdateComponent } from './grades-update.component';
import { GradesDeleteDialogComponent } from './grades-delete-dialog.component';
import { gradesRoute } from './grades.route';

@NgModule({
  imports: [HipsterhackSharedModule, RouterModule.forChild(gradesRoute)],
  declarations: [GradesComponent, GradesDetailComponent, GradesUpdateComponent, GradesDeleteDialogComponent],
  entryComponents: [GradesDeleteDialogComponent]
})
export class HipsterhackGradesModule {}
