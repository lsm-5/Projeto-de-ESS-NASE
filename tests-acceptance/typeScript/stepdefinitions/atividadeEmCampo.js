"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));
let same = ((elem, name) => elem.element(protractor_1.by.name('atividadelist')).getText().then(text => text === name));
let pAND = (p => p.then(a => a && p));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    //Scenario: Registro de Atividade em campo, sem os dados dos alunos que compareceram
    Given(/^estou na página de registro de atividade em campo$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('TaGui');
        yield protractor_1.$("a[name='atividadeEmCampo']").click();
    }));
    Given(/^vejo a seções vazias de atividade, profissional, participantes, local, data inicial, data final$/, (cpf) => __awaiter(this, void 0, void 0, function* () {
        var input = protractor_1.element.all(protractor_1.by.name('nome'));
        (yield input) == null;
        input = protractor_1.element.all(protractor_1.by.name('profissional'));
        (yield input) == null;
        input = protractor_1.element.all(protractor_1.by.name('participantes'));
        (yield input) == null;
        input = protractor_1.element.all(protractor_1.by.name('local'));
        (yield input) == null;
        input = protractor_1.element.all(protractor_1.by.name('datai'));
        (yield input) == null;
        input = protractor_1.element.all(protractor_1.by.name('dataf'));
        (yield input) == null;
    }));
    When(/^preencho com a atividade "([^\"]*)", profissional "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, (nome, profissional, local, datai, dataf) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='nome']").sendKeys(nome);
        yield protractor_1.$("input[name='profissional']").sendKeys(profissional);
        yield protractor_1.$("input[name='local']").sendKeys(local);
        yield protractor_1.$("input[name='datai']").sendKeys(datai);
        yield protractor_1.$("input[name='dataf']").sendKeys(dataf);
    }));
    When(/^aperto em salvar$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
    }));
    Then(/^vejo a atividade "([^\"]*)", profissional "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, (nome, profissional, local, dini, dfin) => __awaiter(this, void 0, void 0, function* () {
        var allatividades = protractor_1.element.all(protractor_1.by.name('atividadelist'));
        yield allatividades.filter(elem => pAND(same(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, profissional))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, local))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, dini))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, dfin))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    //Scenario: Busca de Atividade em campo durante o mês de fevereiro de 2018.
    Given(/^estou na página de busca de atividade em campo$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('TaGui');
        yield protractor_1.$("a[name='atividadeEmCampo']").click();
        //colocando o resultado no servidor pra o teste rodar sem precisar de um estado inicial
        yield protractor_1.$("input[name='nome']").sendKeys("Palestra sobre o RU");
        yield protractor_1.$("input[name='profissional']").sendKeys("Roberta Maria");
        yield protractor_1.$("input[name='participantes']").sendKeys("Jennifer");
        yield protractor_1.$("input[name='local']").sendKeys("Casa Mista");
        yield protractor_1.$("input[name='datai']").sendKeys("15/02/19");
        yield protractor_1.$("input[name='dataf']").sendKeys("15/02/19");
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
    }));
    Given(/^vejo as seções vazias de atividade, profissional, datas, participantes, local$/, () => __awaiter(this, void 0, void 0, function* () {
        var input = protractor_1.element.all(protractor_1.by.name('nome'));
        (yield input) == null;
        input = protractor_1.element.all(protractor_1.by.name('profissional'));
        (yield input) == null;
        input = protractor_1.element.all(protractor_1.by.name('participantes'));
        (yield input) == null;
        input = protractor_1.element.all(protractor_1.by.name('local'));
        (yield input) == null;
    }));
    When(/^preencho a seção de data com "([^\"]*)" entre "([^\"]*)"$/, (datai, dataf) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='cpfbox']").sendKeys(datai);
        yield protractor_1.$("input[name='cpfbox']").sendKeys(dataf);
    }));
    When(/^aperto em buscar$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Buscar Atividade')).click();
    }));
    Then(/^eu vejo o registro de atividade "([^\"]*)", profissional "([^\"]*)", participante "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, (nome, profissional, participantes, local, dini, dfin) => __awaiter(this, void 0, void 0, function* () {
        var allatividades = protractor_1.element.all(protractor_1.by.name('atividadelistbusca'));
        yield allatividades.filter(elem => pAND(same(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, profissional))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, participantes))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, local))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, dini))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, dfin))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    //Scenario:Busca da relação de estudante do acolhimento realizado fora do NASE.
    Given(/^estou na página de registro de atividade em campo$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('TaGui');
        yield protractor_1.$("a[name='atividadeEmCampo']").click();
        //colocando o resultado no servidor pra o teste rodar sem precisar de um estado inicial
        yield protractor_1.$("input[name='nome']").sendKeys("Acolhimento");
        yield protractor_1.$("input[name='profissional']").sendKeys("Lucas Mendonça");
        yield protractor_1.$("input[name='participantes']").sendKeys("Roberto Tomás da Silva, Íris Soares dos Santos, Aline Gouveia Matias, Thais Amara Silva de Mendonça");
        yield protractor_1.$("input[name='local']").sendKeys("CEU");
        yield protractor_1.$("input[name='datai']").sendKeys("31/12/19");
        yield protractor_1.$("input[name='dataf']").sendKeys("31/12/19");
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
    }));
    Given(/^vejo a atividade "([^\"]*)", profissional "([^\"]*)", participantes "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, (nome, profissional, participantes, local, dini, dfin) => __awaiter(this, void 0, void 0, function* () {
        var allatividades = protractor_1.element.all(protractor_1.by.name('atividadelist'));
        yield allatividades.filter(elem => pAND(same(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, profissional))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, participantes))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, local))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, dini))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, dfin))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    When(/^eu aperto em expandir$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('+')).click();
    }));
    Then(/^vejo a atividade "([^\"]*)", profissional "([^\"]*)", participantes "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, (nome, profissional, participantes, local, dini, dfin) => __awaiter(this, void 0, void 0, function* () {
        var atividadeC = protractor_1.element.all(protractor_1.by.name('nomeC'));
        yield atividadeC.filter(elem => pAND(same(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var atividadeC = protractor_1.element.all(protractor_1.by.name('profissionalC'));
        yield atividadeC.filter(elem => pAND(same(elem, profissional))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var atividadeC = protractor_1.element.all(protractor_1.by.name('participantesC'));
        yield atividadeC.filter(elem => pAND(same(elem, participantes))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var atividadeC = protractor_1.element.all(protractor_1.by.name('localC'));
        yield atividadeC.filter(elem => pAND(same(elem, local))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var atividadeC = protractor_1.element.all(protractor_1.by.name('dataiC'));
        yield atividadeC.filter(elem => pAND(same(elem, dini))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var atividadeC = protractor_1.element.all(protractor_1.by.name('datafC'));
        yield atividadeC.filter(elem => pAND(same(elem, dfin))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    // Scenario: Edição de uma atividade em campo realizado no local errado.
    Given(/^estou na página de registro de atividade em campo$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('TaGui');
        yield protractor_1.$("a[name='atividadeEmCampo']").click();
        //colocando o resultado no servidor pra o teste rodar sem precisar de um estado inicial
        yield protractor_1.$("input[name='nome']").sendKeys("Palestra sobre DST");
        yield protractor_1.$("input[name='profissional']").sendKeys("Eusa Marina Mendonça");
        yield protractor_1.$("input[name='participantes']").sendKeys("Douglas Tomás da Silva, José Gabriel, Bruno Matias, Xuliano Domingos");
        yield protractor_1.$("input[name='local']").sendKeys("CEU");
        yield protractor_1.$("input[name='datai']").sendKeys("31/12/19");
        yield protractor_1.$("input[name='dataf']").sendKeys("31/12/19");
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
    }));
    Given(/^vejo atividade "([^\"]*)", profissional "([^\"]*)", participantes "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, (nome, profissional, participantes, local, dini, dfin) => __awaiter(this, void 0, void 0, function* () {
        var allatividades = protractor_1.element.all(protractor_1.by.name('atividadelist'));
        yield allatividades.filter(elem => pAND(same(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, profissional))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, participantes))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, local))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, dini))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, dfin))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    When(/^faço a alteração da atividade para atividade "([^\"]*)", profissional "([^\"]*)", participantes "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, (nome, profissional, participantes, local, dini, dfin) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='nome']").sendKeys(nome);
        yield protractor_1.$("input[name='profissional']").sendKeys(profissional);
        yield protractor_1.$("input[name='participantes']").sendKeys(participantes);
        yield protractor_1.$("input[name='local']").sendKeys(local);
        yield protractor_1.$("input[name='datai']").sendKeys(dini);
        yield protractor_1.$("input[name='dataf']").sendKeys(dfin);
    }));
    When(/^aperto em atualizar$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Alterar')).click();
    }));
    Then(/^eu vejo a atividade "([^\"]*)" com o local "([^\"]*)"$/, (nome, local) => __awaiter(this, void 0, void 0, function* () {
        var allatividades = protractor_1.element.all(protractor_1.by.name('atividadelist'));
        yield allatividades.filter(elem => pAND(same(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allatividades.filter(elem => pAND(same(elem, local))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
});
