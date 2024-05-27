import { Component, OnInit } from '@angular/core';
import { GuestService } from '../services/guest.service';
import { Guest } from '../models/guest.model';

@Component({
  selector: 'app-bride-groom-intro',
  templateUrl: './bride-groom-intro.component.html',
  styleUrls: ['./bride-groom-intro.component.css']
})
export class BrideGroomIntroComponent implements OnInit {
  bride?: Guest;
  groom?: Guest;

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    this.guestService.getGuests().subscribe(guests => {
      this.bride = guests.find(guest => guest.role === 'bride');
      this.groom = guests.find(guest => guest.role === 'groom');
    });
  }
}
