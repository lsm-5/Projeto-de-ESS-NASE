import express = require('express')
import bodyParser = require("body-parser");

import {Prontuario} from '../../gui/ta-gui/src/app/prontuario';
import {CadastroDeProntuarios} from './cadastroprontuario';

var app = express();

var cadastro: CadastroDeProntuarios = new CadastroDeProntuarios();

var allowCrossDomain = function(req: any, res: any, next: any) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/prontuarios', function (req, res) {
		res.send(JSON.stringify(cadastro.getProntuarios()));
		})
// app.delete('/prontuario', function(req: express.Request, res: express.Response){
// 		//====================AQUI
// 		var cpf = req.body;
// 		var prontuarios = cadastro.remover(cpf);//retorna array de prontuarios
// 		res.send({ "success": "O prontuario foi removido com sucesso" });
// 		//================================
// 		});

app.post('/prontuario', function (req: express.Request, res: express.Response) {
		var prontuario: Prontuario = <Prontuario> req.body; //verificar se é mesmo Prontuario!
		console.log(prontuario);
		console.log(JSON.stringify(prontuario));
		prontuario = cadastro.criar(prontuario);
		if (prontuario) {
		res.send({"success": "O prontuario foi cadastrado com sucesso"});
		} else {
		res.send({"failure": "O prontuario não pode ser cadastrado"});
		}
		})

app.put('/prontuario', function (req: express.Request, res: express.Response) {
		var prontuario: Prontuario = <Prontuario> req.body;
		prontuario = cadastro.atualizar(prontuario);
		if (prontuario) {
		res.send({"success": "O prontuario foi atualizado com sucesso"});
		} else {
		res.send({"failure": "O prontuario não pode ser atualizado"});
		}
		})
app.listen(3000, function () {
		console.log('Example app listening on port 3000!')
		})

export { app }
