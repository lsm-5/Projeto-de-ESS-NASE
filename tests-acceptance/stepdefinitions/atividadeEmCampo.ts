import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameDataf = ((elem, dataf) => elem.element(by.name('dflist')).getText().then(text => text === dataf));
let sameDatai = ((elem, datai) => elem.element(by.name('dilist')).getText().then(text => text === datai));
let sameLocal = ((elem, local) => elem.element(by.name('locallist')).getText().then(text => text === local));
let sameParticipante = ((elem, participantes) => elem.element(by.name('participanteslist')).getText().then(text => text === participantes));
let sameProfissional = ((elem, profissional) => elem.element(by.name('profissionallist')).getText().then(text => text === profissional));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));


let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {

    //1° Scenario: Registro de Atividade em campo, sem os dados dos alunos que compareceram

    Given(/^estou na página de registro de atividade em campo$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='atividadeEmCampo']").click();
    })

    Given(/^vejo a seções vazias de atividade, profissional, participantes, local, data inicial, data final$/, async () => {
        var input = element.all(by.name('nome'));
        await input==null;
        input = element.all(by.name('profissional'));
        await input==null;
        input = element.all(by.name('participantes'));
        await input==null;
        input = element.all(by.name('local'));
        await input==null;
        input = element.all(by.name('datai'));
        await input==null;
        input = element.all(by.name('dataf'));
        await input==null;
    });

    When(/^preencho com a atividade "([^\"]*)", profissional "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, local, datai, dataf) => {
        await $("input[name='nome']").sendKeys(<string> nome);
        await $("input[name='profissional']").sendKeys(<string> profissional);
        await $("input[name='local']").sendKeys(<string> local);
        await $("input[name='datai']").sendKeys(<string> datai);
        await $("input[name='dataf']").sendKeys(<string> dataf);
    });

    When(/^aperto em salvar$/, async () => {
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^observo a atividade "([^\"]*)", profissional "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, local, dini, dfin) => {
        var allatividades : ElementArrayFinder = element.all(by.name('atividadelist'));
        allatividades.filter(elem => pAND(sameProfissional(elem,profissional),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        allatividades.filter(elem => pAND(sameLocal(elem,local),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        allatividades.filter(elem => pAND(sameDatai(elem,dini),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       
        allatividades.filter(elem => pAND(sameDataf(elem,dfin),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       




        //resetando o servidor
        await $("input[name='nome']").sendKeys(<string> nome);
        await element(by.buttonText('Remover')).click();

    });

    //2° Scenario: Busca de Atividade em campo durante o mês de fevereiro de 2018.

    Given(/^estou na página de busca de atividade em campo$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='atividadeEmCampo']").click();

        //colocando o resultado no servidor pra o teste rodar sem precisar de um estado inicial
        await $("input[name='nome']").sendKeys(<string> "Palestra sobre o RU");
        await $("input[name='profissional']").sendKeys(<string> "Roberta Maria");
        await $("input[name='participantes']").sendKeys(<string> "Jennifer");
        await $("input[name='local']").sendKeys(<string> "Casa Mista");
        await $("input[name='datai']").sendKeys(<string> "15/02/19");
        await $("input[name='dataf']").sendKeys(<string> "15/02/19");
        await element(by.buttonText('Adicionar')).click();
    })

    Given(/^vejo as seções atividade, profissional, datas, participantes, local vazias$/, async () => {
        var input = element.all(by.name('nome'));
        await input==null;
        input = element.all(by.name('profissional'));
        await input==null;
        input = element.all(by.name('participantes'));
        await input==null;
        input = element.all(by.name('local'));
        await input==null;
    });

    When(/^preencho a seção de data com "([^\"]*)" entre "([^\"]*)"$/, async (datai, dataf) => {
        await $("input[name='datai']").sendKeys(<string> datai);
        await $("input[name='dataf']").sendKeys(<string> dataf);
    });

    When(/^aperto em buscar$/, async () => {
        await element(by.buttonText('Buscar Atividade')).click();
    });

    Then(/^eu vejo o registro de atividade "([^\"]*)", profissional "([^\"]*)", participante "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, participantes, local, dini, dfin) => {
        var allatividades : ElementArrayFinder = element.all(by.name('atividadelistbusca'));
        allatividades.filter(elem => pAND(sameProfissional(elem,profissional),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        allatividades.filter(elem => pAND(sameLocal(elem,local),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        allatividades.filter(elem => pAND(sameDatai(elem,dini),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       
        allatividades.filter(elem => pAND(sameDataf(elem,dfin),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       
        allatividades.filter(elem => pAND(sameParticipante(elem,participantes),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       


        //voltar o sesrver pro estado inicial
        await $("input[name='nome']").sendKeys(<string> nome);
        await element(by.buttonText('Remover')).click();
    });


    //3° Scenario:Busca da relação de estudante do acolhimento realizado fora do NASE.
    Given(/^estou na página de busca da atividade em campo$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='atividadeEmCampo']").click();

        //colocando o resultado no servidor pra o teste rodar sem precisar de um estado inicial
        await $("input[name='nome']").sendKeys(<string> "Acolhimento");
        await $("input[name='profissional']").sendKeys(<string>"Lucas Mendonça");
        await $("input[name='participantes']").sendKeys(<string> "Roberto Tomás da Silva, Íris Soares dos Santos, Aline Gouveia Matias, Thais Amara Silva de Mendonça");
        await $("input[name='local']").sendKeys(<string> "CEU");
        await $("input[name='datai']").sendKeys(<string> "31/12/19");
        await $("input[name='dataf']").sendKeys(<string> "31/12/19");
        await element(by.buttonText('Adicionar')).click();
    })

    Given(/^eu vejo a atividade "([^\"]*)", profissional "([^\"]*)", participantes "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, participantes, local, dini, dfin) => {
        var allatividades : ElementArrayFinder = element.all(by.name('atividadelist'));
        allatividades.filter(elem => pAND(sameProfissional(elem,profissional),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        allatividades.filter(elem => pAND(sameLocal(elem,local),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        allatividades.filter(elem => pAND(sameDatai(elem,dini),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       
        allatividades.filter(elem => pAND(sameDataf(elem,dfin),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       
        allatividades.filter(elem => pAND(sameParticipante(elem,participantes),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       

    });

    When(/^eu aperto em expandir$/, async () => {
        await element(by.buttonText('+')).click();
    });

    Then(/^eu vejo atividade "([^\"]*)", profissional "([^\"]*)", participantes "([^\"]*)", local "([^\"]*)", data "([^\"]*)", data final "([^\"]*)" expandida$/, async (nome, profissional, participantes, local, dini, dfin) => {
        var allatividadesExpandida : ElementArrayFinder = element.all(by.name('atividadelist'));
        allatividadesExpandida.filter(elem => pAND(sameProfissional(elem,profissional),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        
        //voltar o server pro estado inicial
        await $("input[name='nome']").sendKeys(<string> nome);
        await element(by.buttonText('Remover')).click();
    });

    // Scenario: Edição de uma atividade em campo realizado no local errado.
    Given(/^estou na página de atividade em campo$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='atividadeEmCampo']").click();

        //colocando o resultado no servidor pra o teste rodar sem precisar de um estado inicial
        await $("input[name='nome']").sendKeys(<string> "Palestra sobre DST");
        await $("input[name='profissional']").sendKeys(<string>"Eusa Marina Mendonça");
        await $("input[name='participantes']").sendKeys(<string> "Douglas Tomás da Silva, José Gabriel, Bruno Matias, Xuliano Domingos");
        await $("input[name='local']").sendKeys(<string> "CEU");
        await $("input[name='datai']").sendKeys(<string> "30/03/19");
        await $("input[name='dataf']").sendKeys(<string> "30/03/19");
        await element(by.buttonText('Adicionar')).click();
    })

    Given(/^vejo atividade "([^\"]*)", profissional "([^\"]*)", participantes "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, participantes, local, dini, dfin) => {
        var allatividades : ElementArrayFinder = element.all(by.name('atividadelist'));
        allatividades.filter(elem => pAND(sameProfissional(elem,profissional),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        allatividades.filter(elem => pAND(sameLocal(elem,local),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        
        allatividades.filter(elem => pAND(sameDatai(elem,dini),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       
        allatividades.filter(elem => pAND(sameDataf(elem,dfin),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       
        allatividades.filter(elem => pAND(sameParticipante(elem,participantes),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));       

    });

    When(/^faço a alteração da atividade para atividade "([^\"]*)", profissional "([^\"]*)", participantes "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, participantes, local, dini, dfin) => {
        await $("input[name='nome']").sendKeys(<string> nome);
        await $("input[name='profissional']").sendKeys(<string> profissional);
        await $("input[name='participantes']").sendKeys(<string> participantes);
        await $("input[name='local']").sendKeys(<string> local);
        await $("input[name='datai']").sendKeys(<string> dini);
        await $("input[name='dataf']").sendKeys(<string> dfin);   
    });

    When(/^aperto em atualizar$/, async () => {
        await element(by.buttonText('Alterar')).click();
    });

    Then(/^eu vejo a atividade "([^\"]*)" com o local "([^\"]*)"$/, async (nome, local) => {
        var allatividades : ElementArrayFinder = element.all(by.name('atividadelist'));
        allatividades.filter(elem => pAND(sameLocal(elem,local),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));        

        //voltar o sesrver pro estado inicial
        await $("input[name='nome']").sendKeys(<string> nome);
        await element(by.buttonText('Remover')).click();
    });
})
