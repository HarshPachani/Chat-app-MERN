import React from 'react'
import Title from '../shared/Title'
import SideBar from './SideBar'
import { Box } from '@mui/material'
import { gray } from '../constants/color'
import ChatList from './ChatList'
import { useParams } from 'react-router-dom';
import { sampleMessage } from '../constants/sampleData'

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const chatId = 1;
        const user = {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Doe",
            _id: "1",
        }
        return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row'},
                    backgroundColor: gray
                }}
            >
                <Title />
                <SideBar />
                <ChatList />
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

export default AppLayout
