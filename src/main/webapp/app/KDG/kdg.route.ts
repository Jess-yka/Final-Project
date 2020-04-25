import { Route } from '@angular/router';

import { KdgComponent } from './kdg.component';

export const KDG_ROUTE: Route = {
path: 'KDG',
component: KdgComponent,
data: {
authorities: [],
pageTitle: 'Welcome, Java Hipster!'
}
};
