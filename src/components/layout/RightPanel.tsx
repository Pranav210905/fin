import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { User } from '../../types';
import { TrendingUp } from 'lucide-react';

const RightPanel: React.FC = () => {
  const { users, posts, currentUser, followUser } = useApp();
  
  // Get trending hashtags
  const allHashtags = posts.flatMap(post => post.hashtags);
  const hashtagCount = allHashtags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const trendingHashtags = Object.entries(hashtagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Get suggested users (users the current user doesn't follow)
  const suggestedUsers = users.filter(user => 
    user.id !== currentUser?.id && 
    !currentUser?.following.includes(user.id)
  ).slice(0, 3);

  return (
    <div className="space-y-2">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search FinChat"
          className="w-full p-3 pl-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute left-3 top-3 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Trending topics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="font-bold text-xl mb-4">Trending in Finance</h2>
        <ul className="space-y-4">
          {trendingHashtags.map(([tag, count]) => (
            <li key={tag} className="flex items-start">
              <TrendingUp size={18} className="text-blue-500 mt-1 mr-2" />
              <div>
                <p className="font-medium">{tag}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{count} posts</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Who to follow */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="font-bold text-xl mb-4">Who to follow</h2>
        <ul className="space-y-4">
          {suggestedUsers.map((user) => (
            <SuggestedUserItem key={user.id} user={user} />
          ))}
        </ul>
      </div>

      {/* Daily finance tip */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4">
        <h3 className="font-bold text-lg mb-2">Tip of the Day</h3>
        <p className="text-sm">
          Using the 50/30/20 rule can simplify budgeting: 50% for needs, 30% for wants, and 20% for savings and debt repayment.
        </p>
      </div>

      {/* Footer */}
    </div>
  );
};

const SuggestedUserItem: React.FC<{ user: User }> = ({ user }) => {
  const { followUser } = useApp();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
        </div>
      </div>
      <button
        onClick={() => followUser(user.id)}
        className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
      >
        Follow
      </button>
    </div>
  );
};

export default RightPanel;