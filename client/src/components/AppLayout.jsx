import React, { useCallback, useEffect, useRef, useState } from 'react'
import Title from '../shared/Title'
import SideBar from './SideBar'
import { Box } from '@mui/material'
import { gray } from '../constants/color'
import ChatList from './ChatList'
import { useNavigate, useParams } from 'react-router-dom';
import { sampleMessage } from '../constants/sampleData'
import { useMyChatsQuery } from '../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../context/socket';
import { useSocketEvents } from '../hooks/Hook'
import { CHAT_JOINED, NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, ONLINE_USER_DELETE, ONLINE_USER_SET, REFETCH_CHATS } from '../constants/events'
import { incrementNotification, setNewMessagesAlert, setNewMessageCount } from '../redux/reducers/chat.js'
import { getOrSaveFromStorage } from '../lib/features'
import { setIsDeleteMenu, setSelectedDeleteChat } from '../redux/reducers/misc.js'
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx'

const appLayout = () => (WrappedComponent) => {
    return (props) => {

        const { user } = useSelector(store => store.auth);
        const { newMessageAlert, newMessagesCount } = useSelector(store => store.chat);

        const [onlineUsers, setOnlineUsers] = useState([]);
        
        const params = useParams();
        const socket = useSocket();
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const chatId = params.id;
        const deleteMenuAnchor = useRef(null);
        
        const { data, isLoading, refetch } = useMyChatsQuery('');

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
            dispatch(setNewMessageCount())
        }, [newMessageAlert, dispatch]);

        useEffect(() => {
            refetch();
            socket.emit(CHAT_JOINED, { userId: user._id });
          }, [user?.user, refetch, socket, user._id]);      

        useEffect(() => {
            socket.emit(ONLINE_USER_SET, {userId: user?._id});
            return () => socket.emit(ONLINE_USER_DELETE, { userId: user._id });
        }, []);

        const handleDeleteChat = (e, _id, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }));
            deleteMenuAnchor.current = e.currentTarget;
        }

        const newMessageAlertListener = useCallback((data) => {
            if(data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [chatId, dispatch]);

        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, [chatId]);

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch]);

        const refetchListener = useCallback((data) => {
            refetch();
            navigate('/');
        }, [refetch, navigate]);
        
        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [ONLINE_USERS]: onlineUsersListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
        };

        useSocketEvents(socket, eventHandlers);

        return (
        <Box
                sx={{
                    display: 'flex',
                    position: {xs: 'relative', sm: 'fixed' },
                    flexDirection: { xs: 'column-reverse', sm: 'row'},
                    backgroundColor: gray,
                    height: '100%',
                    width: '100%'
                }}
        >
            <Title newMessagesCount={newMessagesCount} />
            <SideBar chatId={chatId} />
            <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
            <ChatList 
                chats={data?.chats} 
                newMessagesAlert={newMessageAlert} 
                onlineUsers={onlineUsers}
                user={user}
                isLoading={isLoading}
            />
            <WrappedComponent 
                {...props}
                chatId={chatId} 
                user={user}
                handleDeleteChat={handleDeleteChat}
            />
        </Box>)
    }
}

export default appLayout
