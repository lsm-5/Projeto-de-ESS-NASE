import express = require('express')
import bodyParser = require("body-parser");

import {Aluno} from '../../gui/ta-gui/src/app/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

var app = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/alunos', function (req, res) {
		res.send(JSON.stringify(cadastro.getAlunos()));
		})
app.delete('/aluno', function(req: express.Request, res: express.Response){
		//====================AQUI
		var cpf = req.body;
		var alunos = cadastro.remover(cpf);//retorna array de alunos
		res.send({ "success": "O aluno foi removido com sucesso" });
		//================================
		});

app.post('/aluno', function (req: express.Request, res: express.Response) {
		var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
		console.log(aluno);
		console.log(JSON.stringify(aluno));
		aluno = cadastro.criar(aluno);
		if (aluno) {
		res.send({"success": "O aluno foi cadastrado com sucesso"});
		} else {
		res.send({"failure": "O aluno não pode ser cadastrado"});
		}
		})

app.put('/aluno', function (req: express.Request, res: express.Response) {
		var aluno: Aluno = <Aluno> req.body;
		aluno = cadastro.atualizar(aluno);
		if (aluno) {
		res.send({"success": "O aluno foi atualizado com sucesso"});
		} else {
		res.send({"failure": "O aluno não pode ser atualizado"});
		}
		})
app.listen(3000, function () {
		console.log('Example app listening on port 3000!')
		})

export { app }
