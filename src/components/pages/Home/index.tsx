import React, { useState } from 'react';
import Publish from './Publish';
import PostDetail from './PostDetail';
import { allPosts } from '@/constant/post';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostDetail, setShowPostDetail] = useState(false);

  const tabs = [
    { id: 'all', label: 'All/For You' },
    { id: 'share', label: 'Campus Share' },
    { id: 'events', label: 'Events/Meetups' },
    { id: 'marketplace', label: 'Marketplace' },
  ];



  // Filter posts based on active tab
  const getFilteredPosts = () => {
    if (activeTab === 'all') {
      return allPosts;
    }
    return allPosts.filter(post => post.type === activeTab);
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

  const renderPostCard = (post: any) => {
    return (
      <div 
        key={post.id} 
        className="bg-card rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => handlePostClick(post)}
      >
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
          filteredPosts.map(renderPostCard)
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts found in this category.</p>
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
      />
    </div>
  );
};

export default Home; 