// src/app/services/environment.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public get googleMapsApiKey(): string {
    return environment.googleMapConfig.googleMapsApiKey;
  }
}
