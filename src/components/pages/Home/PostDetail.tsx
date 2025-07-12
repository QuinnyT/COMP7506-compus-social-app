import React, { useState } from 'react';

interface PostDetailProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, isOpen, onClose, currentUserId }) => {
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'SC',
      content: 'This looks amazing! Where exactly is this spot?',
      timestamp: '2 hours ago',
      likes: 5,
      replies: [
        {
          id: 11,
          author: 'Mike Johnson',
          avatar: 'MJ',
          content: 'It\'s on the 3rd floor, near the east window!',
          timestamp: '1 hour ago',
          likes: 2,
        }
      ]
    },
    {
      id: 2,
      author: 'Emma Wilson',
      avatar: 'EW',
      content: 'I\'ve been looking for a quiet place to study. Thanks for sharing!',
      timestamp: '1 hour ago',
      likes: 3,
      replies: []
    },
    {
      id: 3,
      author: 'David Kim',
      avatar: 'DK',
      content: 'The lighting is perfect for late-night sessions.',
      timestamp: '30 minutes ago',
      likes: 1,
      replies: [
        {
          id: 31,
          author: 'Lisa Park',
          avatar: 'LP',
          content: 'Agreed! I love studying there too.',
          timestamp: '15 minutes ago',
          likes: 1,
        }
      ]
    }
  ]);

  const isOwnPost = currentUserId === post?.authorId;

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: 'Current User',
        avatar: 'CU',
        content: commentText,
        timestamp: 'Just now',
        likes: 0,
        replies: []
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  const handleAddReply = (commentId: number) => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        author: 'Current User',
        avatar: 'CU',
        content: replyText,
        timestamp: 'Just now',
        likes: 0,
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      ));
      setReplyText('');
      setReplyTo(null);
    }
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleLikeReply = (commentId: number, replyId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === replyId 
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          }
        : comment
    ));
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-background z-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-lg font-semibold text-foreground">Post</h1>
        </div>
      </div>

      {/* Post Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Post Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
              <span className="text-sm font-medium">{post.avatar}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
            {!isOwnPost && (
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Message
              </button>
            )}
          </div>

          {/* Post Title */}
          <h2 className="text-xl font-semibold text-foreground mb-3">{post.title}</h2>

          {/* Post Content */}
          <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

          {/* Post Type Specific Content */}
          {post.type === 'event' && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📅</span>
                  <span className="text-foreground">{post.eventTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📍</span>
                  <span className="text-foreground">{post.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">👥</span>
                  <span className="text-foreground">{post.capacity}</span>
                </div>
              </div>
            </div>
          )}

          {post.type === 'marketplace' && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{post.price}</span>
                <span className="text-xs text-muted-foreground">Marketplace</span>
              </div>
            </div>
          )}

          {/* Post Images */}
          {post.image && (
            <div className="mb-4">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center gap-6 py-4 border-t border-border">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <span>❤️</span>
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <span>💬</span>
              <span>{comments.length}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <span>📤</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="border-t border-border pt-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Comments</h3>
            
            {/* Add Comment */}
            <div className="mb-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">CU</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                    className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-3">
                  {/* Main Comment */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{comment.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-foreground text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <button 
                          onClick={() => handleLikeComment(comment.id)}
                          className="hover:text-primary transition-colors"
                        >
                          Like ({comment.likes})
                        </button>
                        <button 
                          onClick={() => setReplyTo(comment.id)}
                          className="hover:text-primary transition-colors"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reply Input */}
                  {replyTo === comment.id && (
                    <div className="ml-11">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">CU</span>
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full p-2 border border-border rounded-lg bg-background text-foreground resize-none text-sm"
                            rows={2}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleAddReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Reply
                            </button>
                            <button
                              onClick={() => {
                                setReplyTo(null);
                                setReplyText('');
                              }}
                              className="px-3 py-1 bg-muted text-muted-foreground rounded text-xs font-medium hover:bg-muted/80 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="ml-11 space-y-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">{reply.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-muted/20 rounded-lg p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-foreground text-sm">{reply.author}</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-foreground text-sm">{reply.content}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <button 
                                onClick={() => handleLikeReply(comment.id, reply.id)}
                                className="hover:text-primary transition-colors"
                              >
                                Like ({reply.likes})
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
