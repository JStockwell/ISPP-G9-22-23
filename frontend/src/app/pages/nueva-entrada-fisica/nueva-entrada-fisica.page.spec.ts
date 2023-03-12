import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaEntradaFisicaPage } from './nueva-entrada-fisica.page';

describe('NuevaEntradaFisicaPage', () => {
  let component: NuevaEntradaFisicaPage;
  let fixture: ComponentFixture<NuevaEntradaFisicaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaEntradaFisicaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaEntradaFisicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
