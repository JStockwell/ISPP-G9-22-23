import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { AñadirDetallesAnaliticasPage } from './añadir-detalles-analiticas.page';

describe('AñadirDetallesAnaliticasPage', () => {
  let component: AñadirDetallesAnaliticasPage;
  let fixture: ComponentFixture<AñadirDetallesAnaliticasPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AñadirDetallesAnaliticasPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AñadirDetallesAnaliticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
