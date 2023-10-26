import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TooltipDirective } from './tooltip.directive';



@NgModule({
  declarations: [
    ButtonComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    TooltipDirective
  ]
})
export class SharedModule { }
