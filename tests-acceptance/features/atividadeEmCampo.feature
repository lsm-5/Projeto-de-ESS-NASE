
Feature: As a professional
         I want to register field activity
So that I can verify then record

Scenario: Registro de Atividade em campo, sem os dados dos alunos que compareceram
Given estou na página de registro de atividade em campo
Given vejo a seções vazias de atividade, profissional, participantes, local, data inicial, data final
When preencho com a atividade "Acolhimento", profissional "Lucas Mendonça", local "CEU", data inicial "31/12/19", data final "31/12/19"
When aperto em salvar
Then vejo a atividade "Acolhimento", profissional "Lucas Mendonça", local "CEU", data inicial "31/12/19", data final "31/12/19"

Scenario: Busca de Atividade em campo durante o mês de fevereiro de 2018.
Given estou na página de busca de atividade em campo
Given vejo as seções vazias de atividade, profissional, datas, participantes, local
When preencho a seção de data com "01/02/2019" entre "28/02/2019"
When aperto em buscar
Then eu vejo o registro de atividade "Palestra sobre o RU", profissional "Roberta Maria", participante "Jennifer", local "Casa Mista", data inicial "15/02/19", data final "15/02/19"

Scenario:Busca da relação de estudante do acolhimento realizado fora do NASE.
Given estou na página de busca da atividade em campo
Given vejo a atividade "Acolhimento", profissional "Lucas Mendonça", participantes "Roberto To...", local "CEU", data inicial "31/12/19", data final "31/12/19"
When eu aperto em expandir
Then eu vejo atividade "Acolhimento", profissional "Lucas Mendonça", participantes "Roberto Tomás da Silva, Íris Soares dos Santos, Aline Gouveia Matias, Thais Amara Silva de Mendonça", local "CEU", data "31/12/19", data final "31/12/19"

Scenario: Edição de uma atividade em campo realizado no local errado.
Given estou na página de atividade em campo
Given vejo atividade "Palestra sobre DST", profissional "Eusa Marina Mendonça", participantes "Douglas Tomás da Silva, José Gabriel, Bruno Matias, Xuliano Domingos", local "CEU", data inicial "31/12/19", data final "31/12/19"
When faço a alteração da atividade para atividade "Palestra sobre DST", profissional "Eusa Marina Mendonça", participantes "Douglas Tomás da Silva, José Gabriel, Bruno Matias, Xuliano Domingos", local "Centro de Informática - CIn", data inicial "31/12/19", data final "31/12/19"
When aperto em atualizar
Then eu vejo a atividade "Palestra sobre DST" com o local "Centro de Informática - CIn"