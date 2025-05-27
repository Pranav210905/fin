import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import PostCard from '../components/post/PostCard';
import Layout from '../components/layout/Layout';
import { Calendar, MapPin, Link2, Users, Award } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { users, posts, comments, currentUser, followUser, unfollowUser } = useApp();
  const [activeTab, setActiveTab] = useState<'posts' | 'milestones' | 'bookmarks' | 'following'>('posts');
  
  const user = users.find(u => u.id === userId);
  if (!user) return <div>User not found</div>;
  
  const isCurrentUser = currentUser?.id === user.id;
  const isFollowing = currentUser?.following.includes(user.id) || false;
  
  // Get user's posts
  const userPosts = posts.filter(post => post.userId === user.id);
  
  // Get user's milestones
  const userMilestones = posts.filter(post => post.userId === user.id && post.type === 'milestone');
  
  // Get bookmarked posts
  const bookmarkedPosts = posts.filter(post => post.bookmarks.includes(user.id));
  
  // Get followed users
  const followedUsers = users.filter(u => user.following.includes(u.id));
  
  // Sort posts by date
  const sortedPosts = [...userPosts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const handleFollow = () => {
    if (isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Layout>
      <div className="relative">
        {/* Cover photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Profile info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-shrink-0 -mt-20">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900"
              />
            </div>
            
            {!isCurrentUser && currentUser && (
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded-full font-medium ${
                  isFollowing
                    ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
            
            {isCurrentUser && (
              <button
                className="px-4 py-2 rounded-full font-medium bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
              >
                Edit profile
              </button>
            )}
          </div>
          
          <div className="mb-4">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
          </div>
          
          <div className="mb-4">
            <p>{user.bio}</p>
          </div>
          
          <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center mr-4 mb-2">
              <Calendar size={16} className="mr-1" />
              <span>Joined {formatDate(user.joinedAt)}</span>
            </div>
            
            <div className="flex items-center mr-4 mb-2">
              <Users size={16} className="mr-1" />
              <span>
                <strong>{user.following.length}</strong> Following
              </span>
            </div>
            
            <div className="flex items-center mb-2">
              <Users size={16} className="mr-1" />
              <span>
                <strong>{user.followers.length}</strong> Followers
              </span>
            </div>
          </div>
          
          {/* Badges */}
          {user.badges.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-medium mb-2">Achievements</h2>
              <div className="flex flex-wrap gap-2">
                {user.badges.includes('budgetMaster') && (
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-3 py-1 rounded-full flex items-center">
                    <Award size={14} className="mr-1" />
                    Budget Master
                  </div>
                )}
                {user.badges.includes('debtFree') && (
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-3 py-1 rounded-full flex items-center">
                    <Award size={14} className="mr-1" />
                    Debt Free
                  </div>
                )}
                {user.badges.includes('stockPro') && (
                  <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-3 py-1 rounded-full flex items-center">
                    <Award size={14} className="mr-1" />
                    Stock Pro
                  </div>
                )}
                {user.badges.includes('emergencyFundHero') && (
                  <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs px-3 py-1 rounded-full flex items-center">
                    <Award size={14} className="mr-1" />
                    Emergency Fund Hero
                  </div>
                )}
                {user.badges.includes('cryptoTrader') && (
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-3 py-1 rounded-full flex items-center">
                    <Award size={14} className="mr-1" />
                    Crypto Trader
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'posts'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'milestones'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('milestones')}
          >
            Milestones
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'bookmarks'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('bookmarks')}
          >
            Bookmarks
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'following'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
        </div>
        
        {/* Tab content */}
        {activeTab === 'posts' && (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {sortedPosts.length > 0 ? (
              sortedPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No posts yet
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'milestones' && (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {userMilestones.length > 0 ? (
              userMilestones.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No milestones yet
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'bookmarks' && (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {bookmarkedPosts.length > 0 ? (
              bookmarkedPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No bookmarks yet
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'following' && (
          <div className="p-4 divide-y divide-gray-200 dark:divide-gray-800">
            {followedUsers.length > 0 ? (
              followedUsers.map(followedUser => (
                <div key={followedUser.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={followedUser.avatar}
                      alt={followedUser.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{followedUser.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">@{followedUser.username}</p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                    onClick={() => unfollowUser(followedUser.id)}
                  >
                    Following
                  </button>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                Not following anyone yet
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;