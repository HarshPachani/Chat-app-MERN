import { Menu, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setIsDeleteMenu } from '../redux/reducers/misc';
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useAsyncMutation } from '../hooks/Hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../redux/api/api';

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
    const { isDeleteMenu, selectedDeleteChat } = useSelector(store => store.misc);
    const navigate = useNavigate();
    
    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false));
        deleteMenuAnchor.current = null;
    }

    const isGroupChat = selectedDeleteChat?.groupChat;

    const [deleteChat, ,deleteChatData] = useAsyncMutation(useDeleteChatMutation);

    const [leaveGroup, ,leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

    const leaveGroupHandler = () => {
        closeHandler();
        leaveGroup('Leaving Group...', selectedDeleteChat?.chatId);
    };
    
    const deleteChatHandler = () => {
        closeHandler();
        deleteChat('Deleting Chat...', selectedDeleteChat?.chatId);
    };

    useEffect(() => {
        if(deleteChatData || leaveGroupData) 
            navigate('/');
    }, [deleteChatData, leaveGroupData]);
    
  return (
    <Menu
        open={isDeleteMenu}
        onClose={closeHandler}
        anchorEl={deleteMenuAnchor.current}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
        }}
    >
        <Stack
            sx={{
            width: "10rem",
            padding: "0.5rem",
            cursor: "pointer",
            }}
            direction="row"
            alignItems={"center"}
            spacing="0.5rem"
            onClick={isGroupChat ? leaveGroupHandler: deleteChatHandler}
        >
        {
          isGroupChat ? (
          <><ExitToAppIcon /> <Typography>Leave Group</Typography></>
          ) : (
          <> <DeleteIcon /> <Typography>Clear Chat</Typography></>
          )
        }
      </Stack>
    </Menu>
  )
}

export default DeleteChatMenu