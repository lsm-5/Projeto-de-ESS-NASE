import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AtividadeEmCampoComponent } from './atividadeCampo/atividadeEmCampo.component';
import { AtividadeEmCampoService } from './atividadeCampo/atividadeEmCampo.service';

import { AgendamentoEHistoricoClienteComponent } from './agendamentoeHistoricoCliente/agendamentoeHistoricoCliente.component';
import { AgendamentoEHistoricoClienteService } from './agendamentoeHistoricoCliente/agendamentoeHistoricoCliente.service';

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
    RouterModule.forRoot([//aqui de rolar um extract pra um arquivo app.routes.ts e chama aqui só o json
      {
        path: 'atividadeEmCampo',
        component: AtividadeEmCampoComponent
      },
      {
        path: 'agendamentoeHistoricoCliente',
        component: AgendamentoEHistoricoClienteComponent
      }
    ])
  ],
  providers: [AtividadeEmCampoService, AgendamentoEHistoricoClienteService],//pra injetar (dependecias) servicos temos que declarar ele aqui em providers,
  //se for dentro de um @component({providers: AtividadeEmCampoService})aqui fica disponivel pra o compnet e seus filhos
  //aqui no app.module, fica disponivel pra todos os componentes da aplicacao
  bootstrap: [AppComponent]//starta a aplicacao
})
export class AppModule { }
