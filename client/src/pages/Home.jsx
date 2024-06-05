import React from 'react'
import { Box, Typography } from '@mui/material';
import AppLayout from '../components/AppLayout'
import { gray } from '../constants/color';
import ChatList from '../components/ChatList';

const Home = () => {
  return (
    <Box height='100%' bgcolor={gray} sx={{
      display: { sm: 'flex', xs: 'none' }
    }}>
      <Typography p='2rem' variant='h5' textAlign={'center'}>
        Select a friend to Chat
      </Typography>
    </Box>
    // <ChatList />
  )
}

export default AppLayout()(Home)