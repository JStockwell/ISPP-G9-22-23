import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarDetallesPage } from './modificar-detalles.page';

describe('ModificarDEtallesPage', () => {
  let component: ModificarDetallesPage;
  let fixture: ComponentFixture<ModificarDetallesPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ModificarDetallesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});