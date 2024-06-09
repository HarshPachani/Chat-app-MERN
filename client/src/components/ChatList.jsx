import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem'
import { white } from '../constants/color'
import ChatListLayout from './ChatListLayout'
import { useParams } from 'react-router-dom'
import { Box, Typography, TextField } from '@mui/material';
import { useMyChatsQuery } from '../redux/api/api'
import { InputBox } from '../styles/StyledComponents'

const ChatList = ({
    w = '30%',
    chats = [],
    // chatId,
    newMessagesAlert = [
        {
          chatId: "",
          count: 0,
        },
    ],
    onlineUsers = [],
}) => {
    const params = useParams();
    const chatId = params?.id;

    const [search, setSearch] = useState('');
    const [userChats, setUserChats] = useState([]);

    useEffect(() => {
        setUserChats(chats);
    }, [chats])

    useEffect(() => {
        if(search.trim() === '') {
            setUserChats(chats);
        }
    }, [search]);


    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if(search.trim() == '') {
            setUserChats(chats);
            return
        }
        chats = chats.filter(chat => chat.name.includes(search.trim()));
        setUserChats(chats);
    }



  return (
    <Box
        sx={{
            // display: isHome ? 'none' : 'flex',
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid black',
            width: { xs: '100%', sm: '30%' },
            // height: '100%',
            // overflow: 'scroll',

        }}
    >
                
        <Box
            //   sx={{
            //   marginBottom: '5px',
            //   borderRadius: '20px'
            //   }}
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: white,
                borderRadius: '15px',
                padding: '5px',
                position: 'sticky',
                top: 0
            }}
            margin={'5px'}
        >
            <Typography variant='h5'>Chats</Typography>
            <InputBox 
                placeholder="Search Friends..."
                value={search}
                onChange={handleSearchChange}
            />
        </Box>
                    
        <Stack 
            // width={w} 
            direction={'column'}
            sx={{ 
                height: '100%', 
                overflow: 'scroll', 
                backgroundColor: white, 
                borderRadius: '20px',
                marginRight: '5px',
                border: `2px solid ${white}`,
                position: 'sticky',
                top: 0
            }}
        >
            {
                userChats?.map((data, index) => {
                const { avatar, _id, name, groupChat, members } = data;
                const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id )
                console.log(newMessageAlert, newMessagesAlert);
                return (
                    <ChatItem
                        key={_id}
                        index={index}
                        newMessageAlert={newMessageAlert}
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