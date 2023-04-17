import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicoSeccionFisicaPage } from './medico-seccion-fisica.page';

describe('MedicoSeccionFisicaPage', () => {
  let component: MedicoSeccionFisicaPage;
  let fixture: ComponentFixture<MedicoSeccionFisicaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoSeccionFisicaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoSeccionFisicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
