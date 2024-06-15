import { Avatar, Box, Tooltip, Typography, IconButton } from '@mui/material'
import React, { memo } from 'react'
import { white } from '../constants/color'
import { useNavigate } from 'react-router-dom'
import { KeyboardBackspace as KeyboardBackspaceIcon } from '@mui/icons-material'
import AvatarCard from '../shared/AvatarCard'

const ChatHeader = ({ chatMemberDetails }) => {
    const navigate = useNavigate();
    console.log("Rerendering....");

    const navigateBack = () => navigate('/')
  
  return (
    <Box
        sx={{
            display: 'flex',
            backgroundColor: white,
            borderRadius: '15px',
            padding: '5px',
            position: 'sticky',
            top: 0
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
        <Box>
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
                <Typography sx={{
                    color: 'gray',
                    fontSize: '0.85rem',
                }}>online</Typography>
            }
        </Box>
    </Box>
  )
}

export default memo(ChatHeader)