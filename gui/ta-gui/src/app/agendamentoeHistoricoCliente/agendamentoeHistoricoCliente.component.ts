import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { AgendamentoEHistoricoCliente } from './agendamentoeHistoricoCliente';
import { AgendamentoEHistoricoClienteService } from './agendamentoeHistoricoCliente.service';

@Component({
  selector: 'agendamentoeHistoricoCliente',
  templateUrl: './agendamentoeHistoricoCliente.component.html',
  styleUrls: ['./agendamentoeHistoricoCliente.component.css']
})
export class AgendamentoEHistoricoClienteComponent implements OnInit {

    constructor(private AgendamentoHistoricoService: AgendamentoEHistoricoClienteService) {}

    ngOnInit(){}
 
 
 }
 
