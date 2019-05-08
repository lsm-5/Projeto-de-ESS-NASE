
import { Prontuario } from '../../gui/ta-gui/src/app/prontuario';

export class CadastroDeProntuarios {
  prontuarios: Prontuario[] = [];

  criar(prontuario: Prontuario): Prontuario {
    var result = null;
    if (!this.prontuarioExiste(prontuario)) {//se prontuario nao cadastrado
      result = new Prontuario();
      result.copyFrom(prontuario);
      this.prontuarios.push(result);
    }
    return result;
  }

  prontuarioExiste(p : Prontuario): boolean{//prontuario já cadastrado
    if(this.prontuarios.find(a => (a.cpf == p.cpf && a.nome == p.nome && a.data == p.data && a.horario == p.horario))) return true;
    else return false;
  }
 

  atualizar(prontuario: Prontuario): Prontuario {
    var result: Prontuario = this.prontuarios.find(a => a.cpf == prontuario.cpf);
    if (result) result.copyFrom(prontuario);
    return result;
  }

  getProntuarios(): Prontuario[] {
    return this.prontuarios;
  }

  // remover(prontuario:Prontuario): Prontuario[]{
  //   //======================aqui
  //   this.prontuarios = this.prontuarios.filter(a => a.cpf != prontuario.cpf);
  //   return this.prontuarios;
  //   //==========================
  // }


}
