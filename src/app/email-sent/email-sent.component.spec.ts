import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentComponent } from './email-sent.component';

describe('ConfirmationEmailSentComponent', () => {
  let component: EmailSentComponent;
  let fixture: ComponentFixture<EmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
