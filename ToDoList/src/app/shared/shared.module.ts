import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TooltipDirective } from './tooltip.directive';
import { LoadingDirective } from './loading/loading.directive';



@NgModule({
  declarations: [
    ButtonComponent,
    TooltipDirective,
    LoadingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    TooltipDirective,
    LoadingDirective
  ]
})
export class SharedModule { }
