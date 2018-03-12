import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class PmLocateService {

  constructor(private http: HttpClient) { }

  private pmLocateUrl = 'api/routes';

  getQueryResults(type: string, serial:string): Observable<any> {
    const url = `${this.pmLocateUrl}/${type}/${serial}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
}
