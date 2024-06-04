// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { HeaderService } from '../services/header.service';
// import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit, OnDestroy {
//   isShrunk: boolean = false;
//   private routerSubscription!: Subscription;

//   constructor(private headerService: HeaderService, private router: Router) {}

//   ngOnInit(): void {
//     // Determine the initial state based on the current URL before any navigation events
//     this.determineHeaderState(this.router.url);

//     this.routerSubscription = this.router.events.pipe(
//       filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
//     ).subscribe((event: NavigationEnd) => {
//       this.determineHeaderState(event.urlAfterRedirects);
//     });

//     this.headerService.shrunk.subscribe(shrunk => {
//       this.isShrunk = shrunk;
//     });
//   }

//   ngOnDestroy(): void {
//     this.routerSubscription.unsubscribe();
//   }

//   private determineHeaderState(url: string): void {
//     const isHome = url === '/';
//     if (isHome) {
//       // Start full size and schedule a shrink
//       this.headerService.setShrunk(false);
//       setTimeout(() => this.headerService.setShrunk(true), 2000);
//     } else {
//       // Immediately set to shrunk for non-home pages
//       this.headerService.setShrunk(true);
//     }
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { Router, NavigationEnd, Event as RouterEvent, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isShrunk: boolean = false;
  private routerSubscription!: Subscription;  // Use '!' to assure TypeScript it's handled correctly

  constructor(private headerService: HeaderService, private router: Router) {}

  // ngOnInit(): void {
  //   this.routerSubscription = this.router.events.pipe(
  //     filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
  //     // Adjust header based on whether the route is the home page
  //     const isHome = event.urlAfterRedirects === '/';
  //     console.log("isHome:  ", isHome)
  //     this.headerService.setShrunk(!isHome);

  //     // Delay shrinking if it's the home page
  //     if (isHome) {
  //       setTimeout(() => this.headerService.setShrunk(true), 2000);
  //       console.log("setTimeOut is Activated")
  //     }
  //   });

  //   this.headerService.shrunk.subscribe(shrunk => {
  //     this.isShrunk = shrunk;
  //     console.log("this.isShrunk:  ", this.isShrunk)
  //   });
  // }

  ngOnInit(): void {
    // Manually check the initial route
  const initialUrl = this.router.url;
  const isHomeInitial = initialUrl === '/';
  console.log("Initial URL: ", initialUrl);
  this.headerService.setShrunk(!isHomeInitial);
  if (isHomeInitial) {
    setTimeout(() => {
      this.headerService.setShrunk(true);
      console.log("Initial setTimeOut is Activated");
    }, 2000);
  }

  // Subscribe to router events
  this.routerSubscription = this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      console.log("NavigationStart:", event.url);
    } else if (event instanceof NavigationEnd) {
      console.log("NavigationEnd:", event.urlAfterRedirects);
    } else if (event instanceof NavigationCancel) {
      console.log("NavigationCancel:", event.url);
    } else if (event instanceof NavigationError) {
      console.log("NavigationError:", event.error);
    }
  });

    this.routerSubscription.add(
      this.router.events.pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        // Adjust header based on whether the route is the home page
        const isHome = event.urlAfterRedirects === '/';
        console.log("isHome:  ", isHome)
        this.headerService.setShrunk(!isHome);

        // Delay shrinking if it's the home page
        if (isHome) {
          setTimeout(() => this.headerService.setShrunk(true), 2000);
          console.log("setTimeOut is Activated")
        }
      })
    );

    this.headerService.shrunk.subscribe(shrunk => {
      this.isShrunk = shrunk;
      console.log("this.isShrunk:  ", this.isShrunk)
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();  // Proper cleanup to avoid memory leaks
  }
}




// import { Component, OnInit } from '@angular/core';
// import { HeaderService } from '../services/header.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
//   isShrunk: boolean = false;

//   constructor(private headerService: HeaderService) {}

//   ngOnInit(): void {
//     this.headerService.shrunk.subscribe(shrunk => {
//       this.isShrunk = shrunk;
//     });

//     // Auto-shrink after 5 seconds if on the home page
//     if (this.isOnHomePage()) {
//       setTimeout(() => {
//         this.headerService.setShrunk(true);
//       }, 2000);
//     }
//   }

//   private isOnHomePage(): boolean {
//     return window.location.pathname === '/';
//   }
// }
