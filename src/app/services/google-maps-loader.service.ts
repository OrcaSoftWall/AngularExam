// import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleMapsLoaderService {
//   private apiKey: string = environment.googleMapConfig.googleMapsApiKey;

//   constructor() { }

//   loadGoogleMaps(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       if (document.getElementById('google-maps-script')) {
//         resolve();
//         return;
//       }
//       const script = document.createElement('script');
//       script.id = 'google-maps-script';
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
//       script.async = true;
//       script.defer = true;
//       script.onload = () => resolve();
//       script.onerror = (error) => reject(error);
//       document.body.appendChild(script);
//     });
//   }
// }
