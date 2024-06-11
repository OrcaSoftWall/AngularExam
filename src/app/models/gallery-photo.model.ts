export interface GalleryPhoto {
    id?: string;
    title: string;
    description: string;
    photoURL: string;
    likes?: number;
    likedBy?: string[];
    liked?: boolean;
    comments?: {
authorName: any; authorId: string; text: string; timestamp: any 
}[];
    timestamp?: any;
  }
  