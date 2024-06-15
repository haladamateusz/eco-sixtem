import { ComponentRef, inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { PropDetailsComponent } from '../../components/prop-details/prop-details.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { PropDetails } from '../../models/prop-details.interface';
import { filter, first, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private readonly overlay: Overlay = inject(Overlay);

  private overlayRef: OverlayRef | null = null;

  private componentRef: ComponentRef<PropDetailsComponent> | null = null;

  create(propDetails: PropDetails, viewContainerRef: ViewContainerRef, injector: Injector): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.componentRef = null;
    }

    const config: OverlayConfig = this.getOverlayConfig(propDetails.x, propDetails.y);

    this.overlayRef = this.overlay.create(config);

    this.componentRef = this.overlayRef.attach(
      new ComponentPortal(PropDetailsComponent, viewContainerRef, injector)
    );

    this.componentRef.setInput('name', propDetails.ISIN_BC);

    setTimeout(() => {
      this.listenForClickOutside();
    });
  }

  private listenForClickOutside(): void {
    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event: MouseEvent): boolean => {
          const clickTarget = event.target as HTMLElement;
          if (this.overlayRef) {
            console.log(this.overlayRef.overlayElement.contains(clickTarget));
            return (
              clickTarget != this.overlayRef.overlayElement &&
              !!this.overlayRef &&
              !this.overlayRef.overlayElement.contains(clickTarget)
            );
          }
          return true;
        }),
        first()
      )
      .subscribe(() => {
        console.log('zzz');
        if (this.overlayRef) {
          this.overlayRef.dispose();
          this.overlayRef = null;
          this.componentRef = null;
        }
      });
  }

  private getOverlayConfig(x: number, y: number): OverlayConfig {
    const positions: ConnectionPositionPair[] = this.getPositions();

    return new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo({ x, y })
        .withPositions(positions),
      scrollStrategy: this.overlay.scrollStrategies.close()
    });
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top'
      }
    ];
  }
}
