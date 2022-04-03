import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailDialogComponent } from './question-detail-dialog.component';

describe('QuestionDetailDialogComponent', () => {
  let component: QuestionDetailDialogComponent;
  let fixture: ComponentFixture<QuestionDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
