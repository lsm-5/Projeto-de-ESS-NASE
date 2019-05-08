//alterar pra prontuario
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
   constructor(private alunoService: AlunoService) {}

   aluno: Aluno = new Aluno();
   alunos: Aluno[];
   loginduplicado: boolean = false;

   
   criarAluno(a: Aluno): void {
      this.alunoService.criar(a)
      .then(ab => {
               if (ab) {
                  this.alunos.push(ab);
                  this.aluno = new Aluno();
               }else{
                  this.loginduplicado=true;
                  this.aluno = new Aluno();
               }
            })
      .catch(erro => alert(erro));
   }
   removerAluno(aluno : Aluno):void{
      //============aqui
      this.alunoService.remover(aluno)
      .then(ab => {
               if (ab) {
                  this.alunos = this.alunos.filter(b => b.cpf != ab.cpf);
                  this.aluno = new Aluno();
               }
            })
      .catch(erro => alert(erro));
      //=====================
   }

   onMove(): void {
      this.loginduplicado = false;
   }

   ngOnInit(): void {
     this.alunoService.getAlunos()
         .then(as => this.alunos = as)
         .catch(erro => alert(erro));
   }

}
