export class InfosDeConsultaCliente {

    cpf: string; //do cliente do servico
    nomeProfissional: string; //que vai atender
    tipoDeConsulta: string; //mesmo que servico de atendimento
    dataDaConsulta: string;
    horarioConsulta: string;
    datainicial: string; //para filtragem quando for mostrar o historico
    datafinal: string;   //idem
    historicoCompleto: boolean;
    
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.horarioConsulta = "";
      this.tipoDeConsulta = "";
      this.nomeProfissional = "";
      this.cpf = "";
      this.datainicial = "";
      this.datafinal="";
      this.historicoCompleto = false;
      this.dataDaConsulta = "";
    }
    copyFrom(from: InfosDeConsultaCliente): void {
      this.horarioConsulta = from.horarioConsulta;
      this.tipoDeConsulta = from.tipoDeConsulta;
      this.nomeProfissional = from.nomeProfissional;
      this.cpf = from.cpf;
      this.datainicial = from.datainicial;
      this.datafinal = from.datafinal;
      this.historicoCompleto = from.historicoCompleto;
      this.dataDaConsulta = from.dataDaConsulta;
    }
  }
  