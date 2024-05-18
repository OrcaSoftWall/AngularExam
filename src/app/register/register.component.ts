import { Component, OnInit } from '@angular/core';
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
  cities: string[] = [];

  private cityOptions: { [key: string]: string[] } = {
    'Slovakia': ['Bratislava', 'Zilina', 'Other'],
    'Czech Republic': ['Praha', 'Brno', 'Other'],
    'Bulgaria': ['Sofia', 'Stara Zagora', 'Botevgrad', 'Other'],
    'Germany': ['Berlin', 'Nürnberg', 'Other'],
    'Malta': ['Valletta', 'Marsaxlokk', 'Other'],
    'UK': ['London', 'Southampton', 'Other'],
    'other': ['Other']
  };
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      attending: [false], 
      group: [0], 
      accomodation: [''],
      role: ['guest'],
      photoURL: [''], // Optional field for direct URL input
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.registerForm.get('country')!.valueChanges.subscribe(country => {
      this.cities = this.cityOptions[country] || [];
      this.registerForm.get('city')!.setValue(''); // Reset city when country changes
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
    const { email, password, name, attending, group, accomodation, role, photoURL, country, city  } = this.registerForm.value;
    this.authService.register(email, password, name, attending, group, accomodation, role, photoURL, this.selectedFile, country, city )
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
}

