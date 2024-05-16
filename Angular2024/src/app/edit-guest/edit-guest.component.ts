// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { GuestService } from '../services/guest.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-guest',
//   templateUrl: './edit-guest.component.html',
//   styleUrls: ['./edit-guest.component.css']
// })
// export class EditGuestComponent implements OnInit {
//   editForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private guestService: GuestService,
//     private router: Router
//   ) {
//     this.editForm = this.fb.group({
//       name: ['', Validators.required],
//       attending: [''],
//       group: [''],
//       accomodation: [''],
//       country: [''],
//       city: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.authService.getCurrentUserId().subscribe(uid => {
//       if (uid) {
//         this.guestService.getGuestById(uid).subscribe(guest => {
//           if (guest) {
//             this.editForm.patchValue(guest);
//           }else {
//             // Handle the case where guest details are not found
//             console.error('No guest data available');
//             // Optionally redirect or disable form
//           }
//         });
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.editForm.valid) {
//       this.authService.getCurrentUserId().subscribe(uid => {
//         if (uid) {
//           this.guestService.updateGuest(uid, this.editForm.value).then(() => {
//             console.log('Profile updated successfully');
//             this.router.navigate(['/dashboard']); // Navigate to dashboard or some other page
//           }).catch(error => {
//             console.error('Error updating profile:', error);
//           });
//         }
//       });
//     }
//   }
// }






import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestService } from '../services/guest.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-guest',
  templateUrl: './edit-guest.component.html',
  styleUrls: ['./edit-guest.component.css']
})
export class EditGuestComponent implements OnInit {
  editForm: FormGroup;
  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private guestService: GuestService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage, // Inject Firebase Storage
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      attending: [false], 
      group: [0], 
      accomodation: [''],
      photoURL: [''], // Optional field for direct URL input
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(uid => {
      if (uid) {
        this.guestService.getGuestById(uid).subscribe(guest => {
          if (guest) {
            console.log("guest to be amended",guest)
            this.editForm.patchValue(guest);
          } else {
            console.error('No guest data available');
          }
        });
      }
    });
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const files = element.files as FileList;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.authService.getCurrentUserId().subscribe(uid => {
        if (uid) {
          if (this.selectedFile) {
            const filePath = `profile_photos/${uid}`;
            const fileRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, this.selectedFile);

            uploadTask.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(downloadURL => {
                  this.updateGuestData(uid, downloadURL);
                });
              })
            ).subscribe();
          } else {
            this.updateGuestData(uid, this.editForm.value.photoURL);
          }
        }
      });
    }
  }

  private updateGuestData(uid: string, photoURL: string): void {
    const updatedData = {
      ...this.editForm.value,
      finalPhotoURL: photoURL
    };

    this.guestService.updateGuest(uid, updatedData).then(() => {
      console.log('Profile updated successfully');
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      console.error('Error updating profile:', error);
    });
  }
}


