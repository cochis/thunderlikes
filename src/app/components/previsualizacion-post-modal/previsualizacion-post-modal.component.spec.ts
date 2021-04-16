import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrevisualizacionPostModalComponent } from './previsualizacion-post-modal.component';

describe('PrevisualizacionPostModalComponent', () => {
  let component: PrevisualizacionPostModalComponent;
  let fixture: ComponentFixture<PrevisualizacionPostModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisualizacionPostModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrevisualizacionPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
