import { Avatar, Box, Tooltip, Typography, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { white } from '../constants/color'
import { useNavigate, useParams } from 'react-router-dom'
import { KeyboardBackspace as KeyboardBackspaceIcon } from '@mui/icons-material'
import AvatarCard from '../shared/AvatarCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSocketEvents } from '../hooks/Hook'
import { ONLINE_USERS } from '../constants/events'

const ChatHeader = ({ socket, chatMemberDetails, handleDeleteChat }) => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params?.id;
    const [isOnline, setIsOnline] = useState(false);
    const [onlineUserList, setOnlineUserList] = useState([]);

    const onlineUserListener = useCallback((data) => {
        setOnlineUserList(data);
    }, [chatMemberDetails]);

    useEffect(() => {
        if (chatMemberDetails) {
            const userId = chatMemberDetails?.chatAvatar?.[0]?._id;
            const isUserOnline = onlineUserList.includes(userId);
            setIsOnline(isUserOnline);
        }
    }, [chatMemberDetails, onlineUserList]);

    const eventHandlers = {
        [ONLINE_USERS]: onlineUserListener,
    }

    useEffect(() => {
        socket.emit(ONLINE_USERS, {});
    }, []);

    useSocketEvents(socket, eventHandlers);


    const navigateBack = () => navigate('/')

  return (
    <Box
        sx={{
            display: 'flex',
            backgroundColor: white,
            borderRadius: '15px',
            padding: '5px',
            position: 'sticky',
            top: 'auto',
            zIndex: 100,
        }}
        margin={'5px'}
    >
        <Tooltip title="back">
            <IconButton
                sx={{
                    color: 'black',
                }}
                onClick={navigateBack}
            >
                <KeyboardBackspaceIcon />
            </IconButton>
        </Tooltip>
            
        {chatMemberDetails?.chatAvatar ? 
            <AvatarCard avatar={chatMemberDetails?.chatAvatar}/>
            :
            <Avatar />
        }
        <Box 
            sx={{
                marginLeft: { xs: '0.5rem', sm: '1rem' }
            }}
        >
            <Typography variant='h5'>{chatMemberDetails?.chatName}</Typography>
            {
                chatMemberDetails?.isGroupChat ? 
                <Tooltip title={`You, ${chatMemberDetails?.chatAvatar?.map(member => member.name).join(',')}`}>
                    <Typography sx={{
                        color: 'gray',
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: {xs: '60%', md: '100%'},
                    }}>
                        {`You, ${chatMemberDetails?.chatAvatar?.map(member => member.name).join(',')}`}
                    </Typography>
                </Tooltip>
                : 
                isOnline && (
                <Typography sx={{
                    fontSize: '0.85rem',
                    color: 'green',
                    opacity: isOnline ? 1 : 0,
                    transition: 'opacity 1s ease-in',
                }}>online</Typography>)
            }
        </Box>
        <IconButton
            sx={{
                position: 'absolute',
                right: '0',
                color: 'black'
            }}
            onClick={(e) => handleDeleteChat(e, id, chatMemberDetails?.isGroupChat)}
        >
            <MoreVertIcon />
        </IconButton>
    </Box>
  )
}

export default memo(ChatHeader)