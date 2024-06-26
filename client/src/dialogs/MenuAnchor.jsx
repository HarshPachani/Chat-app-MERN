import { Box, ListItemText, Menu, MenuItem, MenuList, Stack } from '@mui/material';
import React, { memo, useState } from 'react'
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
            vertical: 'center',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
    >
      <div style={{ width: '10rem' }}>
        <MenuList>
          <MenuItem
            onClick={openProfile}
          >
              <AccountBoxIcon />
              <ListItemText style={{ marginLeft: '0.5rem' }}>MyProfile</ListItemText>
          
          </MenuItem>
          <MenuItem 
            onClick={handleLogout}
          >
            <LogoutIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  )
}

export default memo(MenuAnchor)