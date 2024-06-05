import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { gray, white } from '../constants/color'

const ChatListLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: '1px solid black'
                }}
                width={'30%'}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginBottom: '5px',
                        backgroundColor: white,
                    }}
                    margin={'5px'}
                >
                    <Typography variant='h5'>Chats</Typography>
                    <TextField 
                        sx={{
                            borderRadius: '15px'
                        }}
                    />
                </Box>
                <WrappedComponent 
                    {...props} 
                    chatId={'1'} 
                />
            </Box>
        </>
    )
  }
}

export default ChatListLayout