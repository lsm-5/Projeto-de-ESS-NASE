
import { Prontuario } from '../../gui/ta-gui/src/app/prontuario';

export class CadastroDeProntuarios {
  prontuarios: Prontuario[] = [];

  criar(prontuario: Prontuario): Prontuario {
    var result = null;
    if (this.cpfNaoCadastrado(prontuario.cpf) && this.githubNaoCadastrado(prontuario.github)) {
      result = new Prontuario();
      result.copyFrom(prontuario);
      this.prontuarios.push(result);
    }
    return result;
  }

  cpfNaoCadastrado(cpf: string): boolean {
     return !this.prontuarios.find(a => a.cpf == cpf);
  }
  githubNaoCadastrado(github: string): boolean {
    return !this.prontuarios.find(a => a.github == github);
  }
  atualizar(prontuario: Prontuario): Prontuario {
    var result: Prontuario = this.prontuarios.find(a => a.cpf == prontuario.cpf);
    if (result) result.copyFrom(prontuario);
    return result;
  }

  getProntuarios(): Prontuario[] {
    return this.prontuarios;
  }

  remover(prontuario:Prontuario): Prontuario[]{
    //======================aqui
    this.prontuarios = this.prontuarios.filter(a => a.cpf != prontuario.cpf);
    return this.prontuarios;
    //==========================
  }


}
