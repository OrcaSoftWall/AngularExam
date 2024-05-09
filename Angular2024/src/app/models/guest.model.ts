// src/app/models/guest.model.ts

export interface Guest {
    id?: string;
    name: string;
    email: string;
    attending: boolean; // Whether the guest has confirmed attendance
    group: number; // Optional, indicates if the guest can bring a plus one
    accomodation: string;
    role: string;
    finalPhotoURL?: string;
  }
  