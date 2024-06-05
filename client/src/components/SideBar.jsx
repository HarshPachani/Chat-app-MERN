import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { purple } from '../constants/color.js';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountCircle as ProfileIcon
} from '@mui/icons-material';
import IconBtn from './IconButton';

const SideBar = () => {
  return (
    <Box>
      <AppBar
        position='static'
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
          justifyContent: {xs: 'center', sm: 'space-around'}
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
              title="Search"
              icon={<SearchIcon />}
              // onClick={openSearchDialog}
            />
            <IconBtn
              title="New Group"
              icon={<AddIcon />}
              // onClick={openNewGroup}
            />
            <IconBtn
              title="Manage Group"
              icon={<GroupIcon />}
              // onClick={navigateToGroup}
            />
            <IconBtn
              title="Notifications"
              icon={<NotificationsIcon />}
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
    </Box>
  )
}

export default SideBar