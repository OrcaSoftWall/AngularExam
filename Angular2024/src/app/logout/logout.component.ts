import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust the path as necessary


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout().then(() => {
      // Optionally, redirect to the home or login page here if not already handled in authService
    });
  }
}
