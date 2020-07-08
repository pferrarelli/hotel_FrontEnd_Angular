import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../RestServices/ClienteService/cliente.service';
import { Cliente } from '../model/cliente';
import { CameraService } from '../RestServices/CameraService/camera.service';
import { PrezziService } from '../RestServices/prezzi.service';
import { Prezzi } from '../model/prezzi';
import { PrenotazioneService } from '../RestServices/PrenotazioneService/prenotazione.service';
import { Prenotazione } from '../model/prenotazione';

@Component({
  selector: 'app-prenotazione-sub',
  templateUrl: './prenotazione-sub.component.html',
  styleUrls: ['./prenotazione-sub.component.css']
})
export class PrenotazioneSubComponent implements OnInit {

  today: Date;
  minimum: Date;

  codicePrenotazione: number;
  errore: string;

  emailFormGroup: FormGroup;
  primoFormGroup: FormGroup;
  secondoFormGroup: FormGroup;
  terzoFormGroup: FormGroup;

  clienteGiaPresente = false;
  isOptional = false;
  verificato = false;
  controlloCamere = false;
  prenotazioneRiuscita: boolean;
  tentataPrenotazione = false;
  codiceMostrato = false;
  nascondiSuccesso = false;
  mostraErrore = false;

  cliente: Cliente;
  prezzi: Prezzi;
  prezzoTotaleGiornaliero: number;
  prezzoTotale: number;

  nrSingole: number;
  nrDoppie: number;
  nrMatrimoniali: number;
  nrTriple: number;

  constructor(private formBuilder: FormBuilder,
              private aService: ClienteService,
              private cService: CameraService,
              private prezService: PrezziService,
              private prenService: PrenotazioneService) { }

