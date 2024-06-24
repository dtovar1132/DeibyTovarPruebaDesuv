import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageValidatorComponent } from './message-validator.component';

describe('MessageValidatorComponent', () => {
  let component: MessageValidatorComponent;
  let fixture: ComponentFixture<MessageValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
