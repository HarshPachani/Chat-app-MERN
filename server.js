import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js'
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { createServer } from 'http';
import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';
import cors from 'cors';
import corsOptions from './constants/config.js';
import { socketAuthenticator } from './middlewares/auth.js';
import { GROUP_USER_STOPPED_TYPING, GROUP_USER_TYPING, NEW_MESSAGE, NEW_MESSAGE_ALERT, ONLINE_USERS, ONLINE_USER_DELETE, START_TYPING, STOP_TYPING, ONLINE_USER_SET } from './constants/events.js';
import { v4 as uuid } from 'uuid';
import { getSockets } from './lib/helper.js';
import { Message } from './models/message.js';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({
    path: './.env'
})

connectDb()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = createServer(app);

const io = new Server(server, { cors: corsOptions });

app.set('io', io);

const userSocketIDs = new Map();
const onlineUsers = new Set();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/v1/user', userRoute)
app.use('/api/v1/chat', chatRoute)

io.use((socket, next) => {
    cookieParser()(
        socket.request, 
        socket.request.response, 
        async(err) => await socketAuthenticator(err, socket, next)
    );
});

io.on('connection', (socket) => {
    const user = socket.user;
    userSocketIDs.set(user._id.toString(), socket.id);
    onlineUsers.add(user._id.toString());

    socket.on(NEW_MESSAGE, async({ chatId, members, message }) => {
        const messageForRealTime = {
            _id: uuid(),
            content: message,
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString()
        }

        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        };

        const memberSockets = getSockets(members);
        io.to(memberSockets).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime,
        });

        io.to(memberSockets).emit(NEW_MESSAGE_ALERT, { chatId });

        try {
            await Message.create(messageForDB);
        } catch (error) {
            console.log(error.message);
        }
    });

    socket.on(START_TYPING, ({ members, chatId }) => {
        const membersSocket = getSockets(members);
        socket.to(membersSocket).emit(START_TYPING, { chatId });
    });
    
    socket.on(STOP_TYPING, ({ members, chatId }) => {
        const membersSocket = getSockets(members);
        socket.to(membersSocket).emit(STOP_TYPING, { chatId });
    });

    socket.on(ONLINE_USERS, () => {
        io.emit(ONLINE_USERS, Array.from(onlineUsers));
    });

    socket.on(ONLINE_USER_SET, ({ userId }) => {
        onlineUsers.add(userId?.toString());
        io.emit(ONLINE_USERS, Array.from(onlineUsers));
    });

    socket.on(ONLINE_USER_DELETE, ({ userId }) => {
        onlineUsers.delete(userId.toString());
        socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
    });
    
    socket.on(GROUP_USER_TYPING, ({ userId, username, chatId }) => {
        socket.broadcast.emit(GROUP_USER_TYPING, { userId, username, chatId });
    })

    socket.on(GROUP_USER_STOPPED_TYPING, () => {
        socket.broadcast.emit(GROUP_USER_STOPPED_TYPING, 'Typing');
    })
    
    socket.on('disconnect', () => {
        userSocketIDs.delete(user._id.toString());
        onlineUsers.delete(user._id.toString());
        socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
    });
});

app.use(errorMiddleware);

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})

export { userSocketIDs, onlineUsers }