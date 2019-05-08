"use strict";
exports.__esModule = true;
var prontuario_1 = require("../../gui/ta-gui/src/app/prontuario");
var CadastroDeProntuarios = /** @class */ (function () {
    function CadastroDeProntuarios() {
        this.prontuarios = [];
    }
    CadastroDeProntuarios.prototype.criar = function (prontuario) {
        var result = null;
        if (this.cpfNaoCadastrado(prontuario.cpf) && this.githubNaoCadastrado(prontuario.github)) {
            result = new prontuario_1.Prontuario();
            result.copyFrom(prontuario);
            this.prontuarios.push(result);
        }
        return result;
    };
    CadastroDeProntuarios.prototype.cpfNaoCadastrado = function (cpf) {
        return !this.prontuarios.find(function (a) { return a.cpf == cpf; });
    };
    CadastroDeProntuarios.prototype.githubNaoCadastrado = function (github) {
        return !this.prontuarios.find(function (a) { return a.github == github; });
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
    CadastroDeProntuarios.prototype.remover = function (prontuario) {
        //======================aqui
        this.prontuarios = this.prontuarios.filter(function (a) { return a.cpf != prontuario.cpf; });
        return this.prontuarios;
        //==========================
    };
    return CadastroDeProntuarios;
}());
exports.CadastroDeProntuarios = CadastroDeProntuarios;
