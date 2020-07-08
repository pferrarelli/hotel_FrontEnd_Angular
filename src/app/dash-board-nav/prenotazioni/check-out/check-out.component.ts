import { Component, OnInit } from '@angular/core';
import { Prenotazione } from 'src/app/model/prenotazione';
import { PrenotazioneService } from 'src/app/RestServices/PrenotazioneService/prenotazione.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  i: number;
  pagina = 0;
  pagTot = 0;
  sostituto: Prenotazione[];
  prenotazioni: Prenotazione[];

  constructor(private pService: PrenotazioneService) { }

  ngOnInit(): void {
    this.pService.conta().subscribe(val => {this.pagTot = Math.floor(val / 10);
                                            if (val % 10 !== 0){
                                              this.pagTot++;
                                            }});
    this.pService.getByCheckOut(this.pagina).subscribe(val => this.prenotazioni = val );
  }

  indietro(): void{
    this.pagina--;
    this.pService.getByCheckOut(this.pagina).subscribe(val => this.prenotazioni = val );
  }

  avanti(): void{
    this.pagina++;
    this.pService.getByCheckOut(this.pagina).subscribe(val => this.prenotazioni = val );
  }

  elimina(p: Prenotazione): void{
    this.sostituto = [];
    this.pService.rimuoviPrenotazione(p.codicePrenotazione).subscribe(val => {});
    for (this.i = 0; this.i < this.prenotazioni.length; this.i++){
      if (this.prenotazioni[this.i] !== p){
        this.sostituto.push(this.prenotazioni[this.i]);
      }
    }
    this.prenotazioni = this.sostituto;
  }

}
