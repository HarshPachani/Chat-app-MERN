import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import ManageGroupLayout, { GroupsList } from '../components/ManageGroupLayout';
import { Backdrop, Box, Button, CircularProgress, Grid, IconButton, Menu as MenuIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { gray, orange } from '../constants/color';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon } from '@mui/icons-material';
import { useDeleteChatMutation, useGetChatDetailsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import UserItem from '../shared/UserItem';
import { useAsyncMutation, useErrors, useSocketEvents } from '../hooks/Hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc';
import { useSocket } from '../context/socket';
import { REFETCH_CHATS } from '../constants/events';

const ConfirmDeleteDialog = lazy(() => import('../dialogs/ConfirmDeleteDialog'));
const AddMemberDialog = lazy(() => import('../dialogs/AddMemberDialog'));

const Group = ({ myGroups }) => {
  
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  const { isAddMember } = useSelector((store) => store.misc);

  const { data, refetch } = useGetChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  // const refetchListener = useCallback((data) => {
  //   refetch();
  // }, [refetch]);

  // const socketHandlers = {
  //   [REFETCH_CHATS]: refetchListener,
  // }

  // useSocketEvents(socket, socketHandlers);

  const [groupName, setGroupName] = useState('');
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('');
  const [members, setMembers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);

  const errors = [
    {
      isError: myGroups?.isError,
      error: myGroups?.error,
    },
    {
      isError: data?.isError,
      error: data?.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = data;

    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit("");
    };
  }, [data]);

  useEffect(() => {
    if (chatId && data) {
      setGroupName(`${data?.chat?.name}`);
      setGroupNameUpdatedValue(`${data?.chat?.name}`);
    }

    return () => {
      setGroupName(``);
      setGroupNameUpdatedValue(``);
      setIsEdit(false);
    };
  }, [chatId]);

  const navigateBack = () => {
    navigate("/groups");
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const openAddMember = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteGroupHandler = () => {
    deleteGroup('Deleting Group...', chatId);
    navigate('/groups');
    setConfirmDeleteDialog(false);
  }

  const updateGroupNameHandler = () => {
    setIsEdit(false);
    updateGroup('Updating Group Name...', {
      chatId,
      name: groupNameUpdatedValue,
    })
  }

  const removeMemberHandler = (userId) => {
    removeMember('Removing member...', { chatId, userId});
  };
  
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            position: 'fixed',
            right: '1rem',
            top: '1rem',
          },
        }}
      >
      </Box>
      <Tooltip title='back'>
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: gray,
            color: 'black',
          }}
          onClick={navigateBack}
          >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  
  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size='large'
        color='error'
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
  
      <Button
        size='large'
        color='warning'
        variant='contained'
        startIcon={<AddIcon />}
        onClick={openAddMember}
      >
        Add Member
      </Button>
    </Stack>
  );
  
  
  const GroupName = (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        padding="1rem"
        spacing="1rem"
      >
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />
            <IconButton
              onClick={updateGroupNameHandler}
              disabled={isLoadingGroupName}
            >
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h5">Group Name: {groupName}</Typography>
            <IconButton
              onClick={() => setIsEdit(true)}
              disabled={isLoadingGroupName}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );
  
  return (
    <Grid container height={'100vh'}>
      <Grid
        item
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={myGroups} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}
            <Typography margin='2rem' alignSelf='flex-start' variant='body'>
              Members
            </Typography>
            <Stack
              maxWidth={'45rem'}
              width={'100%'}
              boxSizing={'border-box'}
              padding={{
                sm: '1rem',
                xs: '0',
                md: '1rem 4rem',
              }}
              spacing={'2rem'}
              height={'50vh'}
              overflow={'auto'}
            >
              {/* Members */}
              { isLoadingRemoveMember ? <CircularProgress /> :
               members.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  isAdded
                  styling={{
                    boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog chatId={chatId} />
          </Suspense>
        )
        }
        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog 
              open={confirmDeleteDialog}
              handleClose={() => setConfirmDeleteDialog(false)}
              deleteHandler={deleteGroupHandler}
            />
          </Suspense>
        )}
      </Grid>
    </Grid>
  )
}

export default ManageGroupLayout()(Group);