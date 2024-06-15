import React, { useCallback, useEffect, useState } from 'react'
import Title from '../shared/Title'
import SideBar from './SideBar'
import { Box, TextField, Typography } from '@mui/material'
import { gray } from '../constants/color'
import ChatList from './ChatList'
import { useNavigate, useParams } from 'react-router-dom';
import { sampleMessage } from '../constants/sampleData'
import { useMyChatsQuery } from '../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../context/socket';
import { useSocketEvents } from '../hooks/Hook'
import { CHAT_JOINED, NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, ONLINE_USER_DELETE, REFETCH_CHATS } from '../constants/events'
import { incrementNotification, setNewMessagesAlert, setNewMessageCount } from '../redux/reducers/chat.js'
import { getOrSaveFromStorage } from '../lib/features'

const appLayout = () => (WrappedComponent) => {
    return (props) => {

        const { user } = useSelector(store => store.auth);
        const { newMessageAlert } = useSelector(store => store.chat);

        const [onlineUsers, setOnlineUsers] = useState([]);
        
        const params = useParams();
        const socket = useSocket();
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const chatId = params.id;
        
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery('');

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
            dispatch(setNewMessageCount())
        }, [newMessageAlert]);

        useEffect(() => {
            refetch();
            socket.emit(CHAT_JOINED, { userId: user._id });
          }, [user?.user]);      

        useEffect(() => {
            socket.emit(ONLINE_USERS, {});
            return () => socket.emit(ONLINE_USER_DELETE, { userId: user._id });
        }, []);

        const newMessageAlertListener = useCallback((data) => {
            if(data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [chatId]);

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
                    // position: 'fixed',
                    position: {xs: 'relative', sm: 'fixed' },
                    flexDirection: { xs: 'column-reverse', sm: 'row'},
                    backgroundColor: gray,
                    // overflow: 'none',
                    height: '100%',
                    width: '100%'
                }}
            >
                <Title />
                <SideBar chatId={chatId} />
                <ChatList 
                    chats={data?.chats} 
                    newMessagesAlert={newMessageAlert} 
                    onlineUsers={onlineUsers}
                    user={user}
                />
                <WrappedComponent 
                    {...props}
                    chatId={chatId} 
                    user={user}
                    chats={sampleMessage} 
                />
        </Box>)
    }
}

export default appLayout
