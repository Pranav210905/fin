import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Layout from '../components/layout/Layout';
import PostCard from '../components/post/PostCard';
import { ArrowLeft } from 'lucide-react';

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts, comments, users, currentUser, commentPost } = useApp();
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();
  
  const post = posts.find(p => p.id === postId);
  if (!post) return <div>Post not found</div>;
  
  const postComments = comments
    .filter(comment => post.comments.includes(comment.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;
    
    commentPost(post.id, commentText);
    setCommentText('');
  };

  return (
    <Layout>
      <div className="border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Post</h1>
        </div>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-800">
        <PostCard post={post} />
      </div>
      
      {currentUser && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSubmitComment}>
            <div className="flex">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Post your reply"
                  className="w-full bg-transparent border-none focus:ring-0 resize-none"
                  rows={2}
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`px-4 py-2 rounded-full font-medium ${
                      commentText.trim()
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-blue-300 cursor-not-allowed text-white'
                    }`}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {postComments.map(comment => {
          const commentUser = users.find(u => u.id === comment.userId);
          if (!commentUser) return null;
          
          return (
            <div key={comment.id} className="p-4">
              <div className="flex">
                <img
                  src={commentUser.avatar}
                  alt={commentUser.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{commentUser.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      @{commentUser.username}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 mx-1">·</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1">{comment.text}</p>
                </div>
              </div>
            </div>
          );
        })}
        
        {postComments.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to reply!
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostDetailPage;