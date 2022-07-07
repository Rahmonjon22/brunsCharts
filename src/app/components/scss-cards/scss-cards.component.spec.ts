import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScssCardsComponent } from './scss-cards.component';

describe('ScssCardsComponent', () => {
  let component: ScssCardsComponent;
  let fixture: ComponentFixture<ScssCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScssCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScssCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
