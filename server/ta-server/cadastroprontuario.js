"use strict";
exports.__esModule = true;
var prontuario_1 = require("../../gui/ta-gui/src/app/prontuario");
var CadastroDeProntuarios = /** @class */ (function () {
    function CadastroDeProntuarios() {
        this.prontuarios = [];
        // remover(prontuario:Prontuario): Prontuario[]{
        //   //======================aqui
        //   this.prontuarios = this.prontuarios.filter(a => a.cpf != prontuario.cpf);
        //   return this.prontuarios;
        //   //==========================
        // }
    }
    CadastroDeProntuarios.prototype.criar = function (prontuario) {
        var result = null;
        if (!this.prontuarioExiste(prontuario)) { //se prontuario nao cadastrado
            result = new prontuario_1.Prontuario();
            result.copyFrom(prontuario);
            this.prontuarios.push(result);
        }
        return result;
    };
    CadastroDeProntuarios.prototype.prontuarioExiste = function (p) {
        if (this.prontuarios.find(function (a) { return (a.cpf == p.cpf && a.nome == p.nome && a.data == p.data && a.horario == p.horario); }))
            return true;
        else
            return false;
    };
    CadastroDeProntuarios.prototype.atualizar = function (prontuario) {
        var result = this.prontuarios.find(function (a) { return a.cpf == prontuario.cpf; });
        if (result)
            result.copyFrom(prontuario);
        return result;
    };
    CadastroDeProntuarios.prototype.getProntuarios = function () {
        return this.prontuarios;
    };
    return CadastroDeProntuarios;
}());
exports.CadastroDeProntuarios = CadastroDeProntuarios;
