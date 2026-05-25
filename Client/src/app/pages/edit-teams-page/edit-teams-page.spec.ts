import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamsPage } from './edit-teams-page';

describe('EditTeamsPage', () => {
  let component: EditTeamsPage;
  let fixture: ComponentFixture<EditTeamsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTeamsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTeamsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