  ngOnInit(): void {

    this.emailFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.primoFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      indirizzo: ['', Validators.required],
      cellulare: ['', Validators.required]
    });
    this.secondoFormGroup = this.formBuilder.group({
      checkIn: [''],
      checkOut: [''],
      tipoServizio: ['', Validators.required]
    });
    this.terzoFormGroup = this.formBuilder.group({
      singole: ['', Validators.required],
      doppie: ['', Validators.required],
      matrimoniali: ['', Validators.required],
      triple: ['', Validators.required]
    });

    this.today = new Date();

    this.secondoFormGroup.controls.checkIn.valueChanges.subscribe(val => this.minimum = val);

  }

  setOptional(){
    this.isOptional = true;
  }
  unsetOptional(){
    this.isOptional = false;
    this.cliente = undefined;
    this.clienteGiaPresente = false;
    this.verificato = false;
  }

  getErrorMessage() {
    if (this.emailFormGroup.controls.email.hasError('required')) {
      return 'Devi inserire una email';
    }
    return this.emailFormGroup.controls.email.hasError('email') ? 'E-mail non valida' : '';
  }

  cercaCliente(): void{
    this.aService.getCliente(this.emailFormGroup.controls.email.value)
      .subscribe(val => {
        console.log(val);
        this.verificato = true;
        if ( val != null ){
          this.clienteGiaPresente = true;
        }else{
          this.clienteGiaPresente = false;
        }
      });
  }

  creaCliente(): void{
    const cli = new Cliente(0,
      this.primoFormGroup.controls.nome.value,
      this.primoFormGroup.controls.cognome.value,
      this.primoFormGroup.controls.cellulare.value,
      this.primoFormGroup.controls.indirizzo.value,
      this.emailFormGroup.controls.email.value);

    this.aService.addCliente(cli)
      .subscribe(p => {});
  }

  prendiCliente(){
    this.aService.getCliente(this.emailFormGroup.controls.email.value)
      .subscribe(val => {console.log(val);
                         if (val != null){
                          this.cliente = Object.assign(new Cliente(), val);
                          }
                        });
  }

  quantitaCamere(): void{
    this.cService.getSize(this.secondoFormGroup.controls.checkIn.value, this.secondoFormGroup.controls.checkOut.value, 'SINGOLA')
      .subscribe(val => this.nrSingole = val);

    this.cService.getSize(this.secondoFormGroup.controls.checkIn.value, this.secondoFormGroup.controls.checkOut.value, 'DOPPIA')
      .subscribe(val => this.nrDoppie = val);

    this.cService.getSize(this.secondoFormGroup.controls.checkIn.value, this.secondoFormGroup.controls.checkOut.value, 'MATRIMONIALE')
      .subscribe(val => this.nrMatrimoniali = val);

    this.cService.getSize(this.secondoFormGroup.controls.checkIn.value, this.secondoFormGroup.controls.checkOut.value, 'TRIPLA')
      .subscribe(val => this.nrTriple = val);
  }

  prendiPrezzi(): void{
    this.prezService.getPrezzi()
      .subscribe(val => this.prezzi = Object.assign(new Prezzi(), val));
  }

  calcolaPrezzoGiornaliero(): void{
    this.prezzoTotaleGiornaliero = (this.terzoFormGroup.controls.singole.value * this.prezzi.prezzoSingola) +
    (this.terzoFormGroup.controls.doppie.value * this.prezzi.prezzoDoppia) +
    (this.terzoFormGroup.controls.matrimoniali.value * this.prezzi.prezzoMatrimoniale) +
    (this.terzoFormGroup.controls.triple.value * this.prezzi.prezzoTripla);

    switch (this.secondoFormGroup.controls.tipoServizio.value){
      case 'BANDB': {
        this.prezzoTotaleGiornaliero += this.prezzi.prezzoBandB;
        break;
      }
      case 'MEZZAPENSIONE': {
        this.prezzoTotaleGiornaliero += this.prezzi.prezzoMezzaPensione;
        break;
      }
      case 'PENSIONECOMPLETA': {
        this.prezzoTotaleGiornaliero += this.prezzi.prezzoPensioneCompleta;
        break;
      }
      default: {
        break;
      }
    }

    const giorni = (Math.floor(((new Date(this.secondoFormGroup.controls.checkOut.value)).getTime() -
                        (new Date(this.secondoFormGroup.controls.checkIn.value)).getTime()) / ( 1000 * 60 * 60 * 24)));
    this.prezzoTotale = giorni * this.prezzoTotaleGiornaliero;
  }

  prenota(): void{
    const p = new Prenotazione(0, null,
      this.secondoFormGroup.controls.checkIn.value,
      this.secondoFormGroup.controls.checkOut.value,
      0, this.secondoFormGroup.controls.tipoServizio.value,
      this.cliente, null);

    this.prenService.addPrenotazione(p,
      this.terzoFormGroup.controls.doppie.value,
      this.terzoFormGroup.controls.singole.value,
      this.terzoFormGroup.controls.matrimoniali.value,
      this.terzoFormGroup.controls.triple.value)
      .subscribe(val => {
        console.log(val);
        if (val >= 0){
          this.prenotazioneRiuscita = true;
          this.codicePrenotazione = val;
          console.log(this.codicePrenotazione);
        }else{
          this.prenotazioneRiuscita = false;
          this.mostraErrore = true;
          if (val < -1){
            this.errore = 'Numero di camere non disponibili. Torna a Camere.';
          }
          if (val === -1){
            this.errore = 'Errore durante la prenotazione. Torna alla home page.';
          }
          if (val === -6){
            this.errore = 'Le date sono errate. Reinseriscile.';
          }
          if (val === -7){
            this.errore = 'Non hai selezionato nessuna camera. Torna indietro e ritenta.';
          }
        }
      });
    this.tentataPrenotazione = true;
  }

  mostraCodice(): void{
    this.codiceMostrato = true;
    this.nascondiSuccesso = true;
  }

  annulla(): void{
    this.prenotazioneRiuscita = false;
    this.tentataPrenotazione = false;
    this.nascondiSuccesso = false;
    this.mostraErrore = false;
  }
}
