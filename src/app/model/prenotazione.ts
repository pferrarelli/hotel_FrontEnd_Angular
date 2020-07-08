import { Camera } from './camera';
import { Cliente } from './cliente';

export class Prenotazione {
  id: number;
  codicePrenotazione: number;
  checkin: string;
  checkout: string;
  prezzoTotale: number;
  tipoServizio: string;
  cliente: Cliente;
  camere: Camera[];

  constructor(id?: number,
              codicePrenotazione?: number,
              checkin?: string,
              checkout?: string,
              prezzoTotale?: number,
              tipoServizio?: string,
              cliente?: Cliente,
              camere?: Camera[]){

                this.id = id;
                if (codicePrenotazione !== null && codicePrenotazione !== undefined){
                  this.codicePrenotazione = codicePrenotazione;
                }
                this.checkin = checkin;
                this.checkout = checkout;
                this.prezzoTotale = prezzoTotale;
                this.tipoServizio = tipoServizio;
                this.cliente = cliente;
                if (camere === undefined || camere == null){
                  this.camere = [];
                }else{
                  this.camere = camere;
                }
              }
}
