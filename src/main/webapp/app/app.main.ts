import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { HipsterhackAppModule } from './app.module';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(HipsterhackAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('Application started'))
  .catch(err => console.error(err));
