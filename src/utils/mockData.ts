import { User, Post, Comment } from '../types';

export const generateMockData = () => {
  // Mock users
  const users: User[] = [
    {
      id: '1',
      name: 'Jane Smith',
      username: 'savvysaver',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Financial planner | Budgeting expert | Helping you save smarter',
      joinedAt: '2024-01-15T10:00:00Z',
      followers: ['2', '3'],
      following: ['2'],
      badges: ['budgetMaster', 'debtFree']
    },
    {
      id: '2',
      name: 'Alex Johnson',
      username: 'investorAlex',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Stock market enthusiast | ETF investor | Building wealth one day at a time',
      joinedAt: '2024-02-20T14:30:00Z',
      followers: ['1'],
      following: ['1', '3'],
      badges: ['stockPro']
    },
    {
      id: '3',
      name: 'Sarah Chen',
      username: 'frugalLiving',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Minimalist | FIRE movement | Teaching how to live on less',
      joinedAt: '2024-03-05T09:15:00Z',
      followers: ['2'],
      following: ['1'],
      badges: ['emergencyFundHero']
    },
    {
      id: '4',
      name: 'Marcus Taylor',
      username: 'cryptoMarcus',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Crypto investor | Blockchain technology | DeFi explorer',
      joinedAt: '2024-03-10T11:45:00Z',
      followers: [],
      following: [],
      badges: ['cryptoTrader']
    }
  ];

  // Mock posts
  const posts: Post[] = [
    {
      id: '1',
      userId: '1',
      text: 'Always automate your savings! Set up transfers to happen right after payday so you never "see" that money in your checking account.',
      type: 'regular',
      hashtags: ['#SavingHack', '#Automation'],
      likes: ['2', '3'],
      comments: ['1'],
      reposts: ['2'],
      bookmarks: ['3'],
      createdAt: '2024-04-01T15:30:00Z'
    },
    {
      id: '2',
      userId: '2',
      text: 'Just reached $10,000 in my investment portfolio! Consistent monthly investing really adds up.',
      type: 'milestone',
      hashtags: ['#MilestoneAchieved', '#Investing'],
      likes: ['1', '3'],
      comments: ['2'],
      reposts: [],
      bookmarks: ['1'],
      createdAt: '2024-04-02T09:45:00Z'
    },
    {
      id: '3',
      userId: '3',
      text: 'My goal: Save $5,000 for emergency fund by December. Currently at $3,500!',
      type: 'goal',
      goalProgress: 70,
      hashtags: ['#EmergencyFund', '#SavingsGoal'],
      likes: ['1', '2'],
      comments: [],
      reposts: ['1'],
      bookmarks: ['2'],
      createdAt: '2024-04-03T11:20:00Z'
    },
    {
      id: '4',
      userId: '4',
      text: 'What\'s everyone\'s favorite app for tracking expenses? Looking for something that can categorize automatically.',
      type: 'regular',
      hashtags: ['#BudgetingApps', '#Question'],
      likes: ['1'],
      comments: ['3'],
      reposts: [],
      bookmarks: [],
      createdAt: '2024-04-03T14:10:00Z'
    },
    {
      id: '5',
      userId: '1',
      text: 'Paid off my last credit card today! Debt-free for the first time in 5 years. Next step: building that emergency fund.',
      type: 'milestone',
      hashtags: ['#DebtFree', '#FinancialFreedom'],
      likes: ['2', '3', '4'],
      comments: [],
      reposts: ['2', '3'],
      bookmarks: ['2', '4'],
      createdAt: '2024-04-04T10:05:00Z'
    },
    {
      id: '6',
      userId: '2',
      text: 'Quick tip: Review your subscriptions every 3 months. Cancel what you don\'t use. I just saved $45/month doing this!',
      type: 'regular',
      hashtags: ['#MoneySaver', '#Subscriptions'],
      likes: ['1', '3'],
      comments: [],
      reposts: ['1'],
      bookmarks: ['1', '3'],
      createdAt: '2024-04-05T16:30:00Z'
    }
  ];

  // Mock comments
  const comments: Comment[] = [
    {
      id: '1',
      postId: '1',
      userId: '2',
      text: 'This changed my savings game completely! I don\'t even miss the money now.',
      likes: ['1'],
      createdAt: '2024-04-01T16:15:00Z'
    },
    {
      id: '2',
      postId: '2',
      userId: '1',
      text: 'Congratulations! What\'s your investment strategy?',
      likes: ['2'],
      createdAt: '2024-04-02T10:30:00Z'
    },
    {
      id: '3',
      postId: '4',
      userId: '1',
      text: 'I use YNAB (You Need A Budget). Great for categories and it syncs with most banks!',
      likes: ['4'],
      createdAt: '2024-04-03T15:00:00Z'
    }
  ];

  return { users, posts, comments };
};