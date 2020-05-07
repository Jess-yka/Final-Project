import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IGrades } from 'app/shared/model/grades.model';

type EntityResponseType = HttpResponse<IGrades>;
type EntityArrayResponseType = HttpResponse<IGrades[]>;

@Injectable({ providedIn: 'root' })
export class GradesService {
  public resourceUrl = SERVER_API_URL + 'api/grades';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/grades';

  constructor(protected http: HttpClient) {}

  create(grades: IGrades): Observable<EntityResponseType> {
    return this.http.post<IGrades>(this.resourceUrl, grades, { observe: 'response' });
  }

  update(grades: IGrades): Observable<EntityResponseType> {
    return this.http.put<IGrades>(this.resourceUrl, grades, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrades>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrades[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrades[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
