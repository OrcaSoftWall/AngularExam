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
  menuOpen = false;
  constructor(public authService: AuthService, public userService: UserService) { 
    this.userName$ = this.authService.getCurrentUserName();
    this.isAdministrator$ = this.authService.isAdministrator();
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  // You could also directly use userService in your template! (since it's public)
}



