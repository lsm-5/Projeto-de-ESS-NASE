export class AtividadeEmCampo {
  atividade: string;
  profissional: string;
  participantes: string;
  local: string;
  datainicial: string;
  datafinal: string;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.atividade = "";
    this.profissional = "";
    this.participantes = "";
    this.local = "";
    this.datainicial = "";
    this.datafinal="";
  }
  copyFrom(from: AtividadeEmCampo): void {
    this.atividade = from.atividade;
    this.profissional = from.profissional;
    this.participantes = from.participantes;
    this.local = from.local;
    this.datainicial = from.datainicial;
    this.datafinal = from.datafinal;
  }
}
