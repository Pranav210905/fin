import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, Comment, Theme } from '../types';
import { generateMockData } from '../utils/mockData';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  comments: Comment[];
  theme: Theme;
  setTheme: (theme: Theme) => void;
  login: (userId: string) => void;
  logout: () => void;
  createPost: (text: string, type: Post['type'], hashtags: string[], goalProgress?: number) => void;
  likePost: (postId: string) => void;
  commentPost: (postId: string, text: string) => void;
  repostPost: (postId: string) => void;
  bookmarkPost: (postId: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mockData, setMockData] = useState(() => generateMockData());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setCurrentUser({
            id: user.uid,
            ...userDoc.data() as Omit<User, 'id'>
          });
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const login = (userId: string) => {
    const user = mockData.users.find(u => u.id === userId) || null;
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const createPost = (text: string, type: Post['type'], hashtags: string[], goalProgress?: number) => {
    if (!currentUser) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      text,
      type,
      hashtags,
      goalProgress: type === 'goal' ? goalProgress || 0 : undefined,
      likes: [],
      comments: [],
      reposts: [],
      bookmarks: [],
      createdAt: new Date().toISOString(),
    };

    setMockData(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
  };

  const likePost = (postId: string) => {
    if (!currentUser) return;

    setMockData(prev => {
      const updatedPosts = prev.posts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likes.includes(currentUser.id);
          return {
            ...post,
            likes: hasLiked
              ? post.likes.filter(id => id !== currentUser.id)
              : [...post.likes, currentUser.id]
          };
        }
        return post;
      });

      return {
        ...prev,
        posts: updatedPosts
      };
    });
  };

  const commentPost = (postId: string, text: string) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      userId: currentUser.id,
      text,
      likes: [],
      createdAt: new Date().toISOString(),
    };

    setMockData(prev => {
      const updatedPosts = prev.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment.id]
          };
        }
        return post;
      });

      return {
        ...prev,
        posts: updatedPosts,
        comments: [...prev.comments, newComment]
      };
    });
  };

  const repostPost = (postId: string) => {
    if (!currentUser) return;

    setMockData(prev => {
      const updatedPosts = prev.posts.map(post => {
        if (post.id === postId) {
          const hasReposted = post.reposts.includes(currentUser.id);
          return {
            ...post,
            reposts: hasReposted
              ? post.reposts.filter(id => id !== currentUser.id)
              : [...post.reposts, currentUser.id]
          };
        }
        return post;
      });

      return {
        ...prev,
        posts: updatedPosts
      };
    });
  };

  const bookmarkPost = (postId: string) => {
    if (!currentUser) return;

    setMockData(prev => {
      const updatedPosts = prev.posts.map(post => {
        if (post.id === postId) {
          const hasBookmarked = post.bookmarks.includes(currentUser.id);
          return {
            ...post,
            bookmarks: hasBookmarked
              ? post.bookmarks.filter(id => id !== currentUser.id)
              : [...post.bookmarks, currentUser.id]
          };
        }
        return post;
      });

      return {
        ...prev,
        posts: updatedPosts
      };
    });
  };

  const followUser = (userId: string) => {
    if (!currentUser || userId === currentUser.id) return;

    setMockData(prev => {
      const updatedUsers = prev.users.map(user => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            following: [...user.following, userId]
          };
        }
        if (user.id === userId) {
          return {
            ...user,
            followers: [...user.followers, currentUser.id]
          };
        }
        return user;
      });

      return {
        ...prev,
        users: updatedUsers
      };
    });
  };

  const unfollowUser = (userId: string) => {
    if (!currentUser) return;

    setMockData(prev => {
      const updatedUsers = prev.users.map(user => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            following: user.following.filter(id => id !== userId)
          };
        }
        if (user.id === userId) {
          return {
            ...user,
            followers: user.followers.filter(id => id !== currentUser.id)
          };
        }
        return user;
      });

      return {
        ...prev,
        users: updatedUsers
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users: mockData.users,
        posts: mockData.posts,
        comments: mockData.comments,
        theme,
        setTheme,
        login,
        logout,
        createPost,
        likePost,
        commentPost,
        repostPost,
        bookmarkPost,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};