import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicoSeccionMentalPage } from './medico-seccion-mental.page';

describe('MedicoSeccionMentalPage', () => {
  let component: MedicoSeccionMentalPage;
  let fixture: ComponentFixture<MedicoSeccionMentalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoSeccionMentalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoSeccionMentalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
