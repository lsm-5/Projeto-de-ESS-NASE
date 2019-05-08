
import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Prontuario } from './prontuario';

@Injectable()
export class ProntuarioService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(prontuario: Prontuario): Promise<Prontuario> {
    return this.http.post(this.taURL + "/prontuario",JSON.stringify(prontuario), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return prontuario;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  remover(prontuario: Prontuario): Promise<Prontuario>{//recebe cpf:string
    //=======================AQuI
    return this.http.delete(this.taURL + "/prontuario",{headers: this.headers, body: JSON.stringify(prontuario)})//AQUI
         .toPromise()
         .then(res => {
            if (res.json().success) {return prontuario;} else {return null;}
         })
         .catch(this.tratarErro);
         //=============================
  }
  atualizar(prontuario: Prontuario): Promise<Prontuario> {
    return this.http.put(this.taURL + "/prontuario",JSON.stringify(prontuario), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return prontuario;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  getProntuarios(): Promise<Prontuario[]> {
    return this.http.get(this.taURL + "/prontuarios")
             .toPromise()
             .then(res => res.json() as Prontuario[])
             .catch(this.tratarErro);
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de prontuarios',erro);
    return Promise.reject(erro.message || erro);
  }
}
