import request = require("request-promise");
import { closeServer } from '../ta-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de Atividades em Campo vazia", () => {
    return request.get(base_url + "atividades").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
  })

  it("só cadastra atividades corretamente", () => {
    var options:any = {method: 'POST', uri: (base_url + "atividade"), body:{atividade: "Avaliação de Alunos da Casa Mista (manhã)", profissional : "Lucas Silva", participantes:"", local : "Casa Mista", datainicial : "09/06/19", datafinal : "09/06/19"}, json: true};
    return request(options).then(body =>
         expect(body).toEqual({success: "A atividade em campo foi cadastrado com sucesso"})
    ).catch(e =>
         expect(e).toEqual(null)
    )
  });

  it("não cadastra Atividade em Campo com o nome duplicado", () => {
    return request.post(base_url + "atividade", {"json":{"atividade": "Avaliação de Alunos da Casa Mista (manhã)", "profissional" : "Lucas Silva", "participantes":"", "local" : "Casa Mista", "datainicial" : "09/06/19", "datafinal" : "09/06/19"}}).then(body => {
         expect(body).toEqual({success: "A atividade em campo foi cadastrado com sucesso"});
         return request.post(base_url + "atividade", {"json":{"atividade": "Avaliação de Alunos da Casa Mista (manhã)", "profissional" : "Vanessa Silva", "participantes":"", "local" : "Casa Feminina", "datainicial" : "09/06/19", "datafinal" : "09/06/19"}}).then(body => {
             expect(body).toEqual({failure: "A atividade em campo não pode ser cadastrado"});
             return request.get(base_url + "atividades").then(body => {
                 expect(body).toContain('{"atividade":"Avaliação de Alunos da Casa Mista (manhã)","profissional":"Lucas Silva","participantes":"","local":"Casa Mista","datainicial":"09/06/19","datafinal":"09/06/19"}');
                 expect(body).not.toContain('{"atividade":"Avaliação de Alunos da Casa Mista (manhã)","profissional":"Vanessa Silva","participantes":"","local":"Casa Feminina","datainicial":"09/06/19","datafinal":"09/06/19"}');
             });
         });
     });
  })

})
