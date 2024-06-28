import React, { Suspense, lazy, memo, useEffect, useRef, useState } from 'react'
import { Backdrop, CircularProgress, Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem'
import { white } from '../constants/color'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material';
import { InputBox } from '../styles/StyledComponents'
import IconBtn from './IconButton'
import { AccountCircle as ProfileIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsProfile } from '../redux/reducers/misc'
import MenuAnchor from '../dialogs/MenuAnchor.jsx'
import OptionChip from './OptionChip.jsx'

const ProfileDialog = lazy(() => import('../dialogs/ProfileDialog.jsx'));

const ChatList = ({
    chats = [],
    newMessagesAlert = [
        {
          chatId: "",
          count: 0,
        },
    ],
    user,
    onlineUsers = [],
    isLoading,
}) => {
    const dispatch = useDispatch();
    const params = useParams();
    const chatId = params?.id;

    const profileAnchor = useRef(null);

    const [search, setSearch] = useState('');
    const [userChats, setUserChats] = useState(chats);
    const [isOpen, setIsOpen] = useState(false);
    const [optionType, setOptionType] = useState('all');

    const { isProfile } = useSelector(store => store.misc);
    const { theme } = useSelector(store => store.chat);

    const filterOptions = () => {
        switch (optionType) {
            case 'unread':
                const unreadChats = chats?.filter(chat => newMessagesAlert.some(unreadChat => unreadChat.chatId === chat._id));
                return unreadChats;
                break;
            case 'groups':
                const groupChats = chats?.filter(chat => chat?.groupChat === true);
                return groupChats;
                break;
            default:
                return chats;
                break;
        }
    }

    useEffect(() => {
        setUserChats(chats);
    }, [chats]);

    useEffect(() => {
        if(search.trim() === '') {
            setUserChats(filterOptions());
        } else {
            const filteredChats  = filterOptions().filter(chat => chat.name.toLowerCase().includes(search.toLowerCase().trim()));
            setUserChats(filteredChats);
        }
    }, [search]);
    
    useEffect(() => {
        setUserChats(filterOptions());
    }, [optionType]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }
    
    const openProfile = () => {
        setIsOpen(false);
        dispatch(setIsProfile(true));
    }

    const handleMenuOpen = (e) => {
        setIsOpen(true);
        profileAnchor.current = e.currentTarget;
    }

  return (
    <>
    <Box
        sx={{
            display: { xs: chatId ? 'none' : 'flex', sm: 'flex' },
            flexDirection: 'column',
            borderBottom: '1px solid black',
            width: { xs: '100%', sm: '30%' },
            height: '100vh'
        }}
    >
        <MenuAnchor 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            dispatch={dispatch} 
            menuAnchor={profileAnchor} 
            openProfile={openProfile}
        />
        
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: white,
                borderRadius: '15px',
                padding: '5px',
                position: 'sticky',
                top: 0,
                height: { xs: '18%', sm: '13%' }
            }}
            margin={'5px'}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: { xs: '100%', sm: 'auto' },
                }}
            >
                <Typography variant='h5' sx={{ marginLeft: '5px' }}>Chats</Typography>
                {
                    user?.avatar?.url ? 
                    <IconBtn 
                        title={user?.username}
                        src={user.avatar.url}
                        color={isProfile ? theme : 'inherit'}
                        sx={{
                            display: { xs: 'flex', sm: 'none' }
                        }}
                        onClick={handleMenuOpen}
                    />
                    : 
                    <IconBtn 
                        title={user?.username}
                        icon={<ProfileIcon />}
                        color={isProfile ? theme : 'inherit'}
                        sx={{
                            display: { xs: 'flex', sm: 'none' }
                        }}
                        onClick={handleMenuOpen}
                    />
                }
            </Box>
            <InputBox 
                placeholder={`Search ${optionType==='all' ? 'Friends' : optionType}...`}
                value={search}
                onChange={handleSearchChange}
            />
        </Box>

        {
            isLoading ? 
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CircularProgress sx={{ color: theme }} />
            </Box>
            :
            <Stack 
                direction={'column'}
                sx={{ 
                    height: '100%', 
                    overflow: 'auto', 
                    backgroundColor: white, 
                    borderRadius: '20px',
                    marginRight: '5px',
                    border: `2px solid ${white}`,
                    position: 'sticky',
                    top: 0
                }}
            >
            <OptionChip
                optionType={optionType}
                setOptionType={setOptionType}
            />
            
            { !isLoading && userChats?.length > 0 ? (
                userChats?.map((data, index) => {
                    const { avatar, _id, name, groupChat, members } = data;
                const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id )
                const isOnline = members?.some((member) => onlineUsers.includes(member));

                return (
                    <ChatItem
                        key={_id}
                        index={index}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        avatar={avatar}
                        name={name}
                        _id={_id}
                        groupChat={groupChat}
                        sameSender={chatId === _id}
                    />
                )
                })
                ) : (
                    <Typography textAlign="center" padding="1rem">
                        No chats
                    </Typography>
                )
            }
            </Stack>
        }
    </Box>
    {
        isProfile && (
          <Suspense fallback={ <Backdrop open /> }>
            <ProfileDialog />
          </Suspense>
        )
    }
    </>
  )
}

export default memo(ChatList);