import firebase from 'firebase/compat/app';

export interface Comment {
    id?: string;
    text: string;
    authorId: string;
    authorName: string;
    timestamp: firebase.firestore.Timestamp | Date;
  }
  