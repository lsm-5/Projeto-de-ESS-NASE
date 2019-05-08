import { AtividadeEmCampo } from '../../gui/ta-gui/src/app/atividadeEmCampo';

export class CadastroDeAtividades {
  atividades: AtividadeEmCampo[] = [];

  criar(atividade: AtividadeEmCampo): AtividadeEmCampo {
    var result = null;
    if (this.atividadeNaoCadastrada(atividade.atividade)) {
      result = new AtividadeEmCampo();
      result.copyFrom(atividade);
      this.atividades.push(result);
    }
    return result;
  }

  remover(atividade:AtividadeEmCampo): boolean {
      this.atividades = this.atividades.filter(a => a.atividade != atividade.atividade);
      return true;
  }

  atividadeNaoCadastrada(nome: string): boolean {
    if(this.atividades.find(a => a.atividade == nome)){
      return false;
    }else{
      return true;
    }
  }

  atualizar(atividade: AtividadeEmCampo): AtividadeEmCampo {
    var result: AtividadeEmCampo = this.atividades.find(a => a.atividade == atividade.atividade);
    if (result) result.copyFrom(atividade);
    return result;
  }

  getAtividades(): AtividadeEmCampo[] {
    return this.atividades;
  }
}
