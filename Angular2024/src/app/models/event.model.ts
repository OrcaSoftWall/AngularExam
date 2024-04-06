// src/app/models/event.model.ts

import { Time } from "@angular/common";

export interface Event {
    id?: string; // Optional because it's usually set by the database
    title: string;
    date?: Date; // Using JavaScript Date object for date handling
    time?: Time; // Using JavaScript Date object for date handling
    location?: string;
    locationGps?: string;
    description?: string;
    photoURL?:string;
  }
  