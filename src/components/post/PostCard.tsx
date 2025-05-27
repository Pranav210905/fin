import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Repeat, Bookmark, MoreHorizontal } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Post, User } from '../../types';
import TimeAgo from '../../utils/TimeAgo';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { users, currentUser, likePost, repostPost, bookmarkPost } = useApp();
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();
  
  const author = users.find(user => user.id === post.userId);
  if (!author) return null;
  
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;
  const isReposted = currentUser ? post.reposts.includes(currentUser.id) : false;
  const isBookmarked = currentUser ? post.bookmarks.includes(currentUser.id) : false;

  const handleUserClick = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    navigate(`/profile/${userId}`);
  };

  const handlePostClick = () => {
    navigate(`/post/${post.id}`);
  };

  // Format hashtags in text
  const formatText = (text: string) => {
    return text.replace(
      /#(\w+)/g,
      '<span class="text-blue-500 hover:underline cursor-pointer">#$1</span>'
    );
  };

  return (
    <div 
      className="p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
      onClick={handlePostClick}
    >
      {/* Post header */}
      <div className="flex">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-10 h-10 rounded-full mr-3 cursor-pointer"
          onClick={(e) => handleUserClick(e, author.id)}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span 
                className="font-medium hover:underline cursor-pointer"
                onClick={(e) => handleUserClick(e, author.id)}
              >
                {author.name}
              </span>
              <span 
                className="text-gray-500 dark:text-gray-400 ml-2 cursor-pointer"
                onClick={(e) => handleUserClick(e, author.id)}
              >
                @{author.username}
              </span>
              <span className="text-gray-500 dark:text-gray-400 mx-1">·</span>
              <span className="text-gray-500 dark:text-gray-400">
                <TimeAgo timestamp={post.createdAt} />
              </span>
            </div>
            <div className="relative">
              <button 
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
              >
                <MoreHorizontal size={18} />
              </button>
              {showActions && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Copy link
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Report post
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Post badge for milestone or goal */}
          {post.type !== 'regular' && (
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full mb-2">
              {post.type === 'milestone' ? '🏆 Milestone' : '🎯 Goal'}
            </div>
          )}

          {/* Post content */}
          <div 
            className="my-2"
            dangerouslySetInnerHTML={{ __html: formatText(post.text) }}
          />

          {/* Goal progress bar */}
          {post.type === 'goal' && typeof post.goalProgress === 'number' && (
            <div className="mt-2 mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${post.goalProgress}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                {post.goalProgress}% complete
              </div>
            </div>
          )}

          {/* Post actions */}
          <div className="flex justify-between mt-3 -ml-2">
            <button 
              className={`flex items-center p-2 rounded-full ${
                isLiked 
                  ? 'text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20' 
                  : 'text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                likePost(post.id);
              }}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
              {post.likes.length > 0 && (
                <span className="ml-2 text-sm">{post.likes.length}</span>
              )}
            </button>

            <button 
              className="flex items-center p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/post/${post.id}`);
              }}
            >
              <MessageCircle size={18} />
              {post.comments.length > 0 && (
                <span className="ml-2 text-sm">{post.comments.length}</span>
              )}
            </button>

            <button 
              className={`flex items-center p-2 rounded-full ${
                isReposted 
                  ? 'text-green-500 hover:bg-green-100 dark:hover:bg-green-900/20' 
                  : 'text-gray-500 hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                repostPost(post.id);
              }}
            >
              <Repeat size={18} />
              {post.reposts.length > 0 && (
                <span className="ml-2 text-sm">{post.reposts.length}</span>
              )}
            </button>

            <button 
              className={`flex items-center p-2 rounded-full ${
                isBookmarked 
                  ? 'text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20' 
                  : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                bookmarkPost(post.id);
              }}
            >
              <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
              {post.bookmarks.length > 0 && (
                <span className="ml-2 text-sm">{post.bookmarks.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;