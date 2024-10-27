import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceRowComponent } from './place-row.component';

describe('FilterItemsComponent', () => {
  let component: PlaceRowComponent;
  let fixture: ComponentFixture<PlaceRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceRowComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
