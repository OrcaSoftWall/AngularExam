import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isShrunk: boolean = false;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.shrunk.subscribe(shrunk => {
      this.isShrunk = shrunk;
    });

    // Auto-shrink after 5 seconds if on the home page
    if (this.isOnHomePage()) {
      setTimeout(() => {
        this.headerService.setShrunk(true);
      }, 2000);
    }
  }

  private isOnHomePage(): boolean {
    return window.location.pathname === '/';
  }
}











// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {
//   onNavClick(): void {
//     // This could either shrink the header or scroll the page
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }
// }






// import { Component } from '@angular/core';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
//   // ...
// } from '@angular/animations';
// @Component({
//   selector: 'app-header',

//   animations: [
//     trigger('openClose', [
//       // ...
//       state('open', style({
//         position: 'absolute',
//         top: '-25vh',
//         left: '-5%',
//         height: '120vh',
//         width: '105%'
//       })),
//       state('closed', style({
//         height:'0vh'
//       })),
//       transition('open => closed', [
//         animate('1s')
//       ]),
//       transition('closed => open', [
//         animate('0.5s')
//       ]),
//     ]),
//   ],

//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {
//  isOpen = true;

//   toggle() {
//     this.isOpen = !this.isOpen;
//   }
// }





// import { Component, OnInit } from '@angular/core';
// // Import animations as before

// @Component({
//   // Selector, animations, template, and styles as before
// })
// export class HeaderComponent implements OnInit {
//   isOpen = true;

//   ngOnInit() {
//     setTimeout(() => {
//       this.isOpen = false;
//     }, 3000); // Automatically close after 3 seconds
//   }

//   toggle() {
//     this.isOpen = !this.isOpen;
//   }
// }
