import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageValidatorPipe } from 'app/shared/pipes/message-validator.pipe';

@Component({
  selector: 'app-message-validator',
  standalone: true,
  imports: [MessageValidatorPipe],
  templateUrl: './message-validator.component.html',
  styleUrl: './message-validator.component.scss'
})
export class MessageValidatorComponent {
  @Input() key: string = '';
  @Input() form!: FormGroup;
}
