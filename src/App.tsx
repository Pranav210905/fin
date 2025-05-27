import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { AppProvider } from './contexts/AppContext';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Handle auth state changes
      if (user) {
        // User is signed in
        document.documentElement.classList.add('dark');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;