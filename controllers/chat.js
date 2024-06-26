import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import { ErrorHandler } from "../utils/utility.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from "../utils/features.js";
import { ALERT, NEW_MESSAGE, NEW_MESSAGE_ALERT, REFETCH_CHATS, REFETCH_GROUP_CHAT_LIST, REFETCH_GROUP_CHAT_MEMBERS } from "../constants/events.js";
import mongoose from "mongoose";

const newGroupChat = TryCatch(async (req, res, next) => {
    const { name, members } = req.body;
  
    const allMembers = [...members, req.user];
    await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      members: allMembers,
    });
    emitEvent(req, ALERT, allMembers, `Welcome to ${name} GROUP`);
    emitEvent(req, REFETCH_CHATS, allMembers);
  
    return res.status(201).json({
      success: true,
      message: "Group Created",
    });
});

const getMyChats = TryCatch(async(req, res, next) => {
    const chats = await Chat.find({ members: req.user }).populate('members', 'name avatar');
    
    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
        const otherMember = getOtherMember(members, req.user);
        
        return {
            _id,
            groupChat,
            avatar: groupChat ? members.slice(0, 3).map(({ avatar }) => avatar?.url) : [otherMember?.avatar?.url],
            name: groupChat ? name : otherMember?.name,
            members: members.reduce((prev, curr) => {
                if(curr._id.toString() !== req.user.toString()) {
                    prev.push(curr._id);
                }
                return prev;
            }, [])
        }
    });
    return res.status(200).json({
        success: true,
        chats: transformedChats,
    });
});

const sendAttachments = TryCatch(async(req, res, next) => {
    const { chatId } = req.body;
    const files  = req.files || [];

    if(files.length < 1) 
        return next(new ErrorHandler('Please Upload Attachments', 400));
    
    if(files.length > 2) 
        return next(new ErrorHandler('Files can\'t be more than 5', 400));

    const [chat, me] = await Promise.all([
        Chat.findById(chatId),
        User.findById(req.user, 'name')
    ])

    if(!chat)
        return next(new ErrorHandler('Chat not found', 404));

    const attachmentsLimit = await Message.find({ sender: req.user, attachments: { $ne: [] }});
    if(attachmentsLimit?.length >= 3) {
        return res.status(400).json({ success: false, message: 'You have exceed your Attachment uploading limit'});
    }

    //uploads files
    const attachments = await uploadFilesToCloudinary(files);
    
    const messageForDB = {
        content: '',
        attachments,
        sender: me._id,
        chat: chatId
    }

    const messageForRealTime = {
        ...messageForDB,
        sender: {
            _id: me._id,
            name: me.name,
        }
    }

    const message = await Message.create(messageForDB);

    emitEvent(req, NEW_MESSAGE, chat.members, {
        message: messageForRealTime,
        chatId,
    });

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });
    
    return res.status(200).json({
        success: true,
        message,
    })
});

const getMyGroups = TryCatch(async(req, res, next) => {
    const chats = await Chat.find({ members: req.user, groupChat: true, creator: req.user  }).populate('members', 'name avatar');
    
    const groups = chats?.map(({ members, _id, groupChat, name }) => ({
        _id, groupChat, name, avatar: members.slice(0, 3).map(({ avatar }) => avatar?.url), 
    }));

    return res.status(200).json({
        success: true,
        groups,
    })
});

const addMembers = TryCatch(async(req, res, next) => {
    const { chatId, members } = req.body;

    if(!members || members.length < 1)
        return next(new ErrorHandler('Please Provide members', 400))

    const chat = await Chat.findById(chatId);
    if(!chat)
        return next(new ErrorHandler('Chat not found', 404));
    
    if(!chat.groupChat)
        return next(new ErrorHandler('This is not a group chat', 404));
    
    if(chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler('You are not allowed to add members', 403));

    const allNewMembersPromise = members.map(member => User.findById(member, 'name'));
    const allNewMembers = await Promise.all(allNewMembersPromise);
    
    const uniqueMembers = allNewMembers.filter((member) => !chat.members.includes(member._id.toString())).map(member => member._id);

    chat.members.push(...uniqueMembers);

    
    if(chat.members.length > 100)
        return next(new ErrorHandler('Group members limit reached', 400));

    await chat.save();

    const allUserName = allNewMembers.map((i) => i.name).join(',');

    emitEvent(req, ALERT, chat.members, `${allUserName} has been added in the group`);

    const allMembersExceptAdmin = chat.members.filter(member => member._id.toString() !== req.user.toString());

    emitEvent(req, REFETCH_CHATS, allMembersExceptAdmin);
    emitEvent(req, REFETCH_GROUP_CHAT_MEMBERS, [req.user.toString()]);

    return res.status(200).json({
        success: true,
        message: 'Members added successfully'
    })
});

const removeMembers = TryCatch(async(req, res, next) => {
    const { userId, chatId } = req.body;
    
    const [chat, userThatWillBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId, 'name')
    ]);
    
    if(!chat)
        return next(new ErrorHandler('Chat not found', 404));

    if(!chat.groupChat)
        return next(new ErrorHandler('This is not a group chat', 404));

    if(chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler('You are not allowed to remove members', 403));

    if(chat.members.length <= 3) 
        return next(new ErrorHandler('Group must have at least 3 members', 400));

    const allChatMembers = chat.members.map(i => i.toString());

    chat.members = chat.members.filter((member) => member.toString() !== userId.toString());

    const remainingMembers = chat.members.filter(member => member.toString() !== req.user.toString());
    if(chat.creator.toString() === userId.toString()) {
        const newCreator = remainingMembers[0];
        chat.creator = newCreator;
    }

    await chat.save();

    emitEvent(
        req,
        ALERT,
        chat.members,
        {
            message: `${userThatWillBeRemoved.name} has been removed from the group`,
            chatId,
        }
    );

    const allMembersExceptAdmin = chat.members.filter(member => member._id.toString() !== req.user.toString());
    
    emitEvent(req, REFETCH_CHATS, [...allMembersExceptAdmin, userThatWillBeRemoved?._id]);    
    emitEvent(req, REFETCH_GROUP_CHAT_MEMBERS, [req.user.toString()]);


    return res.status(200).json({
        success: true,
        message: 'Member removed successfully',
    })
});

