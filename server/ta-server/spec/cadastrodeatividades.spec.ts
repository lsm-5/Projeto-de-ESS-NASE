import { CadastroDeAtividades } from '../cadastrodeatividades';
import { AtividadeEmCampo } from '../../../gui/ta-gui/src/app/atividadeCampo/atividadeEmCampo';

describe("O cadastro de atividade", () => {
  var cadastro: CadastroDeAtividades;

  beforeEach(() => cadastro = new CadastroDeAtividades())

  it("é inicialmente vazio", () => {
    expect(cadastro.getAtividades().length).toBe(0);
  })

  it("cadastra atividades corretamente", () => {
    var atividade: AtividadeEmCampo = new AtividadeEmCampo();
    atividade.atividade = "Acolhimento";
    atividade.profissional = "Zé";
    atividade.participantes = "jgsp2";
    atividade.local = "Konoha";
    atividade.datainicial = "09/06/19";
    atividade.datafinal = "09/06/19";
    cadastro.criar(atividade);

    expect(cadastro.getAtividades().length).toBe(1);
    atividade = cadastro.getAtividades()[0];
    expect(atividade.atividade).toBe("Acolhimento");
    expect(atividade.profissional).toBe("Zé");
    expect(atividade.participantes).toBe("jgsp2");
    expect(atividade.local).toBe("Konoha");
    expect(atividade.datainicial).toBe("09/06/19");
    expect(atividade.datafinal).toBe("09/06/19");
    
  })

  it("não aceita atividades com Nome duplicado", () => {
    var atividade1: AtividadeEmCampo = new AtividadeEmCampo();
    atividade1.atividade = "Controle de HIV no campus";
    atividade1.profissional = "Zé";
    atividade1.participantes = "jgsp2";
    atividade1.local = "Konoha";
    atividade1.datainicial = "09/06/19";
    atividade1.datafinal = "09/06/19";
    cadastro.criar(atividade1);

    var atividade2: AtividadeEmCampo = new AtividadeEmCampo();
    atividade1.atividade = "Controle de HIV no campus";
    atividade1.profissional = "Leão";
    atividade1.participantes = "leau";
    atividade1.local = "Akatsuki";
    atividade1.datainicial = "09/06/19";
    atividade1.datafinal = "09/06/19";
    cadastro.criar(atividade1);

    expect(cadastro.getAtividades().length).toBe(1);
  })

})
