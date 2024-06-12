import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Backdrop, Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem'
import { white } from '../constants/color'
import ChatListLayout from './ChatListLayout'
import { useParams } from 'react-router-dom'
import { Box, Typography, TextField } from '@mui/material';
import { useMyChatsQuery } from '../redux/api/api'
import { InputBox } from '../styles/StyledComponents'
import IconBtn from './IconButton'
import { AccountCircle as ProfileIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsProfile } from '../redux/reducers/misc'


const ProfileDialog = lazy(() => import('../dialogs/ProfileDialog.jsx'));

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
    user,
    onlineUsers = [],
}) => {
    const dispatch = useDispatch();
    const params = useParams();
    const chatId = params?.id;

    const [search, setSearch] = useState('');
    const [userChats, setUserChats] = useState([]);

    const { isProfile } = useSelector(store => store.misc);

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

    
  const openProfile = () => dispatch(setIsProfile(true));


  return (
    <>
    <Box
        sx={{
            // display: chatId ? 'none' : 'flex',
            display: { xs: chatId ? 'none' : 'flex', sm: 'flex' },
            // display: 'flex',
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
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: white,
                // backgroundColor: 'black',
                // color: 'white',
                borderRadius: '15px',
                padding: '5px',
                position: 'sticky',
                top: 0,
                height: { xs: '80px', sm: 'auto' }
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
                <IconBtn 
                    title={user?.username}
                    icon={<ProfileIcon />}
                    sx={{
                        display: { xs: 'flex', sm: 'none' }
                    }}
                    onClick={openProfile}
                />
            </Box>
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
                overflow: 'auto', 
                backgroundColor: white, 
                // backgroundColor: 'black', 
                // color: 'white',
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
                        // handleDeleteChat={handleDeleteChat}
                    />
                )
                })
            }
        </Stack>
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

export default ChatList;