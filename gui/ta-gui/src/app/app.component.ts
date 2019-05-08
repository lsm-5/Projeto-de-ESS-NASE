import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { Prontuario } from './prontuario';
import { ProntuarioService } from './prontuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   constructor(private prontuarioService: ProntuarioService) {}

   prontuario: Prontuario = new Prontuario();
   prontuarios: Prontuario[] = [];
   //loginduplicado: boolean = false;


   criarProntuario(a: Prontuario): void {
     if(this.prontuarioService.criar(a)){
      this.prontuarios.push(a);
      this.prontuario = new Prontuario();
      }else{
      //   this.loginduplicado = true;
      }
   }
   removerProntuario(prontuario:Prontuario): void{
      //========================aqui
      if(this.prontuarioService.remover(prontuario)){
         this.prontuarios = this.prontuarios.filter(b => b.cpf != prontuario.cpf);
         this.prontuario = new Prontuario();
      }
      //==============================
   }
   onMove(): void {
   //   this.loginduplicado = false;
   }

}
