import React, { useEffect } from 'react'
import Title from '../shared/Title'
import SideBar from './SideBar'
import { Box, TextField, Typography } from '@mui/material'
import { gray } from '../constants/color'
import ChatList from './ChatList'
import { useParams } from 'react-router-dom';
import { sampleMessage } from '../constants/sampleData'
import { useMyChatsQuery } from '../redux/api/api'
import { useSelector } from 'react-redux'

const appLayout = () => (WrappedComponent) => {
    return (props) => {

        const { user } = useSelector(store => store.auth);
        
        const location = window.location.href;
        const isHome = location.includes('/chat');
        
        const params = useParams();
        const chatId = params.id;
        
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery('');
        
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
                <ChatList chats={data?.chats}/>
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
