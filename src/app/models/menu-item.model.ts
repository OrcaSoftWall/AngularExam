export interface MenuItem {
    id?: string; // Optional for new items
    title: string;
    image?: string; // URL or path to the image in storage
    type: 'vegetarian' | 'vegan' | 'sea food' | string; // Predefined types or more
    ingredients?: string; // Optional
    order: number; // For sorting
    likes?: number; // Optional, default to 0
  }
  