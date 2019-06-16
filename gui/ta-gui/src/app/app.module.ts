import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AtividadeEmCampoComponent } from './atividadeCampo/atividadeEmCampo.component';
import { AtividadeEmCampoService } from './atividadeCampo/atividadeEmCampo.service';

import { InfosDeConsultaClienteComponent } from './InfosDeConsultaCliente/InfosDeConsultaCliente.component';
import { InfosDeConsultaClienteService } from './InfosDeConsultaCliente/InfosDeConsultaCliente.service';

@NgModule({
  declarations: [
    AppComponent,
    AtividadeEmCampoComponent,
    InfosDeConsultaClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot([//aqui de rolar um extract pra um arquivo app.routes.ts e chama aqui só o json
      {
        path: 'atividadeEmCampo',
        component: AtividadeEmCampoComponent
      },
      {
        path: 'aInfosDeConsultaCliente',
        component: InfosDeConsultaClienteComponent
      }
    ])
  ],
  providers: [AtividadeEmCampoService, InfosDeConsultaClienteService],//pra injetar (dependecias) servicos temos que declarar ele aqui em providers,
  //se for dentro de um @component({providers: AtividadeEmCampoService})aqui fica disponivel pra o compnet e seus filhos
  //aqui no app.module, fica disponivel pra todos os componentes da aplicacao
  bootstrap: [AppComponent]//starta a aplicacao
})
export class AppModule { }
