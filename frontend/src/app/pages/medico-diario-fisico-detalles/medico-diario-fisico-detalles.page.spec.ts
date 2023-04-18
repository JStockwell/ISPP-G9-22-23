import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicoDiarioFisicoDetallesPage } from './medico-diario-fisico-detalles.page';

describe('MedicoDiarioFisicoDetallesPage', () => {
  let component: MedicoDiarioFisicoDetallesPage;
  let fixture: ComponentFixture<MedicoDiarioFisicoDetallesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoDiarioFisicoDetallesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoDiarioFisicoDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
