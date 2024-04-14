import { Time } from "@angular/common";

// export interface Event {
//     id?: string; 
//     title: string;
//     date?: Date; 
//     time?: Time; 
//     location?: string;
//     locationGps?: string;
//     description?: string;
//     photoURL?:string;
//   }
  
export interface Event {
  id?: string;
  title: string;
  date?: Date;
  time?: string; 
  location?: string;
  locationGps: string;
  description?: string;
  photoURL?: string;
}

