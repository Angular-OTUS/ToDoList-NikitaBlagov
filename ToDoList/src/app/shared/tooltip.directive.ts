import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  Component,
  ComponentRef,
  ApplicationRef,
  ComponentFactoryResolver, Injector, EmbeddedViewRef,

} from '@angular/core';
import {TooltipComponent} from "../components/tooltip/tooltip.component";

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input() tooltip: string = '';

   private componentRef: ComponentRef<TooltipComponent> | null = null;
  constructor(
    private elementRef: ElementRef,
    private  appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {

  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.setTooltipComponentProperties();
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
      const {left, right, bottom} =
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = bottom;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
