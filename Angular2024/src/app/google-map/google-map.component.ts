import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class MapComponent {
  center: google.maps.LatLngLiteral = {lat: 48.14320364797574, lng: 17.103031866793362}; //Bratislava
  zoom = 12;

  constructor() { }
}
