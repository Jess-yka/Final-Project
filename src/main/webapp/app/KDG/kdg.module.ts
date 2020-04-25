import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipsterhackSharedModule } from 'app/shared/shared.module';
import { KDG_ROUTE } from './kdg.route';
import { KdgComponent } from './kdg.component';

@NgModule({
imports: [HipsterhackSharedModule, RouterModule.forChild([KDG_ROUTE])],
  declarations: [KdgComponent]
})
export class HipsterhackHomeModule {}
