import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Prenotazione } from 'src/app/model/prenotazione';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private prenotazioneURI = 'http://localhost:8080/prenotazione/';

  constructor(private http: HttpClient) { }

  addPrenotazione(p: Prenotazione, doppie: number, singole: number, matrimoniali: number, triple: number): Observable<any> {
    return this.http.post(this.prenotazioneURI + 'crea?nrDoppie=' + doppie +
                          '&nrSingole=' + singole +
                          '&nrMatrimoniali=' + matrimoniali +
                          '&nrTriple=' + triple, p, httpOptions).pipe(
      catchError(this.handleError('addPrenotazione', []))
    );
  }

  rimuoviPrenotazione(cod: number): Observable<boolean>{
    return this.http.delete<any>(this.prenotazioneURI + 'elimina?codice=' + cod.toString(), httpOptions);
  }

  cercaConCodice(codice: string): Observable<Prenotazione>{
    return this.http.get<Prenotazione>(this.prenotazioneURI + 'codice?code=' + codice);
  }

  getPrenotazioni(page: number): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.prenotazioneURI + 'mostra?pageNumber=' + page).pipe(
     catchError(this.handleError('getPrenotazioni', []))
   );
   }

   getByCheckOut(page: number): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.prenotazioneURI + 'byCheckOut?pageNumber=' + page).pipe(
      catchError(this.handleError('getPrenotazioni', []))
    );
   }

   conta(): Observable<number>{
     return this.http.get<number>(this.prenotazioneURI + 'conta');
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
