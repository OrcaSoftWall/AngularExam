import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import { Comment } from '../models/comment.model';
import { AuthService } from '../auth.service';

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

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService
  ) {
    // // Subscribe to the currentUserId$ observable to get the current user's ID
    // this.authService.currentUserId$.subscribe((id) => {
    //   this.currentUserId = id;
    // });
  }

  ngOnInit(): void {
    this.authService.getCurrentUserName().subscribe((userName) => {
      this.currentUserName = userName;
    });
    this.eventId = this.route.snapshot.paramMap.get('id'); // Retrieve the event ID from the route
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe((event) => {
        this.event = event; // Assign the fetched event to your component property
      });
      // Fetch comments for the event
      this.eventService.getComments(this.eventId).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }

  submitComment(): void {
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
          // Optionally, refresh comments...
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

  // In event-details.component.ts

deleteComment(commentId: string | undefined) {
  if (!this.eventId) {
    console.error('Event ID is undefined');
    return;
  }
  if (confirm('Are you sure you want to delete this comment?')) {
    this.eventService.deleteComment(this.eventId, commentId!)
      .then(() => {
        // Handle successful deletion
        // Optionally, refresh the list of comments to reflect the deletion
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      })
      .catch(error => {
        console.error('Error deleting comment: ', error);
      });
  }
}

}
