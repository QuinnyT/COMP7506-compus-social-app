import { useState } from 'react';

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);

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
              <p className="text-lg font-semibold text-foreground">42</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">128</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">56</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
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