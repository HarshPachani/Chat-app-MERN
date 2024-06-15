import { Box, Menu, Stack } from '@mui/material';
import React, { useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { userNotExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const MenuAnchor = ({ isOpen, setIsOpen, dispatch, menuAnchor, openProfile }) => {

    const handleClose = () => {
        menuAnchor.current = null;
        setIsOpen(false);
    } 

    const handleLogout = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/logout`, { withCredentials: true });
          dispatch(userNotExists());
          toast.success(data.message);
        } catch (error) {
          toast.error(error?.response?.data?.message || 'Something went wrong');
        }
        setIsOpen(false);
    };

  return (
    <Menu
        open = {isOpen}
        onClose={handleClose}
        anchorEl={menuAnchor.current}
        anchorOrigin={{
            vertical: 'right',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
    >
      <Stack
        sx={{
          width: '10rem',
          padding: '0.5rem',
          cursor: 'pointer',
        }}
        direction='column'
        alignItems={'center'}
        spacing='0.5rem'
      >
        <Box 
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            onClick={openProfile}
        >
            <AccountBoxIcon />
            MyProfile
        </Box>
        <Box 
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            onClick={handleLogout}
        >
            <LogoutIcon />
            Logout
        </Box>
      </Stack>
    </Menu>
  )
}

export default MenuAnchor