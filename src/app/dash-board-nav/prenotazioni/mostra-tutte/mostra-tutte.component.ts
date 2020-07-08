import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/RestServices/PrenotazioneService/prenotazione.service';
import { Prenotazione } from 'src/app/model/prenotazione';

@Component({
  selector: 'app-mostra-tutte',
  templateUrl: './mostra-tutte.component.html',
  styleUrls: ['./mostra-tutte.component.css']
})
export class MostraTutteComponent implements OnInit {

  pagina = 0;
  pagTot = 0;
  prenotazioni: Prenotazione[];
  constructor(private pService: PrenotazioneService) { }

  ngOnInit(): void {
    this.pService.conta().subscribe(val => {this.pagTot = Math.floor(val / 10);
                                            if (val % 10 !== 0){
                                              this.pagTot++;
                                            }});
    this.pService.getPrenotazioni(this.pagina).subscribe(val => this.prenotazioni = val );
  }

  indietro(): void{
    this.pagina--;
    this.pService.getPrenotazioni(this.pagina).subscribe(val => this.prenotazioni = val );
  }

  avanti(): void{
    this.pagina++;
    this.pService.getPrenotazioni(this.pagina).subscribe(val => this.prenotazioni = val );
  }

}
