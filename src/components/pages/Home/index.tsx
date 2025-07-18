import { useState, useEffect } from 'react';
import Publish from './Publish';
import PostDetail from './PostDetail';
import { allPosts as initialPosts } from '@/constant/post';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  // 新增：筛选条件
  const [scope, setScope] = useState<'hongkong' | 'campus' | 'department'>('campus');
  const [timeFilter, setTimeFilter] = useState<'24h' | 'week'>('24h');
  // 收藏状态持久化到localStorage
  const FAVORITE_KEY = 'favorite_post_ids';
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(FAVORITE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [posts, setPosts] = useState<any[]>(initialPosts);
  useEffect(() => {
    localStorage.setItem('all_posts', JSON.stringify(posts));
  }, [posts]);
  useEffect(() => {
    setActiveTab('events');
  }, []);
  useEffect(() => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const tabs = [
    { id: 'events', label: 'Events' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'forum', label: 'Forum' },
  ];



  // Filter posts based on active tab and filters
  const getFilteredPosts = () => {
    let filtered = posts;
    // Tab筛选
    if (activeTab === 'forum') {
      filtered = filtered.filter(post => post.type === 'share');
    } else if (activeTab === 'events') {
      filtered = filtered.filter(post => post.type === 'event');
    } else if (activeTab === 'marketplace') {
      filtered = filtered.filter(post => post.type === 'marketplace');
    }
    // 分享范围筛选
    if (scope === 'department') {
      filtered = filtered.filter(post => ('scope' in post ? post.scope === 'department' : true));
    } else if (scope === 'campus') {
      filtered = filtered.filter(post => ('scope' in post ? (post.scope === 'campus' || post.scope === 'department') : true));
    } else if (scope === 'hongkong') {
      filtered = filtered.filter(post => ('scope' in post ? (post.scope === 'hongkong' || post.scope === 'campus' || post.scope === 'department') : true));
    }
    // 时间筛选
    const now = Date.now();
    if (timeFilter === '24h') {
      filtered = filtered.filter(post => {
        if (!post.timestamp) return true;
        const postTime = new Date(post.timestamp).getTime();
        return now - postTime <= 24 * 60 * 60 * 1000;
      });
    } else if (timeFilter === 'week') {
      filtered = filtered.filter(post => {
        if (!post.timestamp) return true;
        const postTime = new Date(post.timestamp).getTime();
        return now - postTime <= 7 * 24 * 60 * 60 * 1000;
      });
    }
    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleClosePostDetail = () => {
    setShowPostDetail(false);
    setSelectedPost(null);
  };

  // 收藏状态管理
  const handleToggleFavorite = (postId: string) => {
    setFavoriteIds(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
  };

  // 导出收藏的帖子数据供Profile使用
  // const getFavoritePosts = (allPosts: any[], favoriteIds: string[]) => {
  //   return allPosts.filter(post => favoriteIds.includes(post.id));
  // };

  // 发布后添加新post
  const handlePublish = (newPost: any) => {
    setPosts(prev => [newPost, ...prev]);
  };

  // 卡片组件增加收藏按钮
  const PostCard = ({ post, isFavorited, onToggleFavorite }: { post: any, isFavorited: boolean, onToggleFavorite: () => void }) => {
    return (
      <div 
        key={post.id} 
        className="bg-card rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors relative"
        onClick={() => handlePostClick(post)}
      >
        {/* 收藏按钮 */}
        <button
          className="absolute top-3 right-3 z-10 text-xl"
          onClick={e => { e.stopPropagation(); onToggleFavorite(); }}
          aria-label={isFavorited ? 'Unfavorite' : 'Favorite'}
        >
          <span className={isFavorited ? 'text-red-500' : 'text-muted-foreground'}>❤️</span>
        </button>
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">{post.avatar}</span>
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{post.author}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        {/* Post Content */}
        <div className="mb-3">
          <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
          <p className="text-foreground text-sm">{post.content}</p>
        </div>
        {/* Post Type Specific Content */}
        {post.type === 'event' && (
          <div className="bg-muted/50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary">📅</span>
              <span className="text-foreground">{post.eventTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-primary">📍</span>
              <span className="text-foreground">{post.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-primary">👥</span>
              <span className="text-foreground">{post.capacity}</span>
            </div>
          </div>
        )}
        {post.type === 'marketplace' && (
          <div className="bg-muted/50 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">{post.price}</span>
              <span className="text-xs text-muted-foreground">Marketplace</span>
            </div>
          </div>
        )}
        {/* Post Image */}
        {post.image && (
          <div className="mb-3">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        {/* Post Actions */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <span>❤️</span>
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <span>💬</span>
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <span>📤</span>
          </button>
        </div>
      </div>
    );
  };

  // const renderPostCard = (post: any) => {
  //   return (
  //     <PostCard
  //       post={post}
  //       isFavorited={favoriteIds.includes(post.id)}
  //       onToggleFavorite={() => handleToggleFavorite(post.id)}
  //     />
  //   );
  // };

  if (showPostDetail) {
    return (
      <PostDetail
        post={selectedPost}
        isOpen={showPostDetail}
        onClose={handleClosePostDetail}
        currentUserId="sarah-chen"
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold text-foreground mb-3">Home</h1>
          {/* 筛选栏（下拉框） */}
          <div className="flex gap-2 mb-3">
            <select
              className="px-3 py-1 rounded-lg text-xs font-medium border border-border bg-background text-foreground"
              value={scope}
              onChange={e => setScope(e.target.value as 'hongkong' | 'campus' | 'department')}
            >
              <option value="hongkong">Hong Kong</option>
              <option value="campus">Campus</option>
              <option value="department">Department</option>
            </select>
            <select
              className="px-3 py-1 rounded-lg text-xs font-medium border border-border bg-background text-foreground"
              value={timeFilter}
              onChange={e => setTimeFilter(e.target.value as '24h' | 'week')}
            >
              <option value="24h">Last 24h</option>
              <option value="week">This Week</option>
            </select>
          </div>
          {/* Tab Navigation */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Posts List */}
      <div className="p-4 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              isFavorited={favoriteIds.includes(post.id)}
              onToggleFavorite={() => handleToggleFavorite(post.id)}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts found for the selected filters.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowPublishModal(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors z-40"
      >
        <span className="text-2xl">+</span>
      </button>

      {/* Publish Modal */}
      <Publish 
        isOpen={showPublishModal} 
        onClose={() => setShowPublishModal(false)} 
        defaultType={activeTab === 'forum' ? 'share' : activeTab}
        onPublish={handlePublish}
      />
    </div>
  );
};

const getFavoritePosts = (allPosts: any[], favoriteIds: string[]) => {
  return allPosts.filter(post => favoriteIds.includes(post.id));
};

export { getFavoritePosts };

export default Home; 