import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-infographic',
  templateUrl: './infographic.component.html',
  styleUrls: ['./infographic.component.scss'],
  standalone: true
})
export class InfographicComponent {
  @Input() environmental = '';
  @Input() social = '';
  @Input() governance = '';
  @Input() revenue = '';

  getImg(value: string){
    if(parseInt(value) > 140){
      return 'assets/three_up.svg';
    }else if(parseInt(value) > 105){
      return 'assets/two_up.svg';
    }else if(parseInt(value) > 70){
      return 'assets/one_up.svg';
    }else if(parseInt(value) > 50){
      return 'assets/one_down.svg';
    }
    else if(parseInt(value) > 40){
      return 'assets/two_down.svg';
    }
    else {
      return 'assets/three_down.svg';
    }
  }


}
