import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { last, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent implements OnInit {
  menuItemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private storage: AngularFireStorage,  // Include AngularFireStorage
    private router: Router
  ) {
    this.menuItemForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      ingredients: [''],
      orderOfServing: ['', Validators.required],
      image: [''],
      file: [null]  // For file uploads
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.menuItemForm.valid) {
      const formValue = this.menuItemForm.value;
      if (formValue.file) {
        // Handle file upload
        this.uploadFile(formValue.file).then((downloadURL) => {
          // After successful upload, remove the file from the form value and replace with downloadURL
          delete formValue.file; // Remove the file object from data to be saved
          formValue.image = downloadURL; // Use the file's download URL as the photoURL
          this.saveMenuItem(formValue);
        }).catch(error => {
          console.error('Failed to upload file:', error);
        });
      } else {
        // No file to upload, proceed to save the menu item
        this.saveMenuItem(formValue);
      }
    }
  }
  
  private uploadFile(file: File): Promise<string> {
    const filePath = `menu_photos/${Date.now()}_${file.name}`; // Unique path
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
  
    return uploadTask.snapshotChanges().pipe(
      last(),  // Ensure the observable emits only once the upload is complete
      switchMap(() => fileRef.getDownloadURL()),
      catchError(err => {
        console.error('Error during file upload:', err);
        throw new Error('Failed to upload file and get URL');
      })
    ).toPromise();
  }
  
  
  private saveMenuItem(menuItemData: any): void {
    this.menuService.addMenuItem(menuItemData).then(() => {
      console.log('Menu item added successfully');
      this.router.navigate(['/menu']); // Adjust as necessary
    }).catch(error => {
      console.error('Error adding menu item:', error);
    });
  }
  
  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (file) {
      this.menuItemForm.patchValue({ file: file });
    }
  }
}
