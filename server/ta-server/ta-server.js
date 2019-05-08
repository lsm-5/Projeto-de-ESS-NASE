"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cadastroprontuario_1 = require("./cadastroprontuario");
var app = express();
exports.app = app;
var cadastro = new cadastroprontuario_1.CadastroDeProntuarios();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.get('/prontuarios', function (req, res) {
    res.send(JSON.stringify(cadastro.getProntuarios()));
});
app["delete"]('/prontuario', function (req, res) {
    //====================AQUI
    var cpf = req.body;
    var prontuarios = cadastro.remover(cpf); //retorna array de prontuarios
    res.send({ "success": "O prontuario foi removido com sucesso" });
    //================================
});
app.post('/prontuario', function (req, res) {
    var prontuario = req.body; //verificar se é mesmo Prontuario!
    console.log(prontuario);
    console.log(JSON.stringify(prontuario));
    prontuario = cadastro.criar(prontuario);
    if (prontuario) {
        res.send({ "success": "O prontuario foi cadastrado com sucesso" });
    }
    else {
        res.send({ "failure": "O prontuario não pode ser cadastrado" });
    }
});
app.put('/prontuario', function (req, res) {
    var prontuario = req.body;
    prontuario = cadastro.atualizar(prontuario);
    if (prontuario) {
        res.send({ "success": "O prontuario foi atualizado com sucesso" });
    }
    else {
        res.send({ "failure": "O prontuario não pode ser atualizado" });
    }
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
