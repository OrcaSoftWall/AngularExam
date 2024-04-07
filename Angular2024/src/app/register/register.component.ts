import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required], // Add this
      attending: [false], // Default to false, add this
      group: [0], // Default to 0, add this
      accomodation: [''] // Add this
    });
    
  }

  // No need to pass arguments since you're accessing this.registerForm.value directly
onRegister() {
  if (this.registerForm.valid) {
    const { email, password, name, attending, group, accomodation } = this.registerForm.value;
    this.authService.register(email, password, name, attending, group, accomodation)
      .then(() => {
        console.log('Registration successful');
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        console.error('Registration failed', error);
      });
  }
}

}

