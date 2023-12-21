import { Directive, ElementRef, Input, Renderer2, OnInit, OnChanges, SimpleChanges, ViewContainerRef, ComponentRef } from '@angular/core';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';

type SpinnerItems = 'ProgressSpinnerComponent' | 'другой спиннер' | 'квадратный';

@Directive({
  selector: '[loading]',
})
export class LoadingDirective implements OnChanges {
  @Input('loading') public isLoading: boolean = false;

  private spinnerComponentRef: ComponentRef<ProgressSpinnerComponent> | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    ) {
    }

  ngOnChanges(changes: SimpleChanges) {
    this.toggleContentVisibility();
  }

  private toggleContentVisibility() {
    if (this.isLoading === true) {
      this.showSpinner();
      this.hideContent();
    } else {
      this.hideSpinner();
      this.showContent();
    }
  }

  private showSpinner(): void {
    this.spinnerComponentRef = this.viewContainerRef.createComponent(ProgressSpinnerComponent);
  }

  private hideSpinner(): void {
    if (this.spinnerComponentRef !== null) {
      this.spinnerComponentRef.destroy();
    }
  }

  private showContent(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'display')
  }

  private hideContent(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }


}
