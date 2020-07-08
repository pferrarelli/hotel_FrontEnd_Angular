import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/RestServices/CameraService/camera.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from 'src/app/model/camera';

@Component({
  selector: 'app-aggiungi-camera',
  templateUrl: './aggiungi-camera.component.html',
  styleUrls: ['./aggiungi-camera.component.css']
})
export class AggiungiCameraComponent implements OnInit {

  myFormGroup: FormGroup;
  msg = '';

  constructor(private formBuilder: FormBuilder, private cService: CameraService) { }

  ngOnInit(): void {

    this.myFormGroup = this.formBuilder.group({
      numero: ['', Validators.required],
      tipo: ['', Validators.required]
    });

  }


  aggiungi(): void{
    this.msg = '';
    const c = new Camera();
    c.id = 0;
    c.numero = this.myFormGroup.controls.numero.value;
    c.tipoCamera = this.myFormGroup.controls.tipo.value;
    this.cService.addCamera(c).subscribe(val => {if (val === true){
                                                  this.msg = 'Camera aggiunta';
                                                }else{
                                                  this.msg = 'La camera esiste già';
                                                } });
  }


}
