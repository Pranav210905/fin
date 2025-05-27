import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Send, Award, Target } from 'lucide-react';

const PostForm: React.FC = () => {
  const { currentUser, createPost } = useApp();
  const [text, setText] = useState('');
  const [postType, setPostType] = useState<'regular' | 'milestone' | 'goal'>('regular');
  const [goalProgress, setGoalProgress] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const maxLength = 280;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !currentUser) return;

    // Extract hashtags from the text
    const hashtagRegex = /#[\w]+/g;
    const hashtags = text.match(hashtagRegex) || [];

    createPost(text, postType, hashtags, goalProgress);
    setText('');
    setPostType('regular');
    setGoalProgress(0);
  };

  if (!currentUser) return null;

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share a financial tip or update..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none text-lg"
              maxLength={maxLength}
              rows={3}
            />
            
            {postType === 'goal' && (
              <div className="mb-3">
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Progress: {goalProgress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goalProgress}
                  onChange={(e) => setGoalProgress(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setPostType('regular')}
                  className={`p-2 rounded-full ${
                    postType === 'regular'
                      ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/40'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Send size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setPostType('milestone')}
                  className={`p-2 rounded-full ${
                    postType === 'milestone'
                      ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/40'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Award size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setPostType('goal')}
                  className={`p-2 rounded-full ${
                    postType === 'goal'
                      ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/40'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Target size={18} />
                </button>
              </div>
              
              <div className="flex items-center">
                <span className={`text-sm mr-3 ${
                  text.length > maxLength * 0.8 ? 'text-orange-500' : 'text-gray-500'
                }`}>
                  {text.length}/{maxLength}
                </span>
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className={`px-4 py-2 rounded-full font-medium ${
                    text.trim()
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-blue-300 cursor-not-allowed text-white'
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;