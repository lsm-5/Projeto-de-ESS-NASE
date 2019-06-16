import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoEHistoricoClienteComponent } from './agendamento-ehistorico-cliente.component';

describe('AgendamentoEHistoricoClienteComponent', () => {
  let component: AgendamentoEHistoricoClienteComponent;
  let fixture: ComponentFixture<AgendamentoEHistoricoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamentoEHistoricoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoEHistoricoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
