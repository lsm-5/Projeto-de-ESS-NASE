import { AtividadeEmCampo } from '../../gui/ta-gui/src/app/atividadeCampo/atividadeEmCampo';

export class CadastroDeAtividades {
  atividades: AtividadeEmCampo[] = [];
  buscaatividades: AtividadeEmCampo[] = [];

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
    if (!this.atividadeNaoCadastrada(atividade.atividade)) {
      var result: AtividadeEmCampo = this.atividades.find(a => a.atividade == atividade.atividade);
      if (result) result.copyFrom(atividade);
      return result;
    }else{
      return null;
    }
  }

  busca(atividade: AtividadeEmCampo): AtividadeEmCampo[]{
    var result: AtividadeEmCampo [] = this.atividades.filter(c => c.datainicial >= atividade.datainicial && c.datafinal<=atividade.datafinal);
    return result;
  }

  getAtividades(): AtividadeEmCampo[] {
    return this.atividades;
  }
}
