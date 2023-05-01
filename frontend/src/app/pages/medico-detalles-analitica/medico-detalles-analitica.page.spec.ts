import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicoDetallesAnaliticaPage } from './medico-detalles-analitica.page';

describe('MedicoDetallesAnaliticaPage', () => {
  let component: MedicoDetallesAnaliticaPage;
  let fixture: ComponentFixture<MedicoDetallesAnaliticaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoDetallesAnaliticaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoDetallesAnaliticaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
