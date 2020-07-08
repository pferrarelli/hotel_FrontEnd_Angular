import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RicercaHomeComponent } from './ricerca-home/ricerca-home.component';
import { CameraService } from './RestServices/CameraService/camera.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import { HomeComponent } from './home/home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PrenotazioneSubComponent } from './prenotazione-sub/prenotazione-sub.component';
import { MatSelectModule } from '@angular/material/select';
import { HomeCercaComponent } from './home-cerca/home-cerca.component';
import { ClienteService } from './RestServices/ClienteService/cliente.service';
import { PrenotazioneService } from './RestServices/PrenotazioneService/prenotazione.service';
import { PrezziService } from './RestServices/prezzi.service';
import { MostraPrezziComponent } from './dash-board-nav/prezzi/mostra-prezzi/mostra-prezzi.component';
import { MostraTutteComponent } from './dash-board-nav/prenotazioni/mostra-tutte/mostra-tutte.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CheckOutComponent } from './dash-board-nav/prenotazioni/check-out/check-out.component';
import { ModificaCamereComponent } from './dash-board-nav/camere/modifica-camere/modifica-camere.component';
import { AggiungiCameraComponent } from './dash-board-nav/camere/aggiungi-camera/aggiungi-camera.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    RicercaHomeComponent,
    PrenotazioneComponent,
    HomeComponent,
    DashBoardComponent,
    PrenotazioneSubComponent,
    HomeCercaComponent,
    MostraPrezziComponent,
    MostraTutteComponent,
    CheckOutComponent,
    ModificaCamereComponent,
    AggiungiCameraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [{ provide: CameraService, useClass: CameraService },
    { provide: MAT_DATE_LOCALE, useValue: 'it' },
    { provide: ClienteService, useClass: ClienteService },
    { provide: PrenotazioneService, useClass: PrenotazioneService },
    { provide: PrezziService, useClass: PrezziService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
