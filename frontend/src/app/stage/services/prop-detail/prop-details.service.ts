import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PropDetails } from '../../models/prop-details.interface';

@Injectable({
  providedIn: 'root'
})
export class PropDetailsService {
  propDetails$: Subject<PropDetails> = new Subject<PropDetails>();

  propClicked(propDetails: PropDetails): void {
    this.propDetails$.next(propDetails);
  }
}
