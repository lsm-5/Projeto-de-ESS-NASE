import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let same = ((elem, name) => elem.element(by.name('atividadelist')).getText().then(text => text === name));

let pAND = (p => p.then(a => a && p))

defineSupportCode(function ({ Given, When, Then }) {

    //Scenario: Registro de Atividade em campo, sem os dados dos alunos que compareceram

    Given(/^estou na página de registro de atividade em campo$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='atividadeEmCampo']").click();
    })

    Given(/^vejo a seções vazias de atividade, profissional, participantes, local, data inicial, data final$/, async (cpf) => {
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

    Then(/^vejo a atividade "([^\"]*)", profissional "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, local, dini, dfin) => {
        var allatividades : ElementArrayFinder = element.all(by.name('atividadelist'));
        await allatividades.filter(elem => pAND(same(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,profissional))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,local))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,dini))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,dfin))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    //Scenario: Busca de Atividade em campo durante o mês de fevereiro de 2018.

    Given(/^Given estou na página de busca de atividade em campo$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='atividadeEmCampo']").click();

        //colocando o resultado no servidor pra o teste rodar sem precisar de um estado inicial
        await $("input[name='nome']").sendKeys("Palestra sobre o RU");
        await $("input[name='profissional']").sendKeys("Roberta Maria");
        await $("input[name='participantes']").sendKeys("Jennifer");
        await $("input[name='local']").sendKeys("Casa Mista");
        await $("input[name='datai']").sendKeys("15/02/19");
        await $("input[name='dataf']").sendKeys("15/02/19");
        await element(by.buttonText('Adicionar')).click();
    })

    Given(/^vejo as seções vazias de atividade, profissional, datas, participantes, local$/, async () => {
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
        await $("input[name='cpfbox']").sendKeys(<string> datai);
        await $("input[name='cpfbox']").sendKeys(<string> dataf);
    });

    When(/^aperto em buscar$/, async () => {
        await element(by.buttonText('Buscar Atividade')).click();
    });

    Then(/^eu vejo o registro de atividade "([^\"]*)", profissional "([^\"]*)", participante "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, participantes, local, dini, dfin) => {
        var allatividades : ElementArrayFinder = element.all(by.name('atividadelistbusca'));
        await allatividades.filter(elem => pAND(same(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,profissional))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,participantes))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,local))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,dini))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allatividades.filter(elem => pAND(same(elem,dfin))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });


})
