import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Prontuario } from './prontuario';
import { ProntuarioService } from './prontuario.service';

@Component({
  selector: 'busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaProntuarioComponent implements OnInit {
   constructor(private prontuarioService: ProntuarioService) {}

   prontuarios: Prontuario[];

   buscarByNameProntuario(prontuario: Prontuario): void {
      this.prontuarioService.buscarByName(prontuario)
         .catch(erro => alert(erro));
   }

   ngOnInit(): void {
      this.prontuarioService.getProntuarios()
         .then(prontuarios => this.prontuarios = prontuarios)
         .catch(erro => alert(erro));
   }

}
