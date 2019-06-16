import { InfosDeConsultaCliente } from '../../gui/ta-gui/src/app/InfosDeConsultaCliente/InfosDeConsultaCliente';

export class CadastroDeInfosDeCosultas {
  infos: InfosDeConsultaCliente[] = [];
  buscaatividades: InfosDeConsultaCliente[] = [];

  criar(info: InfosDeConsultaCliente): InfosDeConsultaCliente {
    var result = null;
    if (this.infoCosultaNaoCadastrada(info.cpf, info.dataDaConsulta, info.horarioConsulta)) {
    //só pode criar um consulta se nao tiver cadastrada entao verifica-se cpf, data da consulta e hora. Nao se pode fazer duas consultas ao mesmo tempo.
        result = new InfosDeConsultaCliente();
        result.copyFrom(info);
        this.infos.push(result);
    }
    return result;
  }

//   remover(info:InfosDeConsultaCliente): boolean {
//       this.infos = this.infos.filter(a => (a.cpf != info.cpf) && (a.dataDaConsulta != info.dataDaConsulta) && (a.horarioConsulta != info.horarioConsulta));
//       return true;
//   }

  infoCosultaNaoCadastrada(cpf: string, dataDaConsulta: string, horarioConsulta: string): boolean {
    if(this.infos.find(a => (a.cpf == cpf) && (a.dataDaConsulta == dataDaConsulta) && (a.horarioConsulta == horarioConsulta)){
      return false;
    }else{
      return true;
    }
  }

//   atualizar(info: InfosDeConsultaCliente): InfosDeConsultaCliente {
//     if (!this.infoCosultaNaoCadastrada(info.cpf, info.dataDaConsulta, info.horarioConsulta)) {
//       var result: InfosDeConsultaCliente = this.infos.find(a => (a.cpf == info.cpf) && (a.dataDaConsulta == info.dataDaConsulta) && (a.horarioConsulta == info.horarioConsulta));
//       if (result) result.copyFrom(info);
//       return result;
//     }else{
//       return null;
//     }
//   }

//   busca(info: InfosDeConsultaCliente): InfosDeConsultaCliente[]{
//     var result: InfosDeConsultaCliente [] = this.infos.filter(c => c.datainicial >= info.datainicial && c.datafinal<=info.datafinal);
//     return result;
//   }

  getInfos(): InfosDeConsultaCliente[] {
    return this.infos;
  }
}
