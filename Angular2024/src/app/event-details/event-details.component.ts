import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import { Comment } from '../models/comment.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, defer } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})

export class EventDetailsComponent implements OnInit {
  event?: Event;
  eventId: string | null = null;
  commentText = '';
  currentUserId: string | null = null;
  comments: Comment[] = [];
  currentUserName: string | null = null;
  editingCommentId: string | null = null;
  updatedCommentText: string = '';
  isAdmin: boolean = false;
  // isAdmin$: Observable<boolean> = defer(() => this.authService.isAdministrator());

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.isAdmin$ = this.authService.isAdministrator();
    this.authService.getCurrentUserId().subscribe((userId) => {
      this.currentUserId = userId;
    });
    this.authService.getCurrentUserName().subscribe((name) => {
      this.currentUserName = name;
    });
    this.eventId = this.route.snapshot.paramMap.get('id'); // Retrieve the event ID from the route
    this.authService.isAdministrator().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      console.log("ISADMIN",this.isAdmin)
    });
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe((event) => {
        this.event = event; // Assign the fetched event to your component property
      });
      this.eventService.getComments(this.eventId).subscribe((comments) => {
        this.comments = comments.map((comment) => ({
          ...comment,
          // Ensure the conversion method updates the type or is recognized as always returning a Date
          timestamp: this.eventService.convertTimestampToDate(
            comment.timestamp
          ) as Date,
        }));
      });
    }
  }

  navigateToEditEvent(eventId: string | undefined): void {
    if (!eventId) {
      console.error('Event ID is undefined, cannot navigate to edit');
      return;
    }
    this.router.navigate(['/edit-event', eventId]);
  }

  deleteEvent(eventId: string | undefined): void {
    if (!eventId) {
      console.error('Event ID is undefined, cannot delete');
      return;
    }
    // Proceed with deletion logic if eventId is not undefined
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService
        .deleteEvent(eventId)
        .then(() => {
          console.log('Event successfully deleted');
          this.router.navigate(['dashboard']);
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    }
  }

  submitComment(): void {
    console.log('Attempting to submit comment:', this.commentText);
    console.log('Current User ID:', this.currentUserId);
    console.log('Current User Name:', this.currentUserName);
    if (
      this.eventId &&
      this.commentText.trim() &&
      this.currentUserId &&
      this.currentUserName
    ) {
      const comment: Comment = {
        text: this.commentText.trim(),
        authorId: this.currentUserId,
        authorName: this.currentUserName,
        timestamp: new Date(),
      };

      this.eventService
        .addComment(this.eventId, comment)
        .then(() => {
          this.commentText = '';
        })
        .catch((error) => {
          console.error('Error adding comment: ', error);
        });
    }
  }

  editComment(commentId: string | undefined, currentText: string) {
    if (!commentId) {
      console.error('Comment ID is undefined');
      return;
    }
    this.editingCommentId = commentId;
    this.updatedCommentText = currentText;
  }

  updateComment(commentId: string) {
    if (
      this.eventId &&
      commentId &&
      this.updatedCommentText.trim().length > 0
    ) {
      this.eventService
        .updateCommentText(this.eventId, commentId, this.updatedCommentText)
        .then(() => {
          console.log('Comment updated successfully');
          this.editingCommentId = null;
          this.updatedCommentText = '';
        })
        .catch((error) => {
          console.error('Error updating comment:', error);
        });
    } else {
      console.error('Missing eventId, commentId, or new comment text');
    }
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.updatedCommentText = '';
  }

  deleteComment(commentId: string | undefined) {
    if (!this.eventId) {
      console.error('Event ID is undefined');
      return;
    }
    if (confirm('Are you sure you want to delete this comment?')) {
      this.eventService
        .deleteComment(this.eventId, commentId!)
        .then(() => {
          this.comments = this.comments.filter(
            (comment) => comment.id !== commentId
          );
        })
        .catch((error) => {
          console.error('Error deleting comment: ', error);
        });
    }
  }
}
