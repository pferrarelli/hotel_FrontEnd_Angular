import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Camera } from 'src/app/model/camera';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private cameraURI = 'http://localhost:8080/camera/';

  constructor(private http: HttpClient) { }

  getSize(inizio: string, fin: string, tipo: string): Observable<any>{
    return this.http.get<number>(this.cameraURI + 'size?from=' + inizio + '&to=' + fin + '&tipo=' + tipo).pipe(
      catchError(this.handleError('getNumeroSingole', []))
    );
  }

  getAll(page: number): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraURI + 'getCamere?pageNumber=' + page).pipe(
     catchError(this.handleError('getAll', []))
   );
   }

   contaCamere(): Observable<number>{
    return this.http.get<number>(this.cameraURI + 'conta');
  }

  rimuoviCamera(id: number): Observable<boolean>{
    return this.http.delete<any>(this.cameraURI + 'elimina?id=' + id.toString(), httpOptions);
  }

  addCamera(c: Camera): Observable<any> {
    return this.http.post(this.cameraURI + 'crea', c, httpOptions).pipe(
      catchError(this.handleError('addCamera', []))
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
