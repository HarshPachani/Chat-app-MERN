import React from 'react'
import { Box, Typography } from '@mui/material';
import AppLayout from '../components/AppLayout'
import { gray } from '../constants/color';
import ChatList from '../components/ChatList';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <Box height='100%' bgcolor={gray} sx={{
      display: { sm: 'flex', xs: 'none' },
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Typography variant='h4' textAlign={'center'}>
        Welcome { user.username }
      </Typography>

      <Typography p='2rem' variant='h5' textAlign={'center'}>
        Select a friend to Chat
      </Typography>
    </Box>
    // <ChatList />
  )
}

export default AppLayout()(Home)