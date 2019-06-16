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

  ngOnInit(){}

    constructor(private InfosDeConsultaService: InfosDeConsultaClienteService) {}

  
    agendamentoeHistorico: InfosDeConsultaCliente = new InfosDeConsultaCliente();
    
 
}
