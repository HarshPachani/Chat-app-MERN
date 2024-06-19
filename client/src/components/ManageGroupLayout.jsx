import React, { useCallback, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Box } from '@mui/material'
import { gray } from '../constants/color'
import { useMyGroupsQuery } from '../redux/api/api'
import { useSearchParams } from 'react-router-dom'
import { useSocketEvents } from '../hooks/Hook'
import { REFETCH_CHATS } from '../constants/events'
import { useSocket } from '../context/socket'
import { GroupsList } from '../pages/Group'
import Title from '../shared/Title'

const manageGroupLayout = () => (WrappedComponent) => {
    return (props) => {
      const socket = useSocket();
      const [groupName, setGroupName] = useState('');
      const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('');
      const [isEdit, setIsEdit] = useState(false);
      
      const { data , refetch } = useMyGroupsQuery('');
      
      const refetchListener = useCallback((data) => {
        refetch();
      }, [refetch]);

      const eventHandlers = {
        [REFETCH_CHATS]: refetchListener,
      }
      useSocketEvents(socket, eventHandlers);

      const chatId = useSearchParams()[0].get('group');

      useEffect(() => {
        if(chatId) {
          setGroupName(`Group Name ${chatId}`);
          setGroupNameUpdatedValue(`Group Name ${chatId}`);
        }

        return () => {
          setGroupName(``);
          setGroupNameUpdatedValue(``);
          setIsEdit(false);
        };
      }, [chatId]);

      return (
        <Box           
          sx={{
            display: 'flex',
            // position: 'fixed',
            position: {xs: 'relative', sm: 'fixed' },
            flexDirection: { xs: 'column-reverse', sm: 'row'},
            backgroundColor: gray,
            // overflow: 'none',
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