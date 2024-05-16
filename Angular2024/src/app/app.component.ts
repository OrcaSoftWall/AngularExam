// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'Angular2024';
// }


import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderService } from './services/header.service';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private headerService: HeaderService, private envService: EnvironmentService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        // Now it's safe to use NavigationEnd specific properties like urlAfterRedirects
        if (event.url === '/') {
          this.headerService.setShrunk(false);
        } else {
          this.headerService.setShrunk(true);
        }
      }
    });
  }
  ngOnInit() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.envService.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}

