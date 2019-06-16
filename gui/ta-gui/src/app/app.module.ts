import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AtividadeEmCampoComponent } from './atividadeCampo/atividadeEmCampo.component';
import { AtividadeEmCampoService } from './atividadeCampo/atividadeEmCampo.service';
import { AgendamentoEHistoricoClienteComponent } from './src/app/agendamento-ehistorico-cliente/agendamento-ehistorico-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    AtividadeEmCampoComponent,
    AgendamentoEHistoricoClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot([
      {
        path: 'atividadeEmCampo',
        component: AtividadeEmCampoComponent
      }
    ])
  ],
  providers: [AtividadeEmCampoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
