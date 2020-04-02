import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { HipsterhackSharedModule } from 'app/shared/shared.module';
import { HipsterhackCoreModule } from 'app/core/core.module';
import { HipsterhackAppRoutingModule } from './app-routing.module';
import { HipsterhackHomeModule } from './home/home.module';
import { HipsterhackEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    HipsterhackSharedModule,
    HipsterhackCoreModule,
    HipsterhackHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    HipsterhackEntityModule,
    HipsterhackAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class HipsterhackAppModule {}
