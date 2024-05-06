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
  selectedFile?: File;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // this.registerForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   name: ['', Validators.required],
    //   attending: [false], 
    //   group: [0], 
    //   accomodation: [''],
    //   role:['guest'], 
    // });
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      attending: [false], 
      group: [0], 
      accomodation: [''],
      role: ['guest'],
      photoURL: [''] // Optional field for direct URL input
    });
    
  }
  
  

onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files as FileList;
  if (files.length > 0) {
    this.selectedFile = files[0];
  }
}

onRegister() {
  if (this.registerForm.valid) {
    const { email, password, name, attending, group, accomodation, role, photoURL } = this.registerForm.value;
    this.authService.register(email, password, name, attending, group, accomodation, role, photoURL, this.selectedFile)
      .then(() => {
        console.log('Registration successful');
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        console.error('Registration failed', error);
      });
  } else {
    console.error('Form is not valid');
    // Optionally show form validation error message to user
  }
}


  // No need to pass arguments since you're accessing this.registerForm.value directly
// onRegister() {
//   if (this.registerForm.valid) {
//     const { email, password, name, attending, group, accomodation, role } = this.registerForm.value;
//     this.authService.register(email, password, name, attending, group, accomodation, role)
//       .then(() => {
//         console.log('Registration successful');
//         this.router.navigate(['/dashboard']);
//       }).catch(error => {
//         console.error('Registration failed', error);
//       });
//   }
// }

}

