import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent {
  eventForm: FormGroup;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: [''],
      location: ['', Validators.required],
      locationGps: [''],
      description: [''],
      photoURL: [''], // Optional
    });
  }

  ngOnInit(): void {
    // Retrieve the event ID from the route parameters if it exists
    this.activatedRoute.paramMap.subscribe((params) => {
      this.eventId = params.get('id');
      if (this.eventId) {
        // In edit mode - fetch the event details to populate the form
        this.loadEventForEdit(this.eventId);
      }
      // Else, in add mode - no action needed, form starts empty
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      if (this.eventId) {
        // Edit mode: Update the event
        this.eventService.updateEvent(this.eventId, this.eventForm.value).then(() => {
          console.log('Event updated successfully.');
          this.router.navigate(['/event-details', this.eventId]);
        }).catch(error => {
          console.error('Error updating event:', error);
        });
      } else {
        // Add mode: Create a new event
        this.eventService.addEvent(this.eventForm.value).then(docRef => {
          console.log('Event added successfully:', docRef.id);
          this.router.navigate(['/event-details', docRef.id]); // Navigate to the new event's details page
        }).catch(error => {
          console.error('Error adding event:', error);
        });
      }
    }
  }

  loadEventForEdit(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe(
      (event) => {
        if (event) {
          this.eventForm.patchValue(event);
        } else {
          // Event not found, redirect or handle accordingly
          console.error(`Event with ID ${eventId} not found.`);
          this.router.navigate(['/']); // Redirect to a default route or an error page
        }
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }
}
