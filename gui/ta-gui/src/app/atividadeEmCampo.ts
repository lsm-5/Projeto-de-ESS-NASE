export class AtividadeEmCampo {
  atividade: string;
  profissional: string;
  participantes: string;
  local: string;
  data: string;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.atividade = "";
    this.profissional = "";
    this.participantes = "";
    this.local = "";
    this.data = "";
  }
  copyFrom(from: AtividadeEmCampo): void {
    this.atividade = from.atividade;
    this.profissional = from.profissional;
    this.participantes = from.participantes;
    this.local = from.local;
    this.data = from.data;
  }
}
