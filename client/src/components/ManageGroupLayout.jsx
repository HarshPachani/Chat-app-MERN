import { Title } from '@mui/icons-material'
import React, { memo } from 'react'
import SideBar from './SideBar'
import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import { gray, white } from '../constants/color'
import AvatarCard from '../shared/AvatarCard'
import { Link } from '../styles/StyledComponents'
import { SampleChats } from '../constants/sampleData'

const ManageGroupLayout = () => (WrappedComponent) => {
    return (props) => {
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
                <Box
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
                    <GroupsList myGroups={SampleChats} />
                </Box>
                <WrappedComponent 
                    {...props}
                    // chatId={chatId} 
                    // user={user}
                    // chats={sampleMessage} 
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
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default ManageGroupLayout