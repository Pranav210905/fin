export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  joinedAt: string;
  followers: string[];
  following: string[];
  badges: string[];
}

export interface Post {
  id: string;
  userId: string;
  text: string;
  type: 'regular' | 'milestone' | 'goal';
  goalProgress?: number;
  hashtags: string[];
  likes: string[];
  comments: string[];
  reposts: string[];
  bookmarks: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  text: string;
  likes: string[];
  createdAt: string;
}

export type Theme = 'light' | 'dark';