//alterar pra prontuário
export class Prontuario {
    nome: string;
    cpf: string;
    email: string;
    github : string;
    buscaprontuarios: Map<string,string>;
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.nome = "";
      this.cpf = "";
      this.email = "";
      this.github = "";
      this.buscaprontuarios = new Map<string,string>();
    }
  
    clone(): Prontuario {
      var prontuario: Prontuario = new Prontuario();
      prontuario.buscaprontuarios = new Map<string,string>();
      prontuario.copyFrom(this);
      return prontuario;
    }
  
    copyFrom(from: Prontuario): void {
      this.nome = from.nome;
      this.cpf = from.cpf;
      this.email = from.email;
      this.github = from.github;
      this.copyMetasFrom(from.buscaprontuarios);
    }
  
    copyMetasFrom(from: Map<string,string>): void {
      this.buscaprontuarios = new Map<string,string>();
      for (let key in from) {
        this.buscaprontuarios[key] = from[key];
      }
    }
  }
  