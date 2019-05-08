import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { AtividadeEmCampo } from './atividadeEmCampo';
import { AtividadeEmCampoService } from './atividadeEmCampo.service';

@Component({
  selector: 'app-root',
  templateUrl: './atividadeEmCampo.component.html',
  styleUrls: ['./atividadeEmCampo.component.css']
})
export class AtividadeEmCampoComponent implements OnInit {
   constructor(private atividadeService: AtividadeEmCampoService) {}

   atividade: AtividadeEmCampo = new AtividadeEmCampo();
   atividadeCompleta: AtividadeEmCampo = new AtividadeEmCampo();
   atividades: AtividadeEmCampo[];
   atividadesbusca: AtividadeEmCampo[];
   atividadeduplicada: boolean = false;
   atividadeinexistente: boolean = false;
   atividadeBuscaLigado: boolean = false;
   atividadeinexistentebusca: boolean = false;
   verMaisLigado: boolean = false;

   criarAtividade(a: AtividadeEmCampo): void {
     this.atividadeService.criar(a)
        .then(ab => {
           if (ab) {
              this.atividades.push(ab);
              this.atividade = new AtividadeEmCampo();
           } else {
              this.atividadeduplicada = true;
           }
        })
        .catch(erro => alert(erro));
   }

   alterarAtividade(b: AtividadeEmCampo):void{
      this.atividadeService.atualizar(b)
      .then(ba => {
         if (ba) {
            var result: AtividadeEmCampo = this.atividades.find(a => a.atividade == ba.atividade);
            if (result){
               result.copyFrom(ba);
            } 
         }else{
            this.atividadeinexistente = true;
         }
      })
      .catch(erro => alert(erro));
   }

   removerAtividade(a:AtividadeEmCampo):void{
      this.atividadeService.remover(a)
      .then(a=>{
         if(a){
            this.atividades = this.atividades.filter(b=>b.atividade != a.atividade);
            this.atividade = new AtividadeEmCampo();
         }
      })
      .catch(erro => alert(erro));
   }

   verMais(a:String):void{
      this.verMaisLigado = true;
      this.atividadeCompleta = this.atividades.find(x=>x.atividade == a);
   }

   verMenos():void{
      this.verMaisLigado = false;
   }

   buscarAtividade(a:AtividadeEmCampo):void{
      this.atividadeService.buscar(a)
      .then(ab => {
         if (ab) {
            this.atividadesbusca = ab;
            this.atividadeBuscaLigado = true;
         } else {
            this.atividadeBuscaLigado = true;
            this.atividadeinexistentebusca = true;
         }
      })
      .catch(erro => alert(erro));
   }
   cancelarBuscaAtividade():void{
      this.atividadeBuscaLigado = false;
   }

   onMove(): void {
      this.atividadeduplicada = false;
      this.atividadeinexistente = false;
      this.atividadeinexistentebusca = false;
   }

   ngOnInit(): void {
     this.atividadeService.getAtividade()
         .then(as => this.atividades = as)
         .catch(erro => alert(erro));
   }

}
