import { Component, OnInit } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GalleryService } from '../services/gallery.service';
import { AuthService } from '../auth.service';
import { GalleryPhoto } from '../models/gallery-photo.model';

@Component({
  selector: 'app-gallery-display',
  templateUrl: './gallery-display.component.html',
  styleUrls: ['./gallery-display.component.css']
})
export class GalleryDisplayComponent implements OnInit {
  photos$: Observable<GalleryPhoto[]> = of([]);
  currentUserId$: Observable<string | null>;

  constructor(
    private galleryService: GalleryService,
    private authService: AuthService
  ) {
    this.currentUserId$ = this.authService.getCurrentUserId();
  }

  // ngOnInit(): void {
  //   this.photos$ = combineLatest([
  //     this.galleryService.getPhotos(),
  //     this.authService.getCurrentUserId()
  //   ]).pipe(
  //     map(([photos, userId]) => {
  //       return photos.map(photo => ({
  //         ...photo,
  //         liked: photo.likedBy ? photo.likedBy.includes(userId || '') : false
  //       }));
  //     })
  //   );
  // }

  ngOnInit(): void {
    this.photos$ = combineLatest([
      this.galleryService.getPhotos(),
      this.authService.getCurrentUserId()
    ]).pipe(
      switchMap(([photos, userId]) => {
        console.log('Photos received:', photos);
        console.log('User ID received:', userId);

        const photoObservables = photos.map(photo => {
          console.log('Processing photo:', photo);

          if (photo.comments && photo.comments.length > 0) {
            const commentsObservables = photo.comments.map(comment =>
              this.authService.getUserById(comment.authorId).pipe(
                map(author => {
                  console.log('Author fetched:', author);
                  return {
                    ...comment,
                    authorName: author?.name || 'Unknown'
                  };
                })
              )
            );

            return combineLatest(commentsObservables).pipe(
              map(commentsWithAuthor => {
                console.log('Comments with author:', commentsWithAuthor);
                return {
                  ...photo,
                  comments: commentsWithAuthor,
                  liked: photo.likedBy ? photo.likedBy.includes(userId || '') : false
                };
              })
            );
          } else {
            return of({
              ...photo,
              comments: [],
              liked: photo.likedBy ? photo.likedBy.includes(userId || '') : false
            });
          }
        });

        return combineLatest(photoObservables);
      })
    );

    // Subscribe to photos$ to log the final output
    this.photos$.subscribe(finalPhotos => {
      console.log('Final photos with comments and likes:', finalPhotos);
    });
  }

  toggleLike(photoId: string | undefined): void {
    if (photoId) {
      this.galleryService.toggleLike(photoId).catch(error => console.error(error));
    }
  }

  // addComment(photoId: string | undefined, comment: string): void {
  //   if (photoId) {
  //     this.galleryService.addComment(photoId, comment).catch(error => console.error(error));
  //   }
  // }

  addComment(photoId: string, commentText: string): void {
    this.currentUserId$.subscribe(userId => {
      if (userId && commentText.trim()) {
        const comment = {
          authorId: userId,
          text: commentText.trim(),
          timestamp: new Date()
        };
        console.log(comment, "comment!")
        this.galleryService.addComment(photoId, comment).catch(error => console.error(error));
      }
    });
  }

}
