import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { AtividadeEmCampo } from './atividadeEmCampo';
import { AtividadeEmCampoService } from './atividadeEmCampo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   constructor(private atividadeService: AtividadeEmCampoService) {}

   atividade: AtividadeEmCampo = new AtividadeEmCampo();
   atividades: AtividadeEmCampo[] = [];
   atividadeduplicada: boolean = false;

   criarAtividade(a: AtividadeEmCampo): void {
     if (this.atividadeService.criar(a)) {
       this.atividades.push(a);
       this.atividade = new AtividadeEmCampo();
     } else {
       this.atividadeduplicada = true;
     }
   }

   removerAtividade(a: AtividadeEmCampo):void{
      if(this.atividadeService.remover(a)){
        this.atividades = this.atividades.filter(b=>b.atividade != a.atividade);
        this.atividade = new AtividadeEmCampo();
      }                                     
   }
   onMove(): void {
      this.atividadeduplicada = false;
   }

}
