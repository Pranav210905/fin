import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import PostCard from '../components/post/PostCard';
import Layout from '../components/layout/Layout';
import { Search, TrendingUp, Award, BarChart4 } from 'lucide-react';

const ExplorePage: React.FC = () => {
  const { posts, users } = useApp();
  const [activeTab, setActiveTab] = useState<'trending' | 'milestones' | 'goals'>('trending');
  
  // Get all unique hashtags
  const allHashtags = posts.flatMap(post => post.hashtags);
  const uniqueHashtags = [...new Set(allHashtags)];
  
  // Count hashtag occurrences
  const hashtagCount = allHashtags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort hashtags by popularity
  const sortedHashtags = uniqueHashtags
    .sort((a, b) => hashtagCount[b] - hashtagCount[a])
    .slice(0, 10);
  
  // Filter posts by tab
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'trending') {
      return true; // Show all posts in trending
    } else if (activeTab === 'milestones') {
      return post.type === 'milestone';
    } else if (activeTab === 'goals') {
      return post.type === 'goal';
    }
    return false;
  });
  
  // Sort posts by engagement (likes + comments + reposts)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const engagementA = a.likes.length + a.comments.length + a.reposts.length;
    const engagementB = b.likes.length + b.comments.length + b.reposts.length;
    return engagementB - engagementA;
  });

  return (
    <Layout>
      <div className="border-b border-gray-200 dark:border-gray-800 p-4">
        <h1 className="text-xl font-bold">Explore</h1>
      </div>
      
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <input
            type="text"
            placeholder="Search hashtags, users, or content"
            className="w-full p-3 pl-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-3 text-gray-500">
            <Search size={20} />
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          className={`flex items-center justify-center px-4 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'trending'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('trending')}
        >
          <TrendingUp size={18} className="mr-2" />
          Trending
        </button>
        <button
          className={`flex items-center justify-center px-4 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'milestones'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('milestones')}
        >
          <Award size={18} className="mr-2" />
          Milestones
        </button>
        <button
          className={`flex items-center justify-center px-4 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'goals'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('goals')}
        >
          <BarChart4 size={18} className="mr-2" />
          Goals
        </button>
      </div>
      
      {activeTab === 'trending' && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-2">
          {sortedHashtags.map(tag => (
            <div
              key={tag}
              className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <p className="font-medium text-blue-500">{tag}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{hashtagCount[tag]} posts</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Posts */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {sortedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default ExplorePage;