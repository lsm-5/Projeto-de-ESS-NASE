import express = require('express');
import bodyParser = require("body-parser");

import { AtividadeEmCampo } from '../../gui/ta-gui/src/app/atividadeCampo/atividadeEmCampo';
import {CadastroDeAtividades} from './cadastrodeatividades';

var app = express();

var cadastro: CadastroDeAtividades = new CadastroDeAtividades();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

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
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

export { app }
