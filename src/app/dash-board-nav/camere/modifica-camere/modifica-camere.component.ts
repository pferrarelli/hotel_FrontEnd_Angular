import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/RestServices/CameraService/camera.service';
import { Camera } from 'src/app/model/camera';

@Component({
  selector: 'app-modifica-camere',
  templateUrl: './modifica-camere.component.html',
  styleUrls: ['./modifica-camere.component.css']
})
export class ModificaCamereComponent implements OnInit {

  i: number;
  pagina = 0;
  pagTot = 0;
  sostituto: Camera[];
  camere: Camera[];

  constructor(private cService: CameraService) { }

  ngOnInit(): void {
    this.cService.contaCamere().subscribe(val => {this.pagTot = Math.floor(val / 10);
                                                  if (val % 10 !== 0){
                                                  this.pagTot++;
                                                  }});
    this.cService.getAll(this.pagina).subscribe(val => {this.camere = val; console.log(this.camere); });
  }

  indietro(): void{
    this.pagina--;
    this.cService.getAll(this.pagina).subscribe(val => this.camere = val );
  }

  avanti(): void{
    this.pagina++;
    this.cService.getAll(this.pagina).subscribe(val => this.camere = val );
  }

  elimina(c: Camera): void{
    this.sostituto = [];
    this.cService.rimuoviCamera(c.id).subscribe(val => {});
    for (this.i = 0; this.i < this.camere.length; this.i++){
      if (this.camere[this.i] !== c){
        this.sostituto.push(this.camere[this.i]);
      }
    }
    this.camere = this.sostituto;
  }

}
