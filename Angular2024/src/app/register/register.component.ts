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
      name: ['', Validators.required],
      attending: [false], 
      group: [0], 
      accomodation: [''],
      role:['guest'], 
    });
    
  }

  // No need to pass arguments since you're accessing this.registerForm.value directly
onRegister() {
  if (this.registerForm.valid) {
    const { email, password, name, attending, group, accomodation, role } = this.registerForm.value;
    this.authService.register(email, password, name, attending, group, accomodation, role)
      .then(() => {
        console.log('Registration successful');
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        console.error('Registration failed', error);
      });
  }
}

}

