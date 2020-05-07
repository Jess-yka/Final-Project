import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { NewheightsSharedModule } from 'app/shared/shared.module';
import { NewheightsCoreModule } from 'app/core/core.module';
import { NewheightsAppRoutingModule } from './app-routing.module';
import { NewheightsHomeModule } from './home/home.module';
import { NewheightsEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    NewheightsSharedModule,
    NewheightsCoreModule,
    NewheightsHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    NewheightsEntityModule,
    NewheightsAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class NewheightsAppModule {}
