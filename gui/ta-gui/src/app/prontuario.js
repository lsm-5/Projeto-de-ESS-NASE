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
        this.horario = "";
        this.data = "";
        this.comentario = "";
    };
    Prontuario.prototype.clone = function () {
        var prontuario = new Prontuario();
        prontuario.comentario = "";
        prontuario.copyFrom(this);
        return prontuario;
    };
    Prontuario.prototype.copyFrom = function (from) {
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.horario = from.horario;
        this.data = from.data;
        //this.copyMetasFrom(from.comentario);
    };
    return Prontuario;
}());
exports.Prontuario = Prontuario;
