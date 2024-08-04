// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { GalleryService } from '../services/gallery.service';
// import { finalize } from 'rxjs/operators';

// @Component({
//   selector: 'app-gallery-upload',
//   templateUrl: './gallery-upload.component.html',
//   styleUrls: ['./gallery-upload.component.css']
// })
// export class GalleryUploadComponent {
//   uploadForm: FormGroup;
//   selectedFile: File | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private storage: AngularFireStorage,
//     private galleryService: GalleryService
//   ) {
//     this.uploadForm = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       photoURL: ['']
//     });
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];
//     }
//   }

//   onSubmit(): void {
//     if (this.uploadForm.valid && this.selectedFile) {
//       const filePath = `gallery_photos/${Date.now()}_${this.selectedFile.name}`;
//       const fileRef = this.storage.ref(filePath);
//       const uploadTask = this.storage.upload(filePath, this.selectedFile);

//       uploadTask.snapshotChanges().pipe(
//         finalize(() => {
//           fileRef.getDownloadURL().subscribe(downloadURL => {
//             const formValue = this.uploadForm.value;
//             const photoData = {
//               ...formValue,
//               photoURL: downloadURL,
//               timestamp: new Date()
//             };
//             this.galleryService.addPhoto(photoData).then(() => {
//               console.log('Photo uploaded successfully');
//               this.uploadForm.reset();
//               this.selectedFile = null;
//             });
//           });
//         })
//       ).subscribe();
//     }
//   }
// }





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { GalleryService } from '../services/gallery.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.css']
})
export class GalleryUploadComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFile: File | null = null; // Allow null as a possible value
  isAdmin: boolean = false;
  currentUserId: string | null = null;
  currentUserName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private galleryService: GalleryService,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photoURL: ['']
    });
  }

  ngOnInit(): void {
    this.authService.isAdministrator().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.authService.getCurrentUserId().subscribe((userId) => {
      this.currentUserId = userId;
    });
    this.authService.getCurrentUserName().subscribe((name) => {
      this.currentUserName = name;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      const filePath = `gallery_photos/${Date.now()}_${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFile);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            const formValue = this.uploadForm.value;
            const photoData = {
              ...formValue,
              authorId: this.currentUserId,
              authorName: this.currentUserName,
              photoURL: downloadURL,
              timestamp: new Date()
            };
            this.galleryService.addPhoto(photoData).then(() => {
              console.log('Photo uploaded successfully');
              this.uploadForm.reset();
              this.selectedFile = null; // Reset selectedFile to null
              this.router.navigate(['/gallery-display']); // Redirect to gallery
            }).catch(error => {
              console.error('Error uploading photo:', error);
            });
          });
        })
      ).subscribe();
    }
  }
}
