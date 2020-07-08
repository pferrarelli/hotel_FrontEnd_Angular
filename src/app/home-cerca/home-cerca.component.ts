import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Prenotazione } from '../model/prenotazione';
import { PrenotazioneService } from '../RestServices/PrenotazioneService/prenotazione.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-home-cerca',
  templateUrl: './home-cerca.component.html',
  styleUrls: ['./home-cerca.component.css']
})
export class HomeCercaComponent implements OnInit {

  dataSuperata = false;
  messaggio: string;
  trovato = false;
  finito = false;
  codice: string;
  prenotazione = new Prenotazione(0, 0, '00-00-0000', '00-00-0000', 0, 'null', new Cliente(0, '', ''), null);

  formUno: FormGroup;

  constructor(private formBuilder: FormBuilder, private pService: PrenotazioneService) { }

  ngOnInit(): void {
    this.formUno = this.formBuilder.group({
      cod: ['', [Validators.required]]
    });
  }

  cerca(): void{
    if (this.formUno.controls.cod.value === undefined
        || this.formUno.controls.cod.value === null){ return; }
    this.codice = this.formUno.controls.cod.value;
    this.pService.cercaConCodice(this.formUno.controls.cod.value)
      .subscribe((val: Prenotazione) => { if (val === null || val === undefined){
                                           this.trovato = false;
                                          }else{
                                            this.prenotazione = val;
                                            this.trovato = true;
                                          }
                                          const dataOdierna = new Date().getTime();
                                          const dataCheckIn = new Date(this.prenotazione.checkin).getTime();
                                          if (dataOdierna > dataCheckIn){
                                            this.dataSuperata = true;
                                          }else{
                                            this.dataSuperata = false;
                                          }
                                        });
  }

  getServizio(): string{
    switch (this.prenotazione.tipoServizio){
      case 'BANDB': {
        return 'Bed&Breakfast';
      }
      case 'MEZZAPENSIONE': {
        return 'Mezza pensione';
      }
      case 'PENSIONECOMPLETA': {
        return 'Pensione completa';
      }
      default: {
        return 'Nessuno';
      }
    }
  }

  eliminaPrenotazione(): void{
    this.pService.rimuoviPrenotazione(this.prenotazione.codicePrenotazione)
    .subscribe(val => {if (val === true){
                        this.messaggio = 'Prenotazione rimossa con successo';
                      }
                       if (val === false){
                         this.messaggio = 'La prenotazione è stata già rimossa';
                      }
                       if (val === undefined || val === null){
                         this.messaggio = 'Errore durante la rimozione. Ritenta.';
                       }
                       this.finito = true;
                        });
  }

}
