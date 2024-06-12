import { Title } from '@mui/icons-material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import { gray, white } from '../constants/color'
import AvatarCard from '../shared/AvatarCard'
import { Link } from '../styles/StyledComponents'
import { SampleChats } from '../constants/sampleData'
import { useMyGroupsQuery } from '../redux/api/api'
import { useSearchParams } from 'react-router-dom'
import { useSocketEvents } from '../hooks/Hook'
import { REFETCH_CHATS } from '../constants/events'
import { useSocket } from '../context/socket'

const manageGroupLayout = () => (WrappedComponent) => {
    return (props) => {
      const socket = useSocket();
      const [groupName, setGroupName] = useState('');
      const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('');
      const [isEdit, setIsEdit] = useState(false);
      const [members, setMembers] = useState([]);
      
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
          <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row'},
                    backgroundColor: gray
                }}
            >
                <Title />
                <SideBar />
                {/* <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginBottom: '5px',
                        backgroundColor: white,
                        width: '30%'
                    }}
                    margin={'5px'}
                >
                    <Typography variant='h5'>Groups</Typography>
                    <TextField 
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: gray,
                        }}
                    />
                    <GroupsList myGroups={myGroups?.data?.groups} /> 
                </Box> */}
                <WrappedComponent 
                    {...props}
                    myGroups={data?.groups}
                    // user={user}
                    // chats={} 
                />
            </Box>
          </>
        )
    }
}

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => {
  
    return (
      <Stack
        overflow="auto"
        width={w}
        direction="column"
        sx={{
        //   backgroundImage: bgGradient,
            backgroundColor: white,
            height: "100vh",
        }}
      >
        {myGroups.length > 0 ? (
          myGroups.map((group) => (
            <GroupListItem key={group._id} group={group} chatId={chatId} />
          ))
        ) : (
          <Typography textAlign="center" padding="1rem">
            No groups
          </Typography>
        )}
      </Stack>
    );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  const currentChat = useSearchParams()[0].get("group");
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
      style={{
        backgroundColor: currentChat === _id ? gray : '' 
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default manageGroupLayout
export { GroupsList };