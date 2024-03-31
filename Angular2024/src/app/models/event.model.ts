// src/app/models/event.model.ts

export interface Event {
    id?: string; // Optional because it's usually set by the database
    title: string;
    dateTime?: Date; // Using JavaScript Date object for date handling
    location?: string;
    locationGps?: string;
    description?: string;
    photoURL?:string;
  }
  