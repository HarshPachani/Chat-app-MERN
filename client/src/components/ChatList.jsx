import React from 'react'
import { Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem'
import { white } from '../constants/color'
import ChatListLayout from './ChatListLayout'
import { useParams } from 'react-router-dom'
import { Box, Typography, TextField } from '@mui/material';
import { useMyChatsQuery } from '../redux/api/api'

const ChatList = ({
    w = '30%',
    chats = [],
    // chatId,
    onlineUsers = [],
}) => {
    const params = useParams();
    const chatId = params?.id;

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
                    
            <Stack 
                // width={w} 
                direction={'column'}
                sx={{ 
                    overflow: 'auto', 
                    height: '100%', 
                    backgroundColor: white, 
                    borderRadius: '20px',
                    marginRight: '5px',
                    border: `2px solid ${white}`,
                    position: 'sticky',
                    top: 0
                }}
            >
                {
                    chats?.map((data, index) => {
                        const { avatar, _id, name, groupChat, members } = data;
                        return (
                            <ChatItem
                                key={_id}
                                index={index}
                                // newMessageAlert={newMessageAlert}
                                // isOnline={isOnline}
                                avatar={avatar}
                                name={name}
                                _id={_id}
                                groupChat={groupChat}
                                sameSender={chatId === _id}
                                // handleDeleteChat={handleDeleteChat}
                            />
                        )
                    })
                }
            </Stack>
          </Box>
  )
}

export default ChatList;