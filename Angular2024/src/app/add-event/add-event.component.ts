import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: [''],
      location: ['', Validators.required],
      locationGps: [''],
      description: [''],
      photoURL: [''] // Optional
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventService.addEvent(this.eventForm.value).then(() => {
        this.router.navigate(['/dashboard']); // Navigate to the events list or home page after adding
      }).catch(error => {
        console.error("Error adding event: ", error);
      });
    }
  }
}
