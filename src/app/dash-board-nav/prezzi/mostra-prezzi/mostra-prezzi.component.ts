import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrezziService } from 'src/app/RestServices/prezzi.service';
import { Prezzi } from 'src/app/model/prezzi';

@Component({
  selector: 'app-mostra-prezzi',
  templateUrl: './mostra-prezzi.component.html',
  styleUrls: ['./mostra-prezzi.component.css']
})
export class MostraPrezziComponent implements OnInit {

  prezziFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private prezziService: PrezziService) { }

  ngOnInit(): void {

    this.prezziFormGroup = this.formBuilder.group({
      singola: ['', Validators.required],
      doppia: ['', Validators.required],
      matrimoniale: ['', Validators.required],
      tripla: ['', Validators.required],
      bandb: ['', Validators.required],
      mezzaPensione: ['', Validators.required],
      pensioneCompleta: ['', Validators.required]
    });

    this.prezziService.getPrezzi()
    .subscribe(val => { const prezzi: Prezzi = val;
                        this.prezziFormGroup.controls.singola.setValue(prezzi.prezzoSingola);
                        this.prezziFormGroup.controls.doppia.setValue(prezzi.prezzoDoppia);
                        this.prezziFormGroup.controls.matrimoniale.setValue(prezzi.prezzoMatrimoniale);
                        this.prezziFormGroup.controls.tripla.setValue(prezzi.prezzoTripla);
                        this.prezziFormGroup.controls.bandb.setValue(prezzi.prezzoBandB);
                        this.prezziFormGroup.controls.mezzaPensione.setValue(prezzi.prezzoMezzaPensione);
                        this.prezziFormGroup.controls.pensioneCompleta.setValue(prezzi.prezzoPensioneCompleta); });

  }

  modificaPrezzi(): void{
    const p = new Prezzi();
    p.prezzoSingola = this.prezziFormGroup.controls.singola.value;
    p.prezzoDoppia = this.prezziFormGroup.controls.doppia.value;
    p.prezzoMatrimoniale = this.prezziFormGroup.controls.matrimoniale.value;
    p.prezzoTripla = this.prezziFormGroup.controls.tripla.value;
    p.prezzoBandB = this.prezziFormGroup.controls.bandb.value;
    p.prezzoMezzaPensione = this.prezziFormGroup.controls.mezzaPensione.value;
    p.prezzoPensioneCompleta = this.prezziFormGroup.controls.pensioneCompleta.value;

    this.prezziService.modificaPrezzi(p).subscribe(val => {});

  }

}
