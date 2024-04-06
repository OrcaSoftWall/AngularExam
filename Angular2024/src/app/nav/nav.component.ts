// import { Component } from '@angular/core';


// @Component({
//   selector: 'app-nav',
//   templateUrl: './nav.component.html',
//   styleUrls: ['./nav.component.css']
// })
// export class NavComponent {

// }


import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; // Update the path as necessary

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public userService: UserService) { }

  // You could also directly use userService in your template since it's public
}