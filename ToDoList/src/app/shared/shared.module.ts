import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TooltipDirective } from './tooltip.directive';
import { LoadingDirective } from './loading/loading.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    ButtonComponent,
    TooltipDirective,
    LoadingDirective,
    ProgressSpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ButtonComponent,
    TooltipDirective,
    LoadingDirective,
    ProgressSpinnerComponent
  ]
})
export class SharedModule { }
