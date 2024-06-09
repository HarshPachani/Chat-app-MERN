import React, { useCallback, useEffect } from 'react'
import Title from '../shared/Title'
import SideBar from './SideBar'
import { Box, TextField, Typography } from '@mui/material'
import { gray } from '../constants/color'
import ChatList from './ChatList'
import { useParams } from 'react-router-dom';
import { sampleMessage } from '../constants/sampleData'
import { useMyChatsQuery } from '../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../context/socket';
import { useSocketEvents } from '../hooks/Hook'
import { NEW_MESSAGE_ALERT } from '../constants/events'
import { setNewMessagesAlert } from '../redux/reducers/chat.js'
import { getOrSaveFromStorage } from '../lib/features'

const appLayout = () => (WrappedComponent) => {
    return (props) => {

        const { user } = useSelector(store => store.auth);
        const { newMessageAlert } = useSelector(store => store.chat);

        
        const location = window.location.href;
        const isHome = location.includes('/chat');
        
        const params = useParams();
        const socket = useSocket();
        const dispatch = useDispatch();

        const chatId = params.id;
        
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery('');

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
        }, [newMessageAlert]);

        const newMessageAlertListener = useCallback((data) => {
            if(data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [chatId]);
        
        
        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,

        };

        useSocketEvents(socket, eventHandlers);

        return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row'},
                    backgroundColor: gray,
                    // overflow: 'none',
                    // height: '100%'
                }}
            >
                <Title />
                <SideBar />
                <ChatList chats={data?.chats} newMessagesAlert={newMessageAlert} />
                <WrappedComponent 
                    {...props}
                    chatId={chatId} 
                    user={user}
                    chats={sampleMessage} 
                />
            </Box>
        </>
        )
    }
}

export default appLayout
