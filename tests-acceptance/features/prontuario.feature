Feature: Prontuário Médico

Scenario: Registro de prontuário por um médico ao fim de uma consulta.
Given Eu estou na página “novo registro”
Given Eu preencho o campo Aluno com “Adriano Filho”
Given Eu preencho os campos de horário e data com “1000” e “10/10/18”, respectivamente
Given Eu preencho o campo de comentários com "ele tem problemas"
When Eu seleciono a opção “Finalizar”
Then Eu vejo uma mensagem de confirmação de registro

Scenario: Busca por prontuário previamente criado.
Given Eu estou na página de “Busca de prontuário”
Given Eu já registrei previamente um prontuário médico para o aluno “Adriano Filho”
Given Eu preencho o campo de busca com o nome “Adriano”
When Eu seleciono a opção “buscar”
Then Eu vejo uma lista de históricos de alunos cujo primeiro nome é “Adriano”

Scenario: Visualização de histórico prontuário de um aluno pelo profissional.
Given Eu estou na página de “Busca de prontuário”
Given Eu vejo o aluno “Adriano Filho” listado na lista de históricos registrados
When Eu seleciono a opção “Histórico” na referência para o aluno “Adriano Filho”
Then Eu estou na página de “Histórico de prontuários”
Then Eu posso ver uma lista de todos os prontuários médicos registrados para aquele aluno

Scenario: Visualização de prontuário por um médico.
Given Eu estou na página de “Histórico de prontuário” do aluno “Adriano Filho”
Given Eu vejo na lista de prontuários uma instância com data “10/10/18” e médico “Xuliano”
When Eu seleciono a opção “Visualizar”
Then Eu posso ver a ficha médica do aluno “Adriano Filho” criada na data “10/10/18” pelo médico “Xuliano”