const leaveGroup = TryCatch(async(req, res, next) => {
    const { id: chatId } = req.params;
    const chat = await Chat.findById(chatId);

    
    if(!chat)
        return next(new ErrorHandler('Chat not found', 404));
    
    if(!chat.groupChat) 
        return next(new ErrorHandler('This is not a group Chat', 400));

    const remainingMembers = chat.members.filter(member => member.toString() !== req.user.toString());

    
    if(remainingMembers.length < 3)
        return next(new ErrorHandler('Group must have at least 3 members', 400));

    if(chat.creator.toString() === req.user.toString()) {
        const newCreator = remainingMembers[0];
        chat.cretor = newCreator;
    }

    chat.members = remainingMembers;

    const user = await Promise.all([
        User.findById(req.user, 'name'),
        chat.save()
    ]);

    return res.status(200).json({
        success: true,
        message: 'Leave Group successfully',
    })
})

const getMessages = TryCatch(async(req, res, next) => {
    const { id: chatId } = req.params;
    const { page = 1, totalMessages=0 } = req.query;
    const limit = 10;
    const skip = parseInt(totalMessages);

    const chat = await Chat.findById(chatId);

    if(!chat) return next(new ErrorHandler('Chat not found', 404));

    if(!chat.members.includes(req.user.toString()))
        return next(new ErrorHandler('You are not allowed to access this chat'), 403);

    let query = { chat: chatId };
    
    const [messages, totalMessagesCount] = await Promise.all([
        Message.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('sender', 'name')
        .lean(),
        Message.countDocuments({ chat: chatId })
    ]);

    const totalPages = Math.ceil(totalMessagesCount / limit) || 0;

    return res.status(200).json({
        success: true,
        messages: messages.reverse(),
        totalPages,
    })
});

const getChatDetails = TryCatch(async(req, res, next) => {
    const { id: chatId } = req.params;

    if(req.query.populate === "true") {
        const chat = await Chat.findById(chatId).populate('members', 'name avatar').lean();
        if(!chat)
            return next(new ErrorHandler('Chat not found', 404));
        
        chat.members = chat.members.map(({ _id, name, avatar }) => ({
            _id, name, avatar: avatar?.url,
        }));

        return res.status(200).json({
            success: true,
            chat,
        });
    } else {
        const chat = await Chat.findById(chatId);
        if(!chat)
        return next(new ErrorHandler('Chat not found', 404));
    
        return res.status(200).json({
            success: true,
            chat,
        });   
    }
});

const renameGroup = TryCatch(async(req, res, next) => {
    const { id: chatId }= req.params;
    const { name } = req.body;
    const chat = await Chat.findById(chatId);
    if(!chat)
        return next(new ErrorHandler('Chat not found', 404))
    
    if(!chat.groupChat)
        return next(new ErrorHandler('This is not a group Chat', 400))

    if(chat.creator.toString() !== req.user.toString())
        return next(
            new ErrorHandler('You are not allowed to rename the group', 403)
        );

    chat.name = name;
    await chat.save();

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: 'Group renamed successfully',
    });
});

const deleteChat = TryCatch(async(req, res, next) => {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);
    if(!chat)
        return next(new ErrorHandler('Chat not found', 404))
    
    const members = chat.members;
    if(chat.groupChat && chat.creator.toString() !== req.user.toString()) {
        return next(new ErrorHandler('You are not allowed to delete the group', 403));
    }
    
    if(!chat.groupChat && !chat.members.includes(req.user.toString())) {
        return next(new ErrorHandler('You are not allowed to delete the group', 403));
    }

    //Here we have to delete all messages as well as attachments or files from cloudinary.
    const messagesWithAttachments = await Message.find({ 
        chat: chatId, 
        attachments: { $exists: true, $ne: [] },
    });

    if(messagesWithAttachments?.length > 0) {
        const public_ids = [];
    
        messagesWithAttachments.forEach(({ attachments }) =>
            attachments.forEach(({ public_id }) => public_ids.push(public_id))
        );

        await Promise.all([
            //Delete files from cloudinary
            deleteFilesFromCloudinary(public_ids),
            chat.deleteOne(),
            Message.deleteMany({ chat: chatId }),
        ]);
    } else {
        await Promise.all([
            chat.deleteOne(),
            Message.deleteMany({ chat: chatId }),
        ]);
    }

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: 'Chat deleted successfully',
    });
});

const getOtherChatMember = TryCatch(async(req, res, next) => {
    const { id } = req.params;

    const chat = await Chat.findById(id).populate('members', 'avatar name');

    const otherMember = chat.members.filter(member => member._id.toString() !== req.user.toString());
    
    if(!chat)
        return next(new ErrorHandler('Chat Not Found', 400));

    const chatName = chat?.groupChat ? chat?.name : otherMember[0]?.name;

    return res.status(200).json({
        success: true,
        chatName,
        isGroupChat: chat?.groupChat,
        chatAvatar: otherMember,
    });
});

export { 
    newGroupChat,
    getMyChats,
    sendAttachments,
    getMyGroups,
    addMembers,
    removeMembers,
    leaveGroup,
    getMessages,
    getChatDetails,
    renameGroup,
    deleteChat,
    getOtherChatMember,
}