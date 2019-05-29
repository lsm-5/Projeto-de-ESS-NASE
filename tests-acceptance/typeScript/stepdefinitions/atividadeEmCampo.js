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
let sameName = ((elem, name) => elem.element(protractor_1.by.name('atividadelist')).getText().then(text => text === name));
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
        yield protractor_1.$("input[name='cpfbox']").sendKeys(profissional);
        yield protractor_1.$("input[name='cpfbox']").sendKeys(local);
        yield protractor_1.$("input[name='cpfbox']").sendKeys(datai);
        yield protractor_1.$("input[name='cpfbox']").sendKeys(dataf);
    }));
    When(/^aperto em salvar$/, (nome, profissional, local, datai, dataf) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
    }));
    Then(/^vejo a atividade "([^\"]*)", profissional "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, (nome, profissional, local, dini, dfin) => __awaiter(this, void 0, void 0, function* () {
        var allalunos = protractor_1.element.all(protractor_1.by.name('atividadelist'));
        allalunos.filter(elem => pAND(sameName(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
});
