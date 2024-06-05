import React from 'react'
import { Stack } from '@mui/material'
import { SampleChats } from '../constants/sampleData'
import ChatItem from '../shared/ChatItem'
import { white } from '../constants/color'
import ChatListLayout from './ChatListLayout'
import { useParams } from 'react-router-dom'

const ChatList = ({
    w = '30%',
    chats = SampleChats,
    // chatId,
    onlineUsers = [],
}) => {
    const params = useParams();
    const chatId = params?.id;

  return (
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
  )
}

export default ChatListLayout()(ChatList);