import { AppBar, Avatar, Backdrop, Box, Toolbar, Typography } from '@mui/material'
import React, { Suspense, lazy, useRef, useState } from 'react'
import { purple } from '../constants/color.js';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import ForumIcon from '@mui/icons-material/Forum';
import IconBtn from './IconButton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewGroup, setIsNotification, setIsProfile, setIsSearch } from '../redux/reducers/misc.js';
import { resetNotificationCount } from '../redux/reducers/chat.js';
import MenuAnchor from '../dialogs/MenuAnchor.jsx';

const SearchDialog = lazy(() => import('../dialogs/Search.jsx'));
const NotificationDialog = lazy(() => import('../dialogs/Notification.jsx'));
const NewGroupDialog = lazy(() => import('../dialogs/NewGroup.jsx'));
const ProfileDialog = lazy(() => import('../dialogs/ProfileDialog.jsx'));

const SideBar = ({ chatId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const profileAnchor = useRef(null);

  const { user } = useSelector((store) => store.auth);
  const { isSearch, isNotification, isNewGroup, isProfile } = useSelector((store) => store.misc);
  const { notificationCount, theme, newMessagesCount } = useSelector((store) => store.chat);
  
  const navigateToGroup = () => {
    navigate('/groups')
  }
  const navigateToChat = () => {
    navigate('/')
  }

  const openSearchDialog = () => dispatch(setIsSearch(true));
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount())
  }
  const openNewGroup = () => dispatch(setIsNewGroup(true));
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
      <AppBar
          sx={{
            bgcolor: purple,
            height: { xs: '40px', sm: '100vh' },
            width: { xs: '100vw', sm: '80px' },
            margin: { xs:'none' , sm: '3px' },
            padding: { xs: 'none' , sm: '10px' },
            borderRadius: '20px',
            // display: 'flex',
            display: { xs: chatId ? 'none' : 'flex', sm: 'flex' },
            flexDirection: { xs: 'row', sm: 'column' }, 
            alignItems: {xs: 'center', sm: 'space-between'},
            // alignItems: {xs: 'center'},
            justifyContent: {xs: 'center', sm: 'space-around'},
            // justifyContent: {xs: 'center'},
            position: { sm: 'sticky', xs: 'fixed' },
            left: { sm: 0, xs: 0},
            right: { sm: 'auto', xs: 'auto' },
            bottom: { sm: 'auto', xs: 0 },
            top: { sm: 0, xs: 'auto' }
          }}
        >
          <MenuAnchor 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            dispatch={dispatch} 
            menuAnchor={profileAnchor} 
            openProfile={openProfile}
          />
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <ForumIcon />
          </Typography>
            
          {/* <Toolbar> */}
            <Box>
              <IconBtn
                title="Chats"
                icon={<ChatIcon />}
                onClick={navigateToChat}
                color={(location.pathname.includes('/chat') || location.pathname === '/') && (!isSearch && !isNotification && !isNewGroup && !isProfile) ? theme : 'inherit'}
                value={newMessagesCount}
              />
              <IconBtn
                title="Search"
                icon={<SearchIcon />}
                color={isSearch ? theme : 'inherit'}
                onClick={openSearchDialog}
              />
              <IconBtn
                title="New Group"
                icon={<AddIcon />}
                color={isNewGroup ? theme : 'inherit'}
                onClick={openNewGroup}
              />
              <IconBtn
                title="Manage Groups"
                icon={<GroupIcon />}
                color={location.pathname.includes('/groups') ? theme : 'inherit'}
                onClick={navigateToGroup}
              />
              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                color={isNotification ? theme : 'inherit'}
                value={notificationCount}
                onClick={openNotification}
              />
            </Box>
          {/* </Toolbar> */}
          {
            user?.avatar?.url ? 
            <IconBtn 
              title={user.username}
              src={user.avatar.url}
              color={isProfile ? theme : 'inherit'}
              sx={{
                  display: { xs: 'none', sm: 'flex' }
              }}
              onClick={handleMenuOpen}
            />
            : 
            <IconBtn 
              title={user.username}
              icon={<ProfileIcon />}
              color={isProfile ? theme : 'inherit'}
              sx={{
                  display: { xs: 'none', sm: 'flex' }
              }}
              onClick={handleMenuOpen}
            />
          }
      </AppBar>
      {
        isSearch && (
          <Suspense fallback={ <Backdrop open /> }>
            <SearchDialog />
          </Suspense>
        )
      }
      {
        isNotification && (
          <Suspense fallback={ <Backdrop open /> }>
            <NotificationDialog />
          </Suspense>
        )
      }
      {
        isNewGroup && (
          <Suspense fallback={ <Backdrop open /> }>
            <NewGroupDialog />
          </Suspense>
        )
      }
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

export default SideBar