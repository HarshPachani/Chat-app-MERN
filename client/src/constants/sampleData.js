export const SampleChats = [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
      _id: "1",
      groupChat: true,
      // groupChat: false,
      groupId : '321',
      members: ["1", "2"],
    },
    {
      avatar: [
        "https://www.w3schools.com/howto/img_avatar.png",
        'https://www.w3schools.com/howto/img_avatar.png',
        'https://www.w3schools.com/howto/img_avatar.png',
        'https://www.w3schools.com/howto/img_avatar.png',
      ],
      name: "John Foe",
      _id: "2",
      groupId : '123',
      groupChat: true,
      // groupChat: false,
      members: ["1", "2"],
    },
  ];
  
  export const sampleUsers = [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
      _id: "1",
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Foe",
      _id: "2",
    },
  ];
  
  export const sampleNotifications = [
    {
      sender: {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Doe",
      },
      _id: "1",
    },
    {
      sender: {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Foe",
      },
      _id: "2",
    },
  ];
  
  export const sampleMessage = [
    {
      attachments: [
        {
          public_id: "asdsad",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Test Message",
      _id: "dkaldaljdljldkalajlkjfafaadf",
      sender: {
        _id: "user._id",
        name: "Test",
      },
      chat: "1",
      createdAt: "2024-02-12T10:41:30.360Z",
      sameSender: true,
    },
    {
      attachments: [
        {
          public_id: "asdsad",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Test Message 2",
      _id: "dkaldaljdljldkalajlkjf",
      sender: {
        _id: "sdfsdfsdf",
        name: "Test2",
      },
      chat: "2",
      sameSender: false,
      createdAt: "2024-04-24T10:41:30.360Z",
    },
    {
      content: "Hey there!",
      _id: "dkaldaljdljldkalajlkjf",
      sender: {
        _id: "sdfsdfsdf",
        name: "Test2",
      },
      chat: "2",
      createdAt: "2024-04-24T10:41:30.360Z",
      sameSender: false,
    },
    {
      content: "I am using Your app",
      _id: "dkaldaljdljldkalajlkjf",
      sender: {
        _id: "sdfsdfsdf",
        name: "Test2",
      },
      chat: "1",
      sameSender: true,
      createdAt: "2024-04-24T10:41:30.360Z",
    },
    {
      content: "Testing frontend",
      _id: "dkaldaljdljldkalajlkjf",
      sender: {
        _id: "sdfsdfsdf",
        name: "Test2",
      },
      chat: "1",
      createdAt: "2024-04-24T10:41:30.360Z",
    sameSender: true,
    }
  ];
  
  
  export const dashboardData = {
    users: [{
      name: 'Harsh',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      _id: 1,
      username: 'harsh',
      friends: 20,
      groups: 5,
    },
    {
      name: 'John Doe',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      _id: 2,
      username: 'john_doe',
      friends: 20,
      groups: 25,
    },
    ],
    chats: [{
      name: 'Test group',
      avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
      _id: '1',
      groupChat: false,
      members: [
        { _id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
        { _id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: 'John Doe',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    },
    {
      name: 'Test group 2',
      avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
      _id: '2',
      groupChat: true,
      members: [
        { _id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
        { _id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: 'John Boi',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    },
    ], 
    messages: [
      {
        attachments: [],
        content: 'Test Message',
        _id: 'adjfalkjfldjflk',
        sender: {
          avatar: 'https://www.w3schools.com/howto/img_avatar.png',
          name: 'Chaman',
        },
        chat: 'chatId',
        groupChat: false,
        createdAt: '2024-04-27T10:41:30.630Z'
      },
      {
        attachments: [
          {
            public_id: 'aldjljl 2',
            url: 'https://www.w3schools.com/howto/img_avatar.png'
          }
        ],
        content: 'Test Message 2',
        _id: 'adjfalkjfldjflkkjgdlj',
        sender: {
          avatar: 'https://www.w3schools.com/howto/img_avatar.png',
          name: 'Chaman 2',
        },
        chat: 'chatId',
        groupChat: true,
        createdAt: '2024-04-27T10:41:30.630Z'
      },
    ]
  }