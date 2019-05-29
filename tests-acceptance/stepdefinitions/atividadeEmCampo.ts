import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('atividadelist')).getText().then(text => text === name));

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
        await $("input[name='cpfbox']").sendKeys(<string> profissional);
        await $("input[name='cpfbox']").sendKeys(<string> local);
        await $("input[name='cpfbox']").sendKeys(<string> datai);
        await $("input[name='cpfbox']").sendKeys(<string> dataf);
    });

    When(/^aperto em salvar$/, async (nome, profissional, local, datai, dataf) => {
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^vejo a atividade "([^\"]*)", profissional "([^\"]*)", local "([^\"]*)", data inicial "([^\"]*)", data final "([^\"]*)"$/, async (nome, profissional, local, dini, dfin) => {
        var allalunos : ElementArrayFinder = element.all(by.name('atividadelist'));
        allalunos.filter(elem => pAND(sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
})
