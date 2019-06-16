import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { InfosDeConsultaCliente } from './InfosDeConsultaCliente';

@Injectable()
export class InfosDeConsultaClienteService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(info: InfosDeConsultaCliente): Promise<InfosDeConsultaCliente> {
    return this.http.post(this.taURL + "/infoConsulta",JSON.stringify(info), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return info;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  remover(info: InfosDeConsultaCliente): Promise<InfosDeConsultaCliente> {
    return this.http.delete(this.taURL + "/infoConsulta", {headers: this.headers, body: JSON.stringify(info)})
    .toPromise()
    .then(res => {
      if (res.json().success) {return info;} else {return null;}
    })
    .catch(this.tratarErro);
  }

  atualizar(info: InfosDeConsultaCliente): Promise<InfosDeConsultaCliente>  {
    return this.http.put(this.taURL + "/infoConsulta",JSON.stringify(info), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return info;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  buscar(info: InfosDeConsultaCliente): Promise<InfosDeConsultaCliente[]>  {
    return this.http.post(this.taURL + "/buscaInfoConsulta",JSON.stringify(info), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.json().failure) {return null;} else {return res.json() as InfosDeConsultaCliente[];}
      })
      .catch(this.tratarErro)
  }
  
  getInfos(): Promise<InfosDeConsultaCliente[]> {
    return this.http.get(this.taURL + "/infosConsulta")
             .toPromise()
             .then(res => res.json() as InfosDeConsultaCliente[])
             .catch(this.tratarErro)
  }
  

  private tratarErro (erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de Informaçoes (Agendamento/Historico) de Cliente', erro);
    return Promise.reject(erro.message || erro);
  }
  
}
