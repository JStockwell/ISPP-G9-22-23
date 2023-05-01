import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicoDiarioMentalDetallesPage } from './medico-diario-mental-detalles.page';

describe('MedicoDiarioMentalDetallesPage', () => {
  let component: MedicoDiarioMentalDetallesPage;
  let fixture: ComponentFixture<MedicoDiarioMentalDetallesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoDiarioMentalDetallesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoDiarioMentalDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
