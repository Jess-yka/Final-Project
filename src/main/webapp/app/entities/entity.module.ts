import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'unit',
        loadChildren: () => import('./unit/unit.module').then(m => m.HipsterhackUnitModule)
      },
      {
        path: 'grades',
        loadChildren: () => import('./grades/grades.module').then(m => m.HipsterhackGradesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class HipsterhackEntityModule {}
