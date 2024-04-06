// In event-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service'; // Adjust this path as necessary
import { Event } from '../models/event.model'; // Adjust this path as necessary

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event?: Event; // Assuming you have an Event interface/model
  eventId: string | null = null; // Initialize eventId as null

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id'); // Retrieve the event ID from the route
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe(event => {
        this.event = event; // Assign the fetched event to your component property
      });
    }
  }
}


