import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Avatar, Box, CircularProgress, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { gray, orange, white } from '../constants/color'
import ChatItem from '../shared/ChatItem'
import AvatarCard from '../shared/AvatarCard'
import { AttachFile as AttachFileIcon, KeyboardBackspace as KeyboardBackspaceIcon, Send as SendIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { sampleMessage } from '../constants/sampleData'
import MessageComponent from '../components/MessageComponent'
import { InputBox } from '../styles/StyledComponents'
import { useSocket } from '../context/socket'
import { ALERT, GROUP_USER_STOPPED_TYPING, GROUP_USER_TYPING, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events'
import { useGetChatDetailsQuery, useGetMessagesQuery, useGetOtherChatMemberQuery } from '../redux/api/api'
import { useErrors, useSocketEvents } from '../hooks/Hook'
import { TypingLoader } from '../layout/Loaders'
import { useDispatch, useSelector } from 'react-redux'
import { removeNewMessagesAlert } from '../redux/reducers/chat'

const Chat = ({ chatId, user, chats=[] }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [groupUser, setGroupUser] = useState('');

    const bottomRef = useRef(null);
    const containerRef = useRef(null);
    const typingTimeout = useRef(null);
    const chatListRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [userTyping, setUserTyping] = useState('');
    const [iAmTyping, setIAmTyping] = useState(false);

    const [allMessages, setAllMessages] = useState([]);

    const socket = useSocket();
    const dispatch = useDispatch();

    const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
    const members = chatDetails?.data?.chat?.members;
    const { data, isLoading, isError } = useGetMessagesQuery({ chatId, page });
    const { data: chatMemberDetails } = useGetOtherChatMemberQuery({ chatId });

    const { theme } = useSelector(store => store.chat);

    

    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        // { isError: data.isError, error: data.error },
      ];

    // const allMessages = [...oldMessagesChunk, ...messages];
    // console.log(data ? true : false);
    // const allMessages = [];
    
    useEffect(() => {
        dispatch(removeNewMessagesAlert(chatId));

        return () => {
            setMessages([]);
            setMessage('');
            setPage(1);
            setTotalPages(0);
        }
    }, [chatId]);

    useEffect(() => {
        if(bottomRef.current && page===1) bottomRef.current.scrollIntoView({ behaviour: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if(containerRef.current) containerRef.current.scrollIntoView({ behaviour: 'smooth' });
    }, [allMessages]);

    useEffect(() => {
        if(data) {
            // console.log(data);
            setMessages(data ? [...data.messages, ...messages] : [...messages]);
            setTotalPages(data?.totalPages);
        }
    }, [data]);

    useEffect(() => console.log(totalPages), [totalPages]);

    useEffect(() => {
        const handleScroll = () => {
            if (chatListRef.current.scrollTop === 0) {
                // console.log(page, totalPages);
                // console.log(page === totalPages);
                if(page === totalPages) {
                    setPage(totalPages)
                    return;
                }
                setPage(prev => prev + 1);
            }
        };

        const chatListElement = chatListRef.current;
        chatListElement.addEventListener('scroll', handleScroll);

        return () => {
            chatListElement.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleMessageChange = (e) => {
        setMessage(e.target.value);

        if(!iAmTyping){
            if(chatMemberDetails?.isGroupChat){
                socket.emit(GROUP_USER_TYPING, { userId: user._id, username: user.name, chatId })
            }
            setIAmTyping(true);
        }
        socket.emit(START_TYPING, { members, chatId })

        if(typingTimeout.current) clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {
            if(chatMemberDetails?.isGroupChat)
                socket.emit(GROUP_USER_STOPPED_TYPING);
            socket.emit(STOP_TYPING, { members, chatId });
            setIAmTyping(false);
        }, 1500);
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

    const startTypingListener = useCallback((data) => {
        if(data.chatId !== chatId) return;
        setUserTyping(true);
    }, [chatId]);

    const stopTypingListener = useCallback((data) => {
        if(data.chatId !== chatId) return;
        setUserTyping(false);
    }, [chatId]);

    const alertListener = useCallback((data) => {
        if(data.chatId !== chatId) return;
        const messageForAlert = {
          content: data.message,
          sender: {
              _id: 'jaflkjlfakjlkdajljf',
              name: 'Admin'
          },
          chat: chatId,
          createdAt: new Date().toISOString(),
        };
    
        setMessages((prev) => [...prev, messageForAlert]);
    
    }, [chatId]);

    const handleGroupUserTyping = ({userId, username, chatId: currentChat}) => {
        if(chatId !== currentChat) return;
        if(chatMemberDetails?.isGroupChat)
            setGroupUser(username);
    };

    const handleGroupUserStoppedTyping = () => {
        if(chatMemberDetails?.isGroupChat)
            setGroupUser();
    };

    const eventHandlers = {
        [ALERT]: alertListener,
        [NEW_MESSAGE]: newMessagesListener,
        [START_TYPING]: startTypingListener,
        [STOP_TYPING]: stopTypingListener,
        [GROUP_USER_TYPING]: handleGroupUserTyping,
        [GROUP_USER_STOPPED_TYPING]: handleGroupUserStoppedTyping,
    }

    useSocketEvents(socket, eventHandlers);
    useErrors(errors);
    const chatMember = [];
  return (
    <Box
        sx={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            borderBottom: '1px solid black',
            width: { xs: '100%', sm: '70%'},
            // height: '100%',
            height: '100vh',
        }}
    >
        <Box
            sx={{
                display: 'flex',
                backgroundColor: white,
                // backgroundColor: 'black',
                // color: 'white',
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
        {isLoading && 
            <Box alignItems={'center'}>
                <CircularProgress />
            </Box>
        }
        <Stack
            ref={chatListRef}
            boxSizing='border-box'
            spacing='1rem'
            padding='1rem'
            bgcolor={white}
            // bgcolor={'black'}
            height={'100%'}
            sx={{
                position: 'relative',
                overflowX: 'hidden',
                overflowY: 'scroll',
                borderRadius: '20px'
            }}
        >
            {/* Render Messages */}
            {messages?.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} groupChat={chatMemberDetails?.isGroupChat} />
            ))}

            {
                userTyping && !chatMemberDetails?.isGroupChat && <TypingLoader />
            }
            
            {
                chatMemberDetails?.isGroupChat && groupUser && <div style={{ color: 'green' }}>{groupUser} is typing...</div>
            }

            <div ref={bottomRef}/>
        </Stack>
        <form
            style={{
                position: 'sticky',
                // top: 'auto',
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
                        color: theme,
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

export default AppLayout()(Chat);