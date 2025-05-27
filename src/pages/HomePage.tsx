import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';
import Layout from '../components/layout/Layout';
import { TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  const { posts, users, currentUser } = useApp();
  
  // Sort posts by creation date (most recent first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // If user is logged in, show posts from followed users first
  let orderedPosts = sortedPosts;
  if (currentUser) {
    const followingPosts = sortedPosts.filter(post => 
      currentUser.following.includes(post.userId) || post.userId === currentUser.id
    );
    const otherPosts = sortedPosts.filter(post => 
      !currentUser.following.includes(post.userId) && post.userId !== currentUser.id
    );
    orderedPosts = [...followingPosts, ...otherPosts];
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <TrendingUp size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to FinChat
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join the community of financial enthusiasts sharing insights and achievements
          </p>
          <div className="space-y-4">
            <Link
              to="/signup"
              className="block w-full sm:w-auto bg-blue-500 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
            >
              Create account
            </Link>
            <Link
              to="/login"
              className="block w-full sm:w-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-full font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="border-b border-gray-200 dark:border-gray-800 p-4">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      
      <PostForm />
      
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {orderedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;