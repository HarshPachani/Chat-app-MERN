import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Box, CircularProgress, IconButton, Stack } from '@mui/material'
import { gray, white } from '../constants/color'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import MessageComponent from '../components/MessageComponent'
import { InputBox } from '../styles/StyledComponents'
import { useSocket } from '../context/socket'
import { ALERT, CHAT_JOINED, GROUP_USER_STOPPED_TYPING, GROUP_USER_TYPING, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events'
import { useGetChatDetailsQuery, useGetMessagesQuery, useGetOtherChatMemberQuery } from '../redux/api/api'
import { useErrors, useSocketEvents } from '../hooks/Hook'
import { TypingLoader } from '../layout/Loaders'
import { useDispatch, useSelector } from 'react-redux'
import { removeNewMessagesAlert } from '../redux/reducers/chat'
import ChatHeader from '../components/ChatHeader'
import { setIsFileMenu } from '../redux/reducers/misc'
import FileMenu from '../dialogs/FileMenu'

const Chat = ({ chatId, user, handleDeleteChat }) => {
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(1);
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [groupUser, setGroupUser] = useState('');
    const [messages, setMessages] = useState([]);
    const [userTyping, setUserTyping] = useState('');
    const [iAmTyping, setIAmTyping] = useState(false);
    const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
    const [fetchTrigger, setFetchTrigger] = useState(true);
    
    const bottomRef = useRef(null);
    const typingTimeout = useRef(null);
    const chatListRef = useRef(null);
    const inputRef = useRef(null);
    const firstMessageRef = useRef(null);
    
    const socket = useSocket();
    const dispatch = useDispatch();

    const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
    const members = chatDetails?.data?.chat?.members;
    
    const { data, isLoading } = useGetMessagesQuery({ chatId, page, totalMessages: messages?.length  }, { skip: !fetchTrigger });
    const { data: chatMemberDetails } = useGetOtherChatMemberQuery({ chatId });

    const { theme } = useSelector(store => store.chat);

    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
    ];
    
    useEffect(() => {
        socket.emit(CHAT_JOINED, { userId: user?._id, members })
        dispatch(removeNewMessagesAlert(chatId));

        return () => {
            setMessages([]);
            setMessage('');
            setPage(1);
            setTotalPages(0);
            setFetchTrigger(true);
        }
    }, [chatId]);

    useEffect(() => {
        if(bottomRef.current && page===1) bottomRef.current.scrollIntoView({ behaviour: 'smooth' });
    }, [messages]);

    useEffect(() => {
        let timeoutId;
        if(data) {
            if(chatListRef.current.firstChild) {
                firstMessageRef.current = chatListRef.current.firstChild;
            } 
            setTotalPages(data?.totalPages);
            setMessages(prevMessages => [...data.messages, ...prevMessages]);
            setFetchTrigger(false);

            timeoutId = setTimeout(() => {
                if (firstMessageRef.current) {
                    firstMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 0);
        }
        
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [data]);

    useEffect(() => {
        const handleScroll = () => {
            if (chatListRef.current.scrollTop === 0) {
                if(page === totalPages) {
                    setPage(totalPages)
                    return;
                }
                setPage(prev => prev + 1);
                if (!fetchTrigger) {
                    setFetchTrigger(true); // Trigger API call
                }
            }
        };

        const chatListElement = chatListRef.current;
        chatListElement.addEventListener('scroll', handleScroll);

        return () => {
            chatListElement.removeEventListener('scroll', handleScroll);
        };
    }, [totalPages, page, fetchTrigger]);


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

    const handleFileOpen = (e) => {
        dispatch(setIsFileMenu(true));
        setFileMenuAnchor(e.currentTarget);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(!message.trim()) return;

        socket.emit(NEW_MESSAGE, { chatId, members, message });

        bottomRef.current.scrollIntoView({ behaviour: 'smooth' });
        setMessage('');
        inputRef.current.focus();
    }

    const newMessagesListener = useCallback((data) => {
        if(data.chatId !== chatId) return;
        
        setNewMessagesCount(prev => prev+1);
        setMessages((prev) => [...prev, data?.message])
        bottomRef.current.scrollIntoView({ behaviour: 'smooth' });
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
  return (
    <Box
        sx={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            borderBottom: '1px solid black',
            width: { xs: '100%', sm: '70%'},
            height: '100vh',
        }}
    >
        <ChatHeader socket={socket} chatMemberDetails={chatMemberDetails} handleDeleteChat={handleDeleteChat} />
        <Stack
            ref={chatListRef}
            boxSizing='border-box'
            spacing='1rem'
            padding='1rem'
            bgcolor={white}
            height={'100%'}
            sx={{
                position: 'relative',
                overflowX: 'hidden',
                overflowY: 'scroll',
                borderRadius: '20px'
            }}
        >
            {/* Render Messages */}
            {isLoading ?
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CircularProgress sx={{ color: theme }} />
                </Box>
                :
                <>
                    {messages?.map((i, index) => (
                        <MessageComponent 
                            key={i._id} 
                            message={i} 
                            user={user} 
                            groupChat={chatMemberDetails?.isGroupChat}
                        />
                    ))}

                    {userTyping && !chatMemberDetails?.isGroupChat && <TypingLoader />}
                    
                    {
                        chatMemberDetails?.isGroupChat && groupUser && <div style={{ color: 'green' }}>{groupUser} is typing...</div>
                    }

                    <div ref={bottomRef}/>
                </>
            }
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
                direction={'row'}
                height='100%'
                padding='1rem'
                alignItems='center'
                position={'relative'}
                sx={{
                    backgroundColor: white,
                    borderRadius: '15px'
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        left: '1.5rem',
                        rotate: '30deg',
                        color: 'black'
                    }}
                    onClick={handleFileOpen}
                >
                    <AttachFileIcon />
                </IconButton>

                <InputBox 
                    ref={inputRef}
                    placeholder='Type Message Here...'
                    value={message}
                    onChange={handleMessageChange}
                />

                <IconButton
                    type='submit'
                    sx={{
                        bgcolor: gray,
                        rotate: '-30deg',
                        color: theme,
                        marginLeft: '1rem',
                        padding: '0.5rem',
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Stack>
        </form>

        <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Box>
  )
}

export default AppLayout()(Chat);