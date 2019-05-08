//alterar pra prontuário
export class Prontuario {
    nome: string;
    cpf: string;
    horario: string;
    data : string;
    comentario: string;
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.nome = "";
      this.cpf = "";
      this.horario = "";
      this.data = "";
      this.comentario = "";
    }
  
    clone(): Prontuario {
      var prontuario: Prontuario = new Prontuario();
      prontuario.comentario = "";
      prontuario.copyFrom(this);
      return prontuario;
    }
  
    copyFrom(from: Prontuario): void {
      this.nome = from.nome;
      this.cpf = from.cpf;
      this.horario = from.horario;
      this.data = from.data;
      //this.copyMetasFrom(from.comentario);
    }
  
    // copyMetasFrom(from: string): void {
    //   this.comentario = "";
    //   for (let key in from) {
    //     this.comentario[key] = from[key];
    //   }
    // }
  
  }
  