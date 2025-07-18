import { useState, useEffect } from 'react';
import { getFavoritePosts } from './Home/index';
import { allPosts as initialPosts } from '@/constant/post';

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  // 新增：收藏tab
  const [favoriteTab, setFavoriteTab] = useState<'posts' | 'marketplace' | 'events'>('posts');
  // 动态获取收藏的帖子
  const FAVORITE_KEY = 'favorite_post_ids';
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritePosts, setFavoritePosts] = useState<any[]>([]);
  // 每次tab切换或页面渲染时刷新收藏
  useEffect(() => {
    const saved = localStorage.getItem(FAVORITE_KEY);
    const ids = saved ? JSON.parse(saved) : [];
    setFavoriteIds(ids);
    setFavoritePosts(getFavoritePosts(initialPosts, ids));
  }, [favoriteTab]);
  // 新增：动态获取当前用户发布的帖子数量
  const [posts, setPosts] = useState<any[]>([]);
  const currentUserId = 'current-user';
  useEffect(() => {
    const saved = localStorage.getItem('all_posts');
    setPosts(saved ? JSON.parse(saved) : initialPosts);
  }, []);
  const myPostsCount = posts.filter(post => post.authorId === currentUserId).length;
  const favoriteGoods = [{ id: 'g1', title: 'Book for Sale', type: 'marketplace' }];
  const favoriteEvents = [{ id: 'e1', title: 'Math Meetup', type: 'event' }];

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">Profile</h1>
      </div>
      
      {/* User Information */}
      <div className="p-4">
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xl font-medium">JS</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-1">John Smith</h2>
              <p className="text-sm text-muted-foreground">Computer Science & Technology</p>
              <p className="text-sm text-muted-foreground">Class of 2023</p>
              <p className="text-sm text-muted-foreground">Main Campus</p>
            </div>
          </div>
          
          <div className="flex items-center justify-around border-t border-border pt-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{myPostsCount}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            {/* <div className="text-center">
              <p className="text-lg font-semibold text-foreground">128</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">56</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div> */}
          </div>
        </div>
        
        {/* Function Menu */}
        <div className="space-y-2">
          {/* My Posts */}
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">📝</span>
                <span className="text-foreground">My Posts</span>
              </div>
              <span className="text-muted-foreground">{'>'}</span>
            </div>
          </div>
          
          {/* My Favorites */}
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">❤️</span>
                <span className="text-foreground">My Favorites</span>
              </div>
              <span className="text-muted-foreground">{'>'}</span>
            </div>
            {/* 收藏tab切换 */}
            <div className="flex gap-2 mt-4">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${favoriteTab === 'events' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                onClick={() => setFavoriteTab('events')}
              >
                Events
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${favoriteTab === 'posts' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                onClick={() => setFavoriteTab('posts')}
              >
                Posts
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${favoriteTab === 'marketplace' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                onClick={() => setFavoriteTab('marketplace')}
              >
                Goods
              </button>
            </div>
            {/* 收藏内容展示 */}
            <div className="mt-4">
              {favoriteTab === 'posts' && (
                <ul>
                  {favoritePosts.length === 0 ? (
                    <li className="text-muted-foreground py-2">No favorite posts yet.</li>
                  ) : favoritePosts.map((item: { id: string; title: string }) => (
                    <li key={item.id} className="py-2 border-b border-border last:border-0">{item.title}</li>
                  ))}
                </ul>
              )}
              {favoriteTab === 'marketplace' && (
                <ul>
                  {favoriteGoods.map(item => (
                    <li key={item.id} className="py-2 border-b border-border last:border-0">{item.title}</li>
                  ))}
                </ul>
              )}
              {favoriteTab === 'events' && (
                <ul>
                  {favoriteEvents.map(item => (
                    <li key={item.id} className="py-2 border-b border-border last:border-0">{item.title}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Settings */}
          <div className="bg-card rounded-lg border border-border">
            <div 
              className="p-4 cursor-pointer"
              onClick={() => setShowSettings(!showSettings)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">⚙️</span>
                  <span className="text-foreground">Settings</span>
                </div>
                <span className={`text-muted-foreground transition-transform ${showSettings ? 'rotate-90' : ''}`}>
                  {'>'}
                </span>
              </div>
            </div>
            
            {/* Settings Submenu */}
            {showSettings && (
              <div className="border-t border-border">
                <div className="p-3 pl-12">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground">Account & Security</span>
                      <span className="text-muted-foreground">{'>'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground">Notifications</span>
                      <span className="text-muted-foreground">{'>'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground">Clear Cache</span>
                      <span className="text-muted-foreground">{'>'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground">About Us</span>
                      <span className="text-muted-foreground">{'>'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-red-500">Log Out</span>
                      <span className="text-muted-foreground">{'>'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 