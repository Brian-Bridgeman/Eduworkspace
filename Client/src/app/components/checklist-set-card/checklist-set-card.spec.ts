import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistSetCard } from './checklist-set-card';

describe('ChecklistSetCard', () => {
  let component: ChecklistSetCard;
  let fixture: ComponentFixture<ChecklistSetCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistSetCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ChecklistSetCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
