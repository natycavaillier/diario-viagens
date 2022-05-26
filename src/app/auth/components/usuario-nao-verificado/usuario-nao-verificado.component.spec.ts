import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNaoVerificadoComponent } from './usuario-nao-verificado.component';

describe('UsuarioNaoVerificadoComponent', () => {
  let component: UsuarioNaoVerificadoComponent;
  let fixture: ComponentFixture<UsuarioNaoVerificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioNaoVerificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioNaoVerificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
