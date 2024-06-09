import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { useSocket } from '../context/socket'
import { NEW_MESSAGE } from '../constants/events'
import { useGetChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api'
import { useSocketEvents } from '../hooks/Hook'

const Chat = ({ chatId, user, chats=[] }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const bottomRef = useRef(null);
    const containerRef = useRef(null);

    const [messages, setMessages] = useState([]);

    const socket = useSocket();

    const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
    const members = chatDetails?.data?.chat?.members;
    const { data, isLoading, isError } = useGetMessagesQuery({ chatId });

    // const allMessages = [...oldMessagesChunk, ...messages];
    // console.log(data ? true : false);
    const allMessages = data ? [...data.messages, ...messages] : [...messages];
    // const allMessages = [];
    
    useEffect(() => {
        return () => {
            setMessages([]);
            setMessage('');
          }
    }, [chatId]);

    useEffect(() => {
        if(bottomRef.current) bottomRef.current.scrollIntoView({ behaviour: 'smooth' });
        }, [messages]);
        
        useEffect(() => {
            if(containerRef.current) containerRef.current.scrollIntoView({ behaviour: 'smooth' });
    }, [allMessages]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const navigateBack = () => {
        navigate('/');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(!message.trim()) return;

        socket.emit(NEW_MESSAGE, { chatId, members, message });
        setMessage('');
    }

    const newMessagesListener = useCallback((data) => {
        if(data.chatId !== chatId) return;
        setMessages((prev) => [...prev, data?.message])
    }, [chatId]);

    const eventHandlers = {
        [NEW_MESSAGE]: newMessagesListener,
    }

    useSocketEvents(socket, eventHandlers);

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
            ref={containerRef}
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
            {allMessages?.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
            ))}

            {/* {
            userTyping && !isGroupChat && <TypingLoader />
            }
            {
            isGroupChat && groupUser && <div style={{ color: 'green' }}>{groupUser} is typing...</div>
            } */}

            <div ref={bottomRef}/>
        </Stack>
        <form
            style={{
                position: 'sticky',
                bottom: 0,
                marginTop: '10px'
            }}
            onSubmit={submitHandler}
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
                    type='submit'
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