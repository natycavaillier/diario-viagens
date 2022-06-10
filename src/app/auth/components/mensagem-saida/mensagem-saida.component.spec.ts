import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemSaidaComponent } from './mensagem-saida.component';

describe('MensagemSaidaComponent', () => {
  let component: MensagemSaidaComponent;
  let fixture: ComponentFixture<MensagemSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensagemSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
