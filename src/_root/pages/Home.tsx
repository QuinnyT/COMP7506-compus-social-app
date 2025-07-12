const Home = () => {
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">校园动态</h2>
          <div className="flex flex-col gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <p className="text-muted-foreground">欢迎使用校园社交应用！</p>
              <p className="text-sm text-muted-foreground mt-2">
                这里将显示校园内的分享、活动和二手交易信息。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">热门用户</h3>
        <div className="flex flex-col gap-4">
          <div className="bg-card p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">暂无热门用户</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 