import express = require('express');
import bodyParser = require("body-parser");

import { AtividadeEmCampo } from '../../gui/ta-gui/src/app/atividadeCampo/atividadeEmCampo';
import {CadastroDeAtividades} from './cadastrodeatividades';

import { InfosDeConsultaCliente } from '../../gui/ta-gui/src/app/InfosDeConsultaCliente/InfosDeConsultaCliente';
import { CadastroDeInfosDeCosultas } from './cadastrarInfosDeConsultaCliente';

var app = express();

var cadastro: CadastroDeAtividades = new CadastroDeAtividades();

var cadastroInfosConsulta: CadastroDeInfosDeCosultas = new CadastroDeInfosDeCosultas();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

// lucas---------------------------------------------------------------

app.get('/atividades', function (req, res) {
  res.send(JSON.stringify(cadastro.getAtividades()));
})

app.post('/atividade', function (req: express.Request, res: express.Response) {
  var atividade : AtividadeEmCampo = <AtividadeEmCampo> req.body; 
  atividade = cadastro.criar(atividade);
  if (atividade) {
    res.send({"success": "A atividade em campo foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "A atividade em campo não pode ser cadastrado"});
  }
})

app.post('/buscaAtividades', function (req: express.Request, res: express.Response) {
  var atividade : AtividadeEmCampo = <AtividadeEmCampo> req.body; 
  var atividadesBuscadas = cadastro.busca(atividade);
  if (atividadesBuscadas.length>0) {
    res.send(JSON.stringify(atividadesBuscadas));
  } else {
    res.send({"failure": "A atividade em campo não pode ser cadastrado"});
  }
})

app.put('/atividade', function (req: express.Request, res: express.Response) {
  var atividade: AtividadeEmCampo = <AtividadeEmCampo> req.body;
  atividade = cadastro.atualizar(atividade);
  if (atividade) {
    res.send({"success": "A atividade em campo foi atualizado com sucesso"});
  } else {
    res.send({"failure": "A atividade em campo não pode ser atualizado"});
  }
})
app.delete('/atividade',function(req: express.Request, res: express.Response){
  var atividade = req.body;
  var removido = cadastro.remover(atividade); //deveria haver um teste de remoção
  if (removido) {
    res.send({"success": "A atividade em campo foi atualizado com sucesso"});
  } else {
    res.send({"failure": "A atividade em campo não pode ser atualizado"});
  }
});

// generico ---------------------------------------------------------------

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void{
  server.close();
}

// juliano --------------------------------------------------------------- 
app.get('/infosConsulta', function (req, res) {
  res.send(JSON.stringify(cadastroInfosConsulta.getInfos()));
})

app.post('/infoConsulta', function (req: express.Request, res: express.Response) {
  var info : InfosDeConsultaCliente = <InfosDeConsultaCliente> req.body; 
  info = cadastroInfosConsulta.criar(info);
  if (info) {
    res.send({"success": "A consulta foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "A consulta em campo não pode ser cadastrado"});
  }
})

app.post('/buscaInfoConsulta', function (req: express.Request, res: express.Response) {
  var info : InfosDeConsultaCliente = <InfosDeConsultaCliente> req.body; 
  var infosBuscadas = cadastroInfosConsulta.busca(info);
  if (infosBuscadas.length>0) {
    res.send(JSON.stringify(infosBuscadas));
  } else {
    res.send({"failure": "A consulta não pode ser buscada/cadastrada"});
  }
})

app.put('/infoConsulta', function (req: express.Request, res: express.Response) {
  var info: InfosDeConsultaCliente = <InfosDeConsultaCliente> req.body;
  info = cadastroInfosConsulta.atualizar(info);
  if (info) {
    res.send({"success": "A consulta foi atualizado com sucesso"});
  } else {
    res.send({"failure": "A consultanão pode ser atualizada"});
  }
})
app.delete('/infoConsulta',function(req: express.Request, res: express.Response){
  var info = req.body;
  var removido = cadastroInfosConsulta.remover(info); //deveria haver um teste de remoção
  if (removido) {
    res.send({"success": "A consulta foi atualizada (removida) com sucesso"});
  } else {
    res.send({"failure": "A consulta não pode ser atualizada (removida)"});
  }
});

export { app, server, closeServer }
