import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BuscaProntuarioComponent } from './buscaProntuario.component';
import { ProntuarioComponent } from './prontuario.component';
import { ProntuarioService } from './prontuario.service';

@NgModule({
  declarations: [
    AppComponent,
    BuscaProntuarioComponent,
    ProntuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot([
      {
        path: 'buscaProntuario',
        component: BuscaProntuarioComponent
      },
      {
        path: 'prontuario',
        component: ProntuarioComponent
      }
    ])
  ],
  providers: [ProntuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
