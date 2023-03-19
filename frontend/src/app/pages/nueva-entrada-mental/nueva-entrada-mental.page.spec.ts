import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaEntradaMentalPage } from './nueva-entrada-mental.page';

describe('NuevaEntradaMentalPage', () => {
  let component: NuevaEntradaMentalPage;
  let fixture: ComponentFixture<NuevaEntradaMentalPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NuevaEntradaMentalPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaEntradaMentalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
