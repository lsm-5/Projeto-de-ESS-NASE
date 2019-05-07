import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   constructor(private alunoService: AlunoService) {}

   aluno: Aluno = new Aluno();
   alunos: Aluno[] = [];
   loginduplicado: boolean = false;


   criarAluno(a: Aluno): void {
     if(this.alunoService.criar(a)){
      this.alunos.push(a);
      this.aluno = new Aluno();
      }else{
         this.loginduplicado = true;
      }
   }
   removerAluno(aluno:Aluno): void{
      //========================aqui
      if(this.alunoService.remover(aluno)){
         this.alunos = this.alunos.filter(b => b.cpf != aluno.cpf);
         this.aluno = new Aluno();
      }
      //==============================
   }
   onMove(): void {
      this.loginduplicado = false;
   }

}
