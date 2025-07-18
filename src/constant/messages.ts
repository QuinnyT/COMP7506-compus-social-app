export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image';
  timestamp: string;
  isRead: boolean;
  imageUrl?: string;
}

export const messages: Record<string, Message[]> = {
  // Sarah Chen 的聊天记录
  'sarah-chen': [
    {
      id: '1',
      senderId: 'sarah-chen',
      receiverId: 'current-user',
      content: 'Hey! About tomorrow\'s class schedule...',
      type: 'text',
      timestamp: '14:30',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: 'sarah-chen',
      content: 'Hi Sarah! What about the schedule?',
      type: 'text',
      timestamp: '14:32',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'sarah-chen',
      receiverId: 'current-user',
      content: 'I was wondering if you have the updated syllabus for the advanced course.',
      type: 'text',
      timestamp: '14:33',
      isRead: true,
    },
    {
      id: '4',
      senderId: 'current-user',
      receiverId: 'sarah-chen',
      content: 'Yes, I have it! Let me send you a copy.',
      type: 'text',
      timestamp: '14:35',
      isRead: true,
    },
    {
      id: '5',
      senderId: 'sarah-chen',
      receiverId: 'current-user',
      content: 'Thanks so much! That would be really helpful.',
      type: 'text',
      timestamp: '14:36',
      isRead: true,
    },
    {
      id: '6',
      senderId: 'current-user',
      receiverId: 'sarah-chen',
      content: 'No problem! I\'ll share it in our study group chat.',
      type: 'text',
      timestamp: '14:38',
      isRead: true,
    },
  ],

  // Mike Johnson 的聊天记录
  'mike-johnson': [
    {
      id: '1',
      senderId: 'mike-johnson',
      receiverId: 'current-user',
      content: 'Want to grab coffee this weekend?',
      type: 'text',
      timestamp: 'Yesterday',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: 'mike-johnson',
      content: 'Sure! That sounds great. When are you free?',
      type: 'text',
      timestamp: 'Yesterday',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'mike-johnson',
      receiverId: 'current-user',
      content: 'How about Saturday afternoon? Around 2 PM?',
      type: 'text',
      timestamp: 'Yesterday',
      isRead: true,
    },
    {
      id: '4',
      senderId: 'current-user',
      receiverId: 'mike-johnson',
      content: 'Perfect! Let\'s meet at the campus coffee shop.',
      type: 'text',
      timestamp: 'Yesterday',
      isRead: true,
    },
    {
      id: '5',
      senderId: 'mike-johnson',
      receiverId: 'current-user',
      content: 'Great! See you there! ☕',
      type: 'text',
      timestamp: 'Yesterday',
      isRead: true,
    },
  ],

  // Emma Wilson 的聊天记录
  'emma-wilson': [
    {
      id: '1',
      senderId: 'emma-wilson',
      receiverId: 'current-user',
      content: 'Thanks for your help with the assignment!',
      type: 'text',
      timestamp: 'Monday',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: 'emma-wilson',
      content: 'You\'re welcome! How did it go?',
      type: 'text',
      timestamp: 'Monday',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'emma-wilson',
      receiverId: 'current-user',
      content: 'Really well! Got an A on it. Your tips were super helpful.',
      type: 'text',
      timestamp: 'Monday',
      isRead: true,
    },
    {
      id: '4',
      senderId: 'current-user',
      receiverId: 'emma-wilson',
      content: 'That\'s awesome! Congrats! 🎉',
      type: 'text',
      timestamp: 'Monday',
      isRead: true,
    },
  ],

  // David Kim 的聊天记录
  'david-kim': [
    {
      id: '1',
      senderId: 'david-kim',
      receiverId: 'current-user',
      content: 'When is our next group discussion?',
      type: 'text',
      timestamp: 'Last week',
      isRead: false,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: 'david-kim',
      content: 'I think it\'s scheduled for next Tuesday at 3 PM.',
      type: 'text',
      timestamp: 'Last week',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'david-kim',
      receiverId: 'current-user',
      content: 'Can you send me the meeting link?',
      type: 'text',
      timestamp: 'Last week',
      isRead: false,
    },
  ],

  // Lisa Park 的聊天记录
  'lisa-park': [
    {
      id: '1',
      senderId: 'lisa-park',
      receiverId: 'current-user',
      content: 'The study materials are ready to share.',
      type: 'text',
      timestamp: '2 hours ago',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: 'lisa-park',
      content: 'Perfect! Can you upload them to the shared drive?',
      type: 'text',
      timestamp: '2 hours ago',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'lisa-park',
      receiverId: 'current-user',
      content: 'Already done! Check the "Study Resources" folder.',
      type: 'text',
      timestamp: '2 hours ago',
      isRead: true,
    },
    {
      id: '4',
      senderId: 'current-user',
      receiverId: 'lisa-park',
      content: 'Thanks Lisa! You\'re the best! 📚',
      type: 'text',
      timestamp: '2 hours ago',
      isRead: true,
    },
  ],

  // Alex Thompson 的聊天记录
  'alex-thompson': [
    {
      id: '1',
      senderId: 'alex-thompson',
      receiverId: 'current-user',
      content: 'Great job on the presentation!',
      type: 'text',
      timestamp: '3 hours ago',
      isRead: false,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: 'alex-thompson',
      content: 'Thank you! It was a team effort though.',
      type: 'text',
      timestamp: '3 hours ago',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'alex-thompson',
      receiverId: 'current-user',
      content: 'Your part was really well done. The professor was impressed!',
      type: 'text',
      timestamp: '3 hours ago',
      isRead: false,
    },
    {
      id: '4',
      senderId: 'alex-thompson',
      receiverId: 'current-user',
      content: 'Check out this photo from the presentation!',
      type: 'image',
      timestamp: '3 hours ago',
      isRead: false,
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    },
  ],

  // Rachel Green 的聊天记录
  'rachel-green': [
    {
      id: '1',
      senderId: 'rachel-green',
      receiverId: 'current-user',
      content: 'Can you send me the notes from today?',
      type: 'text',
      timestamp: '5 hours ago',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: 'rachel-green',
      content: 'Of course! I\'ll scan and send them to you.',
      type: 'text',
      timestamp: '5 hours ago',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'rachel-green',
      receiverId: 'current-user',
      content: 'Thanks! You\'re a lifesaver.',
      type: 'text',
      timestamp: '5 hours ago',
      isRead: true,
    },
  ],

  // Tom Anderson 的聊天记录
  'tom-anderson': [
    {
      id: '1',
      senderId: 'tom-anderson',
      receiverId: 'current-user',
      content: 'Let\'s meet at the library tomorrow.',
      type: 'text',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: 'tom-anderson',
      content: 'Sure! What time works for you?',
      type: 'text',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'tom-anderson',
      receiverId: 'current-user',
      content: 'How about 10 AM? We can study together.',
      type: 'text',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '4',
      senderId: 'current-user',
      receiverId: 'tom-anderson',
      content: 'Perfect! See you there.',
      type: 'text',
      timestamp: '1 day ago',
      isRead: true,
    },
  ],

  // Study Group 群聊
  'study-group': [
    {
      id: '1',
      senderId: 'u1',
      receiverId: 'group:study-group',
      content: 'Hi everyone, let’s review chapter 3 tonight!',
      type: 'text',
      timestamp: '10:00',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'u2',
      receiverId: 'group:study-group',
      content: 'Sounds good! I’ll bring my notes.',
      type: 'text',
      timestamp: '10:01',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'u3',
      receiverId: 'group:study-group',
      content: 'Here is the summary from last time.',
      type: 'image',
      imageUrl: 'https://via.placeholder.com/150',
      timestamp: '10:02',
      isRead: true,
    },
    {
      id: '4',
      senderId: 'current-user',
      receiverId: 'group:study-group',
      content: 'Thanks everyone! See you at 8pm.',
      type: 'text',
      timestamp: '10:03',
      isRead: true,
    },
  ],
};
