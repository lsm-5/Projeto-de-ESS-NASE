"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atividadeEmCampo_1 = require("../../gui/ta-gui/src/app/atividadeEmCampo");
class CadastroDeAtividades {
    constructor() {
        this.atividades = [];
    }
    criar(atividade) {
        var result = null;
        if (this.atividadeNaoCadastrada(atividade.atividade)) {
            result = new atividadeEmCampo_1.AtividadeEmCampo();
            this.atividades.push(result);
        }
        return result;
    }
    remover(atividade) {
        this.atividades = this.atividades.filter(a => a.atividade != atividade.atividade);
        return true;
    }
    atividadeNaoCadastrada(nome) {
        if (this.atividades.find(a => a.atividade == nome)) {
            return false;
        }
        else {
            return true;
        }
    }
    atualizar(atividade) {
        var result = this.atividades.find(a => a.atividade == atividade.atividade);
        return result;
    }
    getAtividades() {
        return this.atividades;
    }
}
exports.CadastroDeAtividades = CadastroDeAtividades;
//# sourceMappingURL=cadastrodeatividades.js.map