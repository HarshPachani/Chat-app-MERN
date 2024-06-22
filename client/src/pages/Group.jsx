import React, { Suspense, lazy, memo, useCallback, useEffect, useRef, useState } from 'react'
import ManageGroupLayout from '../components/ManageGroupLayout';
import { Backdrop, Box, Button, CircularProgress, Grid, IconButton, Menu as MenuIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { gray, orange, white } from '../constants/color';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, AccountCircle as ProfileIcon } from '@mui/icons-material';
import { useDeleteChatMutation, useGetChatDetailsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import UserItem from '../shared/UserItem';
import { useAsyncMutation, useErrors, useSocketEvents } from '../hooks/Hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember, setIsProfile } from '../redux/reducers/misc';
import { useSocket } from '../context/socket';
import { REFETCH_CHATS, REFETCH_GROUP_CHAT_MEMBERS } from '../constants/events';
import IconBtn from '../components/IconButton'
import { InputBox, Link } from '../styles/StyledComponents';
import AvatarCard from '../shared/AvatarCard';
import MenuAnchor from '../dialogs/MenuAnchor';

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


  const refetchListener = useCallback((data) => {
    refetch();
  }, [refetch]);

  const socketHandlers = {
    [REFETCH_GROUP_CHAT_MEMBERS]: refetchListener,
  }

  useSocketEvents(socket, socketHandlers);

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
      setGroupName('');
      setGroupNameUpdatedValue('');
      setMembers([]);
      setIsEdit(false);
    };
  }, [data]);

  useEffect(() => {
    setGroupName(groupNameUpdatedValue);
  }, [groupNameUpdatedValue]);

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
            display: chatId ? 'block' : 'none',
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
          paddingTop: 0,
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
               members?.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  isAdded
                  styling={{
                    boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
                    padding: { xs: 0, sm: '1rem 2rem' },
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
  )
}

const GroupsList = memo(({ w = "100%", myGroups = [], chatId }) => {
  const [search, setSearch] = useState('');
  const [groupChatList, setGroupChatList] = useState(myGroups);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector(store => store.auth);
  const { isProfile } = useSelector(store => store.misc);
  const { theme } = useSelector(store => store.chat);
  const dispatch = useDispatch();

  const profileAnchor = useRef(null);

  useEffect(() => {
    setGroupChatList(myGroups);
  }, [myGroups]);

  useEffect(() => {
    if (search.trim() === '') {
      setGroupChatList(myGroups);
    } else {
      const filteredGroups = myGroups.filter(group =>
        group.name.toLowerCase().includes(search.toLowerCase().trim())
      );
      setGroupChatList(filteredGroups);
    }
  }, [search, myGroups]);

  const handleMenuOpen = (e) => {
    setIsOpen(true);
    profileAnchor.current = e.currentTarget;
  }

  
  const openProfile = () => {
    setIsOpen(false);
    dispatch(setIsProfile(true));
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Grid
      item
      sx={{
        display: { xs: chatId ? 'none' : 'block', sm: 'block' },
        marginBottom: '5px',
        height: '100vh'
      }}
    >
      <MenuAnchor 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            dispatch={dispatch} 
            menuAnchor={profileAnchor} 
            openProfile={openProfile}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: white,
          borderRadius: '15px',
          padding: '5px',
          margin: '5px',
          height: { xs: '15%', sm: '12%' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          <Typography variant='h5' sx={{ marginLeft: '5px' }}>Groups</Typography>
           {
            user?.avatar?.url ? 
            <IconBtn 
                title={user?.username}
                src={user.avatar.url}
                color={isProfile ? theme : 'inherit'}
                sx={{
                    display: { xs: 'flex', sm: 'none' }
                }}
                onClick={handleMenuOpen}
            />
            : 
            <IconBtn 
                title={user?.username}
                icon={<ProfileIcon />}
                color={isProfile ? theme : 'inherit'}
                sx={{
                    display: { xs: 'flex', sm: 'none' }
                }}
                onClick={handleMenuOpen}
            />
          }
        </Box>
        <InputBox
          placeholder="Search Groups..."
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
      <Stack
        width={w}
        direction="column"
        sx={{
          height: '100%',
          overflow: 'auto',
          backgroundColor: white,
          borderRadius: '20px',
          marginRight: '5px',
          border: `2px solid white`
        }}
      >
        {groupChatList.length > 0 ? (
          groupChatList.map((group) => (
            <GroupListItem key={group._id} group={group} chatId={chatId} />
          ))
        ) : (
          <Typography textAlign="center" padding="1rem">
            No groups
          </Typography>
        )}
      </Stack>
    </Grid>
  );
})

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

export default memo(ManageGroupLayout()(Group));
export { GroupListItem, GroupsList };