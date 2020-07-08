import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/model/cliente';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteURI = 'http://localhost:8080/cliente/';

  constructor(private http: HttpClient) { }

  getCliente(email: string): Observable<Cliente>{
    return this.http.get<any>(this.clienteURI + 'uno?email=' + email).pipe(
      catchError(this.handleError('getCliente', []))
    );
  }

  addCliente(cli: Cliente): Observable<any> {
    return this.http.post(this.clienteURI, cli, httpOptions).pipe(
      catchError(this.handleError('addCliente', []))
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

