import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; 
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isAdministrator$: Observable<boolean>;
  userName$: Observable<string | null>;
  constructor(public authService: AuthService, public userService: UserService) { 
    this.userName$ = this.authService.getCurrentUserName();
    this.isAdministrator$ = this.authService.isAdministrator();
  }
  
  // You could also directly use userService in your template! (since it's public)
}




// import { Component, EventEmitter, Output } from '@angular/core';
// import { UserService } from '../services/user.service'; 
// import { AuthService } from '../auth.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-nav',
//   templateUrl: './nav.component.html',
//   styleUrls: ['./nav.component.css']
// })
// export class NavComponent {
//   @Output() navClicked = new EventEmitter<void>();
//   userName$: Observable<string | null>;

  
//   constructor(public authService: AuthService, public userService: UserService) { 
//     this.userName$ = this.authService.getCurrentUserName();
//     setTimeout(() => this.navClicked.emit(), 3000); // Auto emit after 3 seconds
//   }
  
//   onClick(): void {
//     this.navClicked.emit(); // Emit on nav item click
//   }
// }

