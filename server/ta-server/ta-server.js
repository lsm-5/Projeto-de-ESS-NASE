"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cadastrodeatividades_1 = require("./cadastrodeatividades");
var app = express();
exports.app = app;
var cadastro = new cadastrodeatividades_1.CadastroDeAtividades();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.get('/atividades', function (req, res) {
    res.send(JSON.stringify(cadastro.getAtividades()));
});
app.post('/atividade', function (req, res) {
    var atividade = req.body; //verificar se é mesmo Aluno!
    atividade = cadastro.criar(atividade);
    if (atividade) {
        res.send({ "success": "A atividade em campo foi cadastrado com sucesso" });
    }
    else {
        res.send({ "failure": "A atividade em campo não pode ser cadastrado" });
    }
});
app.put('/atividade', function (req, res) {
    var atividade = req.body;
    atividade = cadastro.atualizar(atividade);
    if (atividade) {
        res.send({ "success": "A atividade em campo foi atualizado com sucesso" });
    }
    else {
        res.send({ "failure": "A atividade em campo não pode ser atualizado" });
    }
});
app.delete('/atividade', function (req, res) {
    var atividade = req.body;
    var removido = cadastro.remover(atividade); //deveria haver um teste de remoção
    if (removido) {
        res.send({ "success": "A atividade em campo foi atualizado com sucesso" });
    }
    else {
        res.send({ "failure": "A atividade em campo não pode ser atualizado" });
    }
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=ta-server.js.map