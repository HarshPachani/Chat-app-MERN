import React, { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Box, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { gray, orange, white } from '../constants/color'
import ChatItem from '../shared/ChatItem'
import AvatarCard from '../shared/AvatarCard'
import { AttachFile as AttachFileIcon, KeyboardBackspace as KeyboardBackspaceIcon, Send as SendIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { sampleMessage } from '../constants/sampleData'
import MessageComponent from '../components/MessageComponent'
import { InputBox } from '../styles/StyledComponents'

const Chat = ({ chatId, user, chats=[] }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const navigateBack = () => {
        navigate('/');
    }

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid black',
            width: { xs: '100%', sm: '70%'}
        }}
    >
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
            <AvatarCard avatar={user.avatar}/>
            <Box>
                <Typography variant='h5'>{user.name}</Typography>
                <Typography sx={{
                    color: 'gray',
                    fontSize: '0.85rem',
                }}>online</Typography>
            </Box>
        </Box>
        <Stack
            // ref={containerRef}
            boxSizing="border-box"
            spacing="1rem"
            padding="1rem"
            bgcolor={white}
            height={"90%"}
            sx={{
                overflowX: "hidden",
                overflowY: "auto",
                borderRadius: '20px'
            }}
        >
            {/* Render Messages */}
            {sampleMessage.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
            ))}

            {/* {
            userTyping && !isGroupChat && <TypingLoader />
            }
            {
            isGroupChat && groupUser && <div style={{ color: 'green' }}>{groupUser} is typing...</div>
            } */}

            {/* <div ref={bottomRef}/> */}
        </Stack>
        <form
            style={{
                position: 'sticky',
                bottom: 0,
                marginTop: '10px'
            }}
            >
            <Stack
                direction={"row"}
                height="100%"
                padding="1rem"
                alignItems="center"
                position={"relative"}
                sx={{
                    backgroundColor: white,
                    borderRadius: '15px'
                }}
            >
                <IconButton
                    sx={{
                        position: "absolute",
                        left: "1.5rem",
                        rotate: "30deg",
                        color: 'black'
                    }}
                    // onClick={handleFileOpen}
                >
                    <AttachFileIcon />
                </IconButton>

                <InputBox 
                    placeholder="Type Message Here..."
                    value={message}
                    onChange={handleMessageChange}
                />

                <IconButton
                    type="submit"
                    sx={{
                        bgcolor: gray,
                        rotate: "-30deg",
                        color: orange,
                        marginLeft: "1rem",
                        padding: "0.5rem",
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Stack>
        </form>
    </Box>
  )
}

export default AppLayout()(Chat)