// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { GuestBookEntry } from '../models/guest-book-entry.model';
// import { GuestBookService } from '../services/guest-book.service';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-guest-book',
//   templateUrl: './guest-book.component.html',
//   styleUrls: ['./guest-book.component.css']
// })
// export class GuestBookComponent implements OnInit {
//   guestBookForm: FormGroup;
//   guestBookEntries$: Observable<GuestBookEntry[]> = of([]);
//   currentUserId: string | null = null;
//   // currentUserName: string | null = null;
//   editingEntryId: string | null = null;
//   editingEntryMessage: string = '';
//   entryText: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private guestBookService: GuestBookService,
//     private authService: AuthService
//   ) {
//     this.guestBookForm = this.fb.group({
//       message: ['', Validators.required]
//     });
//   }

//   // ngOnInit(): void {
//   //   this.guestBookEntries$ = this.guestBookService.getEntries();
//   //   this.authService.getCurrentUserId().subscribe(userId => {
//   //     this.currentUserId = userId;
//   //   });
//   // }
//   ngOnInit(): void {
//     this.guestBookEntries$ = this.guestBookService.getEntries();
//     this.authService.getCurrentUserId().subscribe(userId => {
//       this.currentUserId = userId;
//     });
//     // this.authService.getCurrentUserName().subscribe(name => {
//     //   this.currentUserName = name;
//     // });
//   }

//   onSubmit(): void {
//     if (this.guestBookForm.valid && this.currentUserId) {
//       const newEntry: GuestBookEntry = {
//         message: this.guestBookForm.value.message,
//         authorId: this.currentUserId,
//         authorName: "Anonimus", 
//         timestamp: new Date()
//       };
//       this.guestBookService.addEntry(newEntry).then(() => {
//         this.guestBookForm.reset();
//       });
//     }
//   }

//   // editEntry(entry: GuestBookEntry): void {
//   //   this.editingEntryId = entry.id;
//   //   this.editingEntryMessage = entry.message;
//   // }

//   updateEntry(entryId: string): void {
//     if (this.editingEntryMessage.trim()) {
//       this.guestBookService.updateEntry(entryId, this.editingEntryMessage).then(() => {
//         this.editingEntryId = null;
//         this.editingEntryMessage = '';
//       });
//     }
//   }

//   // deleteEntry(entryId: string): void {
//   //   this.guestBookService.deleteEntry(entryId).then(() => {
//   //     console.log('Entry deleted');
//   //   });
//   // }

//   editEntry(entry: GuestBookEntry): void {
//     if (entry.id) {
//       this.editingEntryId = entry.id;
//       this.entryText = entry.message;
//     }
//   }
  
//   deleteEntry(id: string): void {
//     this.guestBookService.deleteEntry(id).then(() => {
//       console.log('Entry deleted successfully');
//     }).catch(error => {
//       console.error('Error deleting entry:', error);
//     });
//   }
  

//   cancelEdit(): void {
//     this.editingEntryId = null;
//     this.editingEntryMessage = '';
//   }

//   // canEdit(entry: GuestBookEntry): boolean {
//   //   return entry.authorId === this.currentUserId || this.authService.isAdministrator();
//   // }
//   canEdit(entry: GuestBookEntry): boolean {
//     let isAdmin = false;
//     this.authService.isAdministrator().subscribe(isAdminValue => {
//       isAdmin = isAdminValue;
//     });
//     return entry.authorId === this.currentUserId || isAdmin;
//   }
  
// }






// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { GuestBookEntry } from '../models/guest-book-entry.model';
// import { GuestBookService } from '../services/guest-book.service';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-guest-book',
//   templateUrl: './guest-book.component.html',
//   styleUrls: ['./guest-book.component.css']
// })
// export class GuestBookComponent implements OnInit {
//   guestBookEntries$: Observable<GuestBookEntry[]> = of([]);
//   currentUserId: string | null = null;
//   currentUserName: string | null = null;
//   editingEntryId: string | null = null;
//   entryForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private guestBookService: GuestBookService,
//     private authService: AuthService
//   ) {
//     this.entryForm = this.fb.group({
//       text: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.guestBookEntries$ = this.guestBookService.getGuestBookEntries();
//     this.authService.getCurrentUserId().subscribe(userId => {
//       this.currentUserId = userId;
//     });
//     this.authService.getCurrentUserName().subscribe(userName => {
//       this.currentUserName = userName;
//     });
//   }

//   onSubmit(): void {
//     if (this.entryForm.valid) {
//       const entryText = this.entryForm.value.text;
//       if (this.editingEntryId) {
//         this.guestBookService.updateGuestBookEntry(this.editingEntryId, entryText).then(() => {
//           this.editingEntryId = null;
//           this.entryForm.reset();
//         });
//       } else {
//         const newEntry: GuestBookEntry = {
//           text: entryText,
//           authorId: this.currentUserId!,
//           authorName: this.currentUserName!,
//           timestamp: new Date()
//         };
//         this.guestBookService.createGuestBookEntry(newEntry).then(() => {
//           this.entryForm.reset();
//         });
//       }
//     }
//   }

//   editEntry(entry: GuestBookEntry): void {
//     if (entry.id) {
//       this.editingEntryId = entry.id;
//       this.entryForm.setValue({ text: entry.text });
//     }
//   }

//   deleteEntry(id: string): void {
//     this.guestBookService.deleteGuestBookEntry(id).then(() => {
//       console.log('Entry deleted successfully');
//     }).catch(error => {
//       console.error('Error deleting entry:', error);
//     });
//   }

//   canEdit(entry: GuestBookEntry): boolean {
//     let isAdmin = false;
//     this.authService.isAdministrator().subscribe(isAdminValue => {
//       isAdmin = isAdminValue;
//     });
//     return entry.authorId === this.currentUserId || isAdmin;
//   }
// }






import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, combineLatest } from 'rxjs';
import { GuestBookEntry } from '../models/guest-book-entry.model';
import { GuestBookService } from '../services/guest-book.service';
import { AuthService } from '../auth.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  styleUrls: ['./guest-book.component.css']
})
export class GuestBookComponent implements OnInit {
  guestBookEntries$: Observable<GuestBookEntry[]> = of([]);
  currentUserId: string | null = null;
  currentUserName: string | null = null;
  editingEntryId: string | null = null;
  isAdmin: boolean = false;
  entryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private guestBookService: GuestBookService,
    private authService: AuthService
  ) {
    this.entryForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.guestBookEntries$ = this.guestBookService.getGuestBookEntries();
    this.authService.getCurrentUserId().subscribe(userId => {
      this.currentUserId = userId;
    });
    this.authService.getCurrentUserName().subscribe(userName => {
      this.currentUserName = userName;
    });
    this.authService.isAdministrator().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  onSubmit(): void {
    if (this.entryForm.valid) {
      const entryText = this.entryForm.value.text;
      if (this.editingEntryId) {
        this.guestBookService.updateGuestBookEntry(this.editingEntryId, entryText).then(() => {
          this.editingEntryId = null;
          this.entryForm.reset();
        });
      } else {
        const newEntry: GuestBookEntry = {
          text: entryText,
          authorId: this.currentUserId!,
          authorName: this.currentUserName!,
          timestamp: new Date()
        };
        this.guestBookService.createGuestBookEntry(newEntry).then(() => {
          this.entryForm.reset();
        });
      }
    }
  }

  editEntry(entry: GuestBookEntry): void {
    if (entry.id) {
      this.editingEntryId = entry.id;
      this.entryForm.setValue({ text: entry.text });
    }
  }

  deleteEntry(id: string): void {
    this.guestBookService.deleteGuestBookEntry(id).then(() => {
      console.log('Entry deleted successfully');
    }).catch(error => {
      console.error('Error deleting entry:', error);
    });
  }

  canEdit(entry: GuestBookEntry): boolean {
    return entry.authorId === this.currentUserId || this.isAdmin;
  }
}
