import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AgendamentoEHistoricoCliente } from './agendamento-ehistorico-cliente';

@Injectable()
export class AgendamentoEHistoricoClienteService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(agendamentoehistorico: AgendamentoEHistoricoCliente): Promise<AgendamentoEHistoricoCliente> {
    return this.http.post(this.taURL + "/agendamentoehistorico",JSON.stringify(agendamentoehistorico), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return agendamentoehistorico;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  remover(agendamentoehistorico: AgendamentoEHistoricoCliente): Promise<AgendamentoEHistoricoCliente> {
    return this.http.delete(this.taURL + "/agendamentoehistorico", {headers: this.headers, body: JSON.stringify(agendamentoehistorico)})
    .toPromise()
    .then(res => {
      if (res.json().success) {return agendamentoehistorico;} else {return null;}
    })
    .catch(this.tratarErro);
  }

  atualizar(agendamentoehistorico: AgendamentoEHistoricoCliente): Promise<AgendamentoEHistoricoCliente>  {
    return this.http.put(this.taURL + "/agendamentoehistorico",JSON.stringify(agendamentoehistorico), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return agendamentoehistorico;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  buscar(agendamentoehistorico: AgendamentoEHistoricoCliente): Promise<AgendamentoEHistoricoCliente[]>  {
    return this.http.post(this.taURL + "/buscaAgendamentoeHistorico",JSON.stringify(agendamentoehistorico), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.json().failure) {return null;} else {return res.json() as AgendamentoEHistoricoCliente[];}
      })
      .catch(this.tratarErro)
  }
  
  getAgendamentoEHistorico(): Promise<AgendamentoEHistoricoCliente[]> {
    return this.http.get(this.taURL + "/AgendamentosEHistoricos")
             .toPromise()
             .then(res => res.json() as AgendamentoEHistoricoCliente[])
             .catch(this.tratarErro)
  }
  

  private tratarErro (erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de Agendamento/Historico de Cliente', erro);
    return Promise.reject(erro.message || erro);
  }
  
}
