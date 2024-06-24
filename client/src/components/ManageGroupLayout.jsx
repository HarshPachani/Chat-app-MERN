import React, { useCallback, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Box } from '@mui/material'
import { gray } from '../constants/color'
import { useMyGroupsQuery } from '../redux/api/api'
import { useSearchParams } from 'react-router-dom'
import { useSocketEvents } from '../hooks/Hook'
import { REFETCH_CHATS, NEW_MESSAGE_ALERT, NEW_REQUEST } from '../constants/events'
import { useSocket } from '../context/socket'
import { GroupsList } from '../pages/Group'
import Title from '../shared/Title'
import { useDispatch, useSelector } from 'react-redux'
import { incrementNotification, setNewMessageCount, setNewMessagesAlert } from '../redux/reducers/chat'
import { getOrSaveFromStorage } from '../lib/features'

const manageGroupLayout = () => (WrappedComponent) => {
  return (props) => {
    const socket = useSocket();
    const dispatch = useDispatch();
    
    const { data , refetch } = useMyGroupsQuery('');

    const { newMessageAlert } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth); 
    
    const refetchListener = useCallback((data) => {
      refetch();
    }, [refetch]);

    const newRequestListener = useCallback(() => {
        dispatch(incrementNotification());
    }, [dispatch]);

    const newMessageAlertListener = useCallback((data) => {
      dispatch(setNewMessagesAlert(data));
    }, [dispatch]);

    const eventHandlers = {
      [REFETCH_CHATS]: refetchListener,
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
    }
    useSocketEvents(socket, eventHandlers);

    const chatId = useSearchParams()[0].get('group');

    
    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
      dispatch(setNewMessageCount())
    }, [newMessageAlert, dispatch]);

    useEffect(() => {
      refetch();
    }, [user?.user, refetch]);

    return (
      <Box           
        sx={{
          display: 'flex',
          position: {xs: 'relative', sm: 'fixed' },
          flexDirection: { xs: 'column-reverse', sm: 'row'},
          backgroundColor: gray,
          height: '100%',
          width: '100%'
        }}
      >
        <Title />
        <SideBar chatId={chatId} />
        <GroupsList
          myGroups={data?.groups}
          chatId={chatId}
        />
        <WrappedComponent 
          {...props}
          myGroups={data?.groups}
        />
      </Box>
    )
  }
}



export default manageGroupLayout