"use strict";
exports.__esModule = true;
//alterar pra prontuário
var Prontuario = /** @class */ (function () {
    function Prontuario() {
        this.clean();
    }
    Prontuario.prototype.clean = function () {
        this.nome = "";
        this.cpf = "";
        this.email = "";
        this.github = "";
        this.buscaprontuarios = new Map();
    };
    Prontuario.prototype.clone = function () {
        var prontuario = new Prontuario();
        prontuario.buscaprontuarios = new Map();
        prontuario.copyFrom(this);
        return prontuario;
    };
    Prontuario.prototype.copyFrom = function (from) {
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.email = from.email;
        this.github = from.github;
        this.copyMetasFrom(from.buscaprontuarios);
    };
    Prontuario.prototype.copyMetasFrom = function (from) {
        this.buscaprontuarios = new Map();
        for (var key in from) {
            this.buscaprontuarios[key] = from[key];
        }
    };
    return Prontuario;
}());
exports.Prontuario = Prontuario;
