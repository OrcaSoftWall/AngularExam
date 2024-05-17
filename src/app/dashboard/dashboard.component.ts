import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: Event[] = [];
  center: google.maps.LatLngLiteral = { lat: 48.15, lng: 17.11 };
  zoom: number = 4;
  lastOpenInfoWindow: any = null; 

  constructor(
    private eventService: EventService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
      this.eventService.getEvents().subscribe(events => {
      this.events = this.sortEvents(events);
    });
  }

  parseGps(gpsString: string | undefined): google.maps.LatLngLiteral | null {
    if (!gpsString) return null;
    const parts = gpsString.split(',').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { lat: parts[0], lng: parts[1] };
    }
    return null;
  }

  parseTime(timeString: string | undefined): number {
    if (!timeString) return 0;
    const parts = timeString.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10); // Convert HH:mm to minutes since midnight
  }

  private sortEvents(events: Event[]): Event[] {
    return events.sort((a, b) => {
      const dateTimeA = this.combineDateAndTime(a.date, a.time);
      const dateTimeB = this.combineDateAndTime(b.date, b.time);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
  }

  private combineDateAndTime(date: Date | undefined, time: string | undefined): Date {
    const newDate = new Date(date ?? new Date());
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      newDate.setHours(hours, minutes, 0, 0);
    }
    return newDate;
  }

  openInfoWindow(marker: any, infoWindow: any) {
    if (this.lastOpenInfoWindow) {
      this.lastOpenInfoWindow.close();
    }
    this.lastOpenInfoWindow = infoWindow;
    infoWindow.open(marker);
  }
  
}
