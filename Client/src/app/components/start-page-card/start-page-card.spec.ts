import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageCard } from './start-page-card';

describe('StartPageCard', () => {
  let component: StartPageCard;
  let fixture: ComponentFixture<StartPageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPageCard],
    }).compileComponents();

    fixture = TestBed.createComponent(StartPageCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
