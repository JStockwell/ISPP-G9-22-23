import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarMentalPage } from './modificar-mental.page';

describe('ModificarMentalPage', () => {
  let component: ModificarMentalPage;
  let fixture: ComponentFixture<ModificarMentalPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ModificarMentalPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarMentalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});