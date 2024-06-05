import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { orange, purple } from '../constants/color.js';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import IconBtn from './IconButton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToGroup = () => {
    navigate('/groups')
  }
  const navigateToChat = () => {
    navigate('/')
  }
  return (
      <AppBar
        sx={{
          bgcolor: purple,
          height: { xs: '40px', sm: '100vh' },
          width: { xs: '100vw', sm: '80px' },
          margin: '2px' ,
          padding: '10px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'column' }, 
          alignItems: {xs: 'center', sm: 'space-between'},
          justifyContent: {xs: 'center', sm: 'space-around'},
          position: { sm: 'sticky', xs: 'fixed' },
          left: { sm: 0, xs: 0},
          right: { sm: 'auto', xs: 'auto' },
          bottom: { sm: 'auto', xs: 0 },
          top: { sm: 0, xs: 'auto' }
        }}
      >
        <Typography
           variant="h6"
           sx={{
             display: { xs: "none", sm: "block" },
           }}
        >
          App
        </Typography>
          
        <Toolbar>
          <Box>
            <IconBtn
              title="Chat"
              icon={<ChatIcon />}
              onClick={navigateToChat}
              color={location.pathname.includes('/chat') || location.pathname === '/' ? orange : 'inherit'}
              />
            <IconBtn
              title="Search"
              icon={<SearchIcon />}
              color={location.pathname.includes('/search') ? orange : 'inherit'}
              // onClick={openSearchDialog}
              />
            <IconBtn
              title="New Group"
              icon={<AddIcon />}
              color={location.pathname.includes('/add') ? orange : 'inherit'}
              // onClick={openNewGroup}
              />
            <IconBtn
              title="Manage Group"
              icon={<GroupIcon />}
              onClick={navigateToGroup}
              color={location.pathname.includes('/groups') ? orange : 'inherit'}
              />
            <IconBtn
              title="Notifications"
              icon={<NotificationsIcon />}
              color={location.pathname.includes('/notification') ? orange : 'inherit'}
              // onClick={openNotification}
              // value={notificationCount}
              />
          </Box>
        </Toolbar>
          <IconBtn 
            title="profile"
            icon={<ProfileIcon />}
          />
      </AppBar>
  )
}

export default SideBar