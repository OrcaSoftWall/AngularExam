import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-header',

  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        position: 'absolute',
        top: '-25vh',
        left: '-5%',
        height: '120vh',
        width: '105%'
      })),
      state('closed', style({
        height:'0vh'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],

  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
