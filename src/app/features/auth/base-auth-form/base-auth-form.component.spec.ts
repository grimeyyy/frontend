import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthFormComponent } from './base-auth-form.component';

describe('FormContainerComponent', () => {
  let component: BaseAuthFormComponent;
  let fixture: ComponentFixture<BaseAuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseAuthFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
