import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { InfosDeConsultaCliente } from './InfosDeConsultaCliente';
import { InfosDeConsultaClienteService } from './InfosDeConsultaCliente.service';

@Component({
  selector: 'InfosDeConsultaCliente',
  templateUrl: './InfosDeConsultaCliente.component.html',
  styleUrls: ['./InfosDeConsultaCliente.component.css']
})
export class InfosDeConsultaClienteComponent implements OnInit {

    constructor(private InfosDeConsultaService: InfosDeConsultaClienteService) {}
  
    info: InfosDeConsultaCliente = new InfosDeConsultaCliente();
    infosCompleta: InfosDeConsultaCliente = new InfosDeConsultaCliente();
    todasAsInfos: InfosDeConsultaCliente[];
    infosBuscadas: InfosDeConsultaCliente[];
    infosduplicada: boolean = false;
    infosinexistente: boolean = false;
    infosBuscaLigado: boolean = false;
    infosInexistenteBusca: boolean = false;

 
    criarInfosConsulta(a: InfosDeConsultaCliente): void {
      this.InfosDeConsultaService.criar(a)
         .then(ab => {
            if (ab) {
               this.todasAsInfos.push(ab);
               this.info = new InfosDeConsultaCliente();
         //   } else {
              // this.infosduplicada = true;//tem que repensar os processos de validacao pro caso do agendamento.
            }
         })
         .catch(erro => alert(erro));
    }
 
    alterarInfosConsulta(b: InfosDeConsultaCliente):void{
       this.InfosDeConsultaService.atualizar(b)
       .then(ba => {
          if (ba) {
            var result: InfosDeConsultaCliente = this.todasAsInfos.find(a => a.cpf == ba.cpf);
            //var result: InfosDeConsultaCliente = this.todasAsInfos.find(a => a.info == ba.info);
             if (result){
                result.copyFrom(ba);
             } 
          }else{
             this.infosinexistente = true;
          }
       })
       .catch(erro => alert(erro));
    }
 
    removerInfosConsulta(a:InfosDeConsultaCliente):void{
       this.InfosDeConsultaService.remover(a)
       .then(a=>{
          if(a){
             this.todasAsInfos = this.todasAsInfos.filter(b=>b.cpf != a.cpf);
             this.info = new InfosDeConsultaCliente();
          }
       })
       .catch(erro => alert(erro));
    }

 
    buscarInfosConsulta(a:InfosDeConsultaCliente):void{
       this.InfosDeConsultaService.buscar(a)
       .then(ab => {
          if (ab) {
             this.infosBuscadas = ab;
             this.infosBuscaLigado = true;
          } else {
             this.infosBuscaLigado = true;
             this.infosInexistenteBusca = true;
          }
       })
       .catch(erro => alert(erro));
    }
    cancelarBuscaInfosConsulta():void{
       this.infosBuscaLigado = false;
    }
 
    onMove(): void {
       this.infosduplicada = false;
       this.infosinexistente = false;
       this.infosInexistenteBusca = false;
    }
 
    ngOnInit(): void {
      this.InfosDeConsultaService.getInfos()
          .then(as => this.todasAsInfos = as)
          .catch(erro => alert(erro));
    }
 
}
