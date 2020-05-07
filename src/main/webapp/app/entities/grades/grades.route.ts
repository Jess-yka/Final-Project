import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGrades, Grades } from 'app/shared/model/grades.model';
import { GradesService } from './grades.service';
import { GradesComponent } from './grades.component';
import { GradesDetailComponent } from './grades-detail.component';
import { GradesUpdateComponent } from './grades-update.component';

@Injectable({ providedIn: 'root' })
export class GradesResolve implements Resolve<IGrades> {
  constructor(private service: GradesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGrades> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((grades: HttpResponse<Grades>) => {
          if (grades.body) {
            return of(grades.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Grades());
  }
}

export const gradesRoute: Routes = [
  {
    path: '',
    component: GradesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Grades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GradesDetailComponent,
    resolve: {
      grades: GradesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Grades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GradesUpdateComponent,
    resolve: {
      grades: GradesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Grades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GradesUpdateComponent,
    resolve: {
      grades: GradesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Grades'
    },
    canActivate: [UserRouteAccessService]
  }
];
