import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 48.14320364797574, lng: 17.103031866793362 }; // Bratislava
  zoom = 12;

  constructor(private envService: EnvironmentService) {}

  ngOnInit() {
    this.loadGoogleMapsApi();
  }

  private loadGoogleMapsApi() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.envService.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}

