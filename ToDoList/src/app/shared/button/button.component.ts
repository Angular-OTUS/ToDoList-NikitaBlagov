import { Component, Input } from '@angular/core';
import {SharedModule} from "../shared.module";

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() green: boolean = false;

}
