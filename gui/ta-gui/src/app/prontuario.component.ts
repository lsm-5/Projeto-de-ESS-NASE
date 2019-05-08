
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Prontuario } from './prontuario';
import { ProntuarioService } from './prontuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.css']
})
export class ProntuarioComponent implements OnInit {
   constructor(private prontuarioService: ProntuarioService) {}

   prontuario: Prontuario = new Prontuario();
   prontuarios: Prontuario[];
   loginduplicado: boolean = false;

   
   criarProntuario(a: Prontuario): void {
      this.prontuarioService.criar(a)
      .then(ab => {
               if (ab) {
                  this.prontuarios.push(ab);
                  this.prontuario = new Prontuario();
               }else{
                  this.loginduplicado=true;
                  this.prontuario = new Prontuario();
               }
            })
      .catch(erro => alert(erro));
   }
   removerProntuario(prontuario : Prontuario):void{
      //============aqui
      this.prontuarioService.remover(prontuario)
      .then(ab => {
               if (ab) {
                  this.prontuarios = this.prontuarios.filter(b => b.cpf != ab.cpf);
                  this.prontuario = new Prontuario();
               }
            })
      .catch(erro => alert(erro));
      //=====================
   }

   onMove(): void {
      this.loginduplicado = false;
   }

   ngOnInit(): void {
     this.prontuarioService.getProntuarios()
         .then(as => this.prontuarios = as)
         .catch(erro => alert(erro));
   }

}
