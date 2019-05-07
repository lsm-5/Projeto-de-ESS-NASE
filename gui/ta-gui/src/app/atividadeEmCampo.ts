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
}
