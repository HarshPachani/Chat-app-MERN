import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { gray, white } from '../constants/color'
import { useMyChatsQuery } from '../redux/api/api'

const ChatListLayout = () =>  (WrappedComponent) => {
    return (props) => {
      const location = window.location.href;
      const isHome = location.includes('/chat');

      const { isLoading, data , isError, error, refetch } = useMyChatsQuery();

        return (
            <Box
              sx={{
                // display: isHome ? 'none' : 'flex',
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid black',
                width: { xs: '100%', sm: '30%' }
              }}
              >
              <Box
                  sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginBottom: '5px',
                      backgroundColor: white,
                      borderRadius: '20px'
                  }}
                  margin={'5px'}
              >
                  <Typography variant='h5'>Chats</Typography>
                  <TextField 
                      sx={{
                          borderRadius: '20px',
                          backgroundColor: white
                      }}
                  />
              </Box>
              <WrappedComponent 
                  {...props} 
                  chatId={'2'} 
                  chats = {[]}
              />
          </Box>
        )
  }
}

export default ChatListLayout