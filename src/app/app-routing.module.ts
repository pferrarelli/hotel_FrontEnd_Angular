import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import { HomeComponent } from './home/home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeCercaComponent } from './home-cerca/home-cerca.component';
import { MostraPrezziComponent } from './dash-board-nav/prezzi/mostra-prezzi/mostra-prezzi.component';
import { MostraTutteComponent } from './dash-board-nav/prenotazioni/mostra-tutte/mostra-tutte.component';
import { CheckOutComponent } from './dash-board-nav/prenotazioni/check-out/check-out.component';
import { ModificaCamereComponent } from './dash-board-nav/camere/modifica-camere/modifica-camere.component';
import { AggiungiCameraComponent } from './dash-board-nav/camere/aggiungi-camera/aggiungi-camera.component';


const routes: Routes = [
  { path: '**', redirectTo: 'http://localhost:4200' },
  { path: '', component: HomeComponent },
  { path: 'prenotazione', component: PrenotazioneComponent },
  { path: 'ricerca', component: HomeCercaComponent},
  { path: 'administrator/dashboard', component: DashBoardComponent, children: [
    { path: 'prezzi', component: MostraPrezziComponent },
    { path: 'prenotazioni/list', component: MostraTutteComponent },
    { path: 'prenotazioni/checkout', component: CheckOutComponent },
    { path: 'camere/modifica', component:  ModificaCamereComponent},
    { path: 'camere/aggiungi', component:  AggiungiCameraComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
