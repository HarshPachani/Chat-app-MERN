import { TryCatch } from "../middlewares/error.js"
import { User } from '../models/user.js';
import { Chat } from '../models/chat.js';
import { Request } from '../models/request.js';
import { cookieOptions, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { compare } from 'bcrypt';
import { getOtherMember } from "../lib/helper.js";

const newUser = TryCatch(async(req, res, next) => {
  const { name, username, password, bio } = req.body;

  const isExists = await User.findOne({ username });
  if(isExists) 
    return next(new ErrorHandler('Username already Exists!', 400));

  const user = await User.create({ name, username, password, bio });

  sendToken(res, user, 201, 'User Created Successfully!');
});

const login = TryCatch(async(req, res, next) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username }).select('+password');
  if(!user)
    return next(new ErrorHandler('Invalid Username or Password!', 400));
  
  const isPasswordMatch = await compare(password, user.password);
  if(!isPasswordMatch)
    return next(new ErrorHandler('Invalid Username or Password!', 400));

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});

const getMyProfile = TryCatch(async(req, res, next) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async(req, res, next) => {
  res.status(200)
  .cookie('token', '', { ...cookieOptions, maxAge: 0 })
  .json({
    success: true,
    message: "Logged out successfully",
  });
});

const searchUser = TryCatch(async(req, res, next) => {
  const { name = '' } = req.query;
  const myChats = await Chat.find({ groupChat: false, members: req.user });

  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  const query = {
    $and: [
      { _id: { $nin: [req.user, ...allUsersFromMyChats] } },
      { name: { $regex: name.trim(), $options: 'i' } }
    ]
  }

  const allUsersExceptMeAndFriends = await User.find(query);

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar?.url,
  }));

  res.status(200)
  .json({
    success: true,
    users,
  });
});

const searchFriends = TryCatch(async(req, res, next) => {
  const { name = '' } = req.query;
  const myChats = await Chat.find({ groupChat: false, members: req.user });

  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);
  
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats, $nin: req.user },
    name: { $regex: name.trim(), $options: 'i' },
  })

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar?.url,
  }));

  res.status(200)
  .json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async(req, res, next) => {
  const { userId } = req.body;

  const query = {
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ]
  }
  const request = await Request.findOne(query) ;

  if (request) return next(new ErrorHandler('Request already sent', 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  })

  return res.status(200).json({
    success: true,
    message: "Friend Request Sent successfully",
  });
});

const acceptFriendRequest = TryCatch(async(req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
      .populate('sender', 'name')
      .populate('receiver', 'name');

  if(!request)  return next(new ErrorHandler('Request not found', 400));

  if(request.receiver._id.toString() !== req.user.toString())
    return next(new ErrorHandler('You are not authorized to accept this Request', 401));

  if(!accept) {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Friend Request Rejected',
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({ 
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne()
  ]);

  return res.status(200).json({
    success: true,
    message: 'Friend Request Accepted successfully',
  });
});

const allNotifications = TryCatch(async(req, res, next) => {
  const requests = await Request.find({ receiver: req.user }).populate('sender', 'name avatar');

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar?.url,
    }
  }));

  return res.status(200).json({
    success: true,
    allRequests
  });
});

const getMyFriends = TryCatch(async(req, res, next) => {
  const { chatId } = req.query;
  const chats = await Chat.find({ members: req.user, groupChat: false }).populate('members', 'name avatar');
  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);
    return {
        _id: otherUser?._id,
        name: otherUser?.name,
        avatar: otherUser?.avatar?.url,
    }
  });

  if(chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter(friend => chat.members.includes(friend._id));
    return res.status(200).json({
        success: true,
        friends: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }

});

export {
  login,
  logout,
  newUser,
  searchUser,
  getMyProfile,
  searchFriends,
  sendFriendRequest,
  acceptFriendRequest,
  allNotifications,
  getMyFriends,
}