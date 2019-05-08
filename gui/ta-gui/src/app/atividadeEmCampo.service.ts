import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AtividadeEmCampo } from './atividadeEmCampo';

@Injectable()
export class AtividadeEmCampoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(atividade: AtividadeEmCampo): Promise<AtividadeEmCampo> {
    return this.http.post(this.taURL + "/atividade",JSON.stringify(atividade), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return atividade;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  remover(atividade:AtividadeEmCampo): Promise<AtividadeEmCampo>{
    return this.http.delete(this.taURL + "/atividade", {headers: this.headers, body: JSON.stringify(atividade)})
    .toPromise()
    .then(res => {
      if (res.json().success) {return atividade;} else {return null;}
    })
    .catch(this.tratarErro);
  }

  atualizar(atividade: AtividadeEmCampo): Promise<AtividadeEmCampo> {
    return this.http.put(this.taURL + "/atividade",JSON.stringify(atividade), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return atividade;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  buscar(atividade: AtividadeEmCampo): Promise<AtividadeEmCampo[]> {
    return this.http.post(this.taURL + "/buscaAtividades",JSON.stringify(atividade), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.json().failure) {return null;} else {return res.json() as AtividadeEmCampo[];}
      })
      .catch(this.tratarErro)
  }
  
  getAtividade(): Promise<AtividadeEmCampo[]> {
    return this.http.get(this.taURL + "/atividades")
             .toPromise()
             .then(res => res.json() as AtividadeEmCampo[])
             .catch(this.tratarErro)
  }
  

  private tratarErro (erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de Atividade em Campo', erro);
    return Promise.reject(erro.message || erro);
  }
  
}
