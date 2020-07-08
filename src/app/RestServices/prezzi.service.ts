import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Prezzi } from '../model/prezzi';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PrezziService {

  private prezziURI = 'http://localhost:8080/prezzi/';

  constructor(private http: HttpClient) { }

  getPrezzi(): Observable<Prezzi>{
    return this.http.get<any>(this.prezziURI).pipe(
      catchError(this.handleError('getPrezzi', []))
    );
  }

  modificaPrezzi(p: Prezzi): Observable<any> {
    return this.http.post(this.prezziURI + 'modifica', p, httpOptions).pipe(
      catchError(this.handleError('modificaPrezzi', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('HeroService: ' + message);
  }
}
