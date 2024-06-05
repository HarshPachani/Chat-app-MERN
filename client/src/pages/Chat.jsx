import React from 'react'
import AppLayout from '../components/AppLayout'
import { Box, TextField, Typography } from '@mui/material'
import { white } from '../constants/color'
import ChatItem from '../shared/ChatItem'
import AvatarCard from '../shared/AvatarCard'

const Chat = ({ chatId, user, chats=[] }) => {
  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid black'
        }}
        width={'70%'}
    >
        <Box
            sx={{
                display: 'flex',
                backgroundColor: white,
                borderRadius: '15px',
                padding: '5px'
            }}
            margin={'5px'}
        >
            <AvatarCard avatar={user.avatar}/>
            <Box>
                <Typography variant='h5'>{user.name}</Typography>
                <span>online</span>
            </Box>
        </Box>
    </Box>
  )
}

export default AppLayout()(Chat)