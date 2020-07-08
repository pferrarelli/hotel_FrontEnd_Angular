import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CameraService } from '../RestServices/CameraService/camera.service';

@Component({
  selector: 'app-ricerca-home',
  templateUrl: './ricerca-home.component.html',
  styleUrls: ['./ricerca-home.component.css']
})
export class RicercaHomeComponent implements OnInit {

  ricercaForm = new FormGroup({
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required])
  });

  today: Date;
  minimum: Date;

  nrSingole: number;
  nrDoppie: number;
  nrMatrimoniali: number;
  nrTriple: number;

  clickato = false;

  constructor(private aService: CameraService) { }

  ngOnInit(): void {
    this.today = new Date();

    this.ricercaForm.controls.checkIn.valueChanges.subscribe(val => this.minimum = val);
  }

  cerca(): void{

    this.aService.getSize(this.ricercaForm.value.checkIn, this.ricercaForm.value.checkOut, 'SINGOLA')
      .subscribe(val => this.nrSingole = val);

    this.aService.getSize(this.ricercaForm.value.checkIn, this.ricercaForm.value.checkOut, 'DOPPIA')
      .subscribe(val => this.nrDoppie = val);

    this.aService.getSize(this.ricercaForm.value.checkIn, this.ricercaForm.value.checkOut, 'MATRIMONIALE')
      .subscribe(val => this.nrMatrimoniali = val);

    this.aService.getSize(this.ricercaForm.value.checkIn, this.ricercaForm.value.checkOut, 'TRIPLA')
      .subscribe(val => this.nrTriple = val);

    this.clickato = true;
  }
}
