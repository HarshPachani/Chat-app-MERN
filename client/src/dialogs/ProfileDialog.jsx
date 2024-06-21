import { Avatar, Box, Dialog, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsProfile } from '../redux/reducers/misc';
import moment from 'moment';
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon,
    Edit as EditIcon,
    Done as DoneIcon,
    CameraAlt as CameraAltIcon,
} from '@mui/icons-material'
import { useAsyncMutation, useSocketEvents } from '../hooks/Hook';
import { useUpdateProfileMutation } from '../redux/api/api';
import { REFETCH_PROFILE } from '../constants/events';
import { useSocket } from '../context/socket';
import { userExists, userNotExists } from '../redux/reducers/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import themes from '../constants/themes';
import IconBtn from '../components/IconButton';
import { setTheme } from '../redux/reducers/chat';
import { VisuallyHiddenInput } from '../styles/StyledComponents';
import { useFileHandler } from '6pp';

const ProfileDialog = () => {
    const { isProfile } = useSelector((store) => store.misc);
    const { user } = useSelector(store => store.auth);
    const socket = useSocket();

    const [isProfileChange, setIsProfileChange] = useState(false);

    const avatar = useFileHandler('single', 2);

    const dispatch = useDispatch();
    const [updateField] = useAsyncMutation(useUpdateProfileMutation);
    const editHandler = (field, value) => {
        updateField(`Updating ${field}...`, { field, value });
    }

    const refetchProfileListener = useCallback(async() => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile`, { withCredentials: true });
            dispatch(userExists(data?.user));
        } catch (err) {
            console.log(err.message);
            dispatch(userNotExists())      
        }
    }, [user]);

    const socketHandlers = {
        [REFETCH_PROFILE]: refetchProfileListener,
    }
    useSocketEvents(socket, socketHandlers);

    const themeChanger = (themeName) => {
        dispatch(setTheme(themeName));
    }

    const handleProfileChange = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Changing Profile Picture...');
        const formData = new FormData();
        formData.append('avatar', avatar.file);

        const config = {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };
      
        try {
            const { data } = await axios.put(
              `${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile/update/avatar`,
              formData,
              config
            );
    
            toast.success(data.message, { id: toastId });
        } catch (error) {
            toast.error(error?.response?.data?.message, { id: toastId });
        } finally {
            setIsProfileChange(false);
        }
    }

    useEffect(() => {
        avatar.preview = user?.avatar?.url;
    }, []);

    const handleAvatarChange = (e) => {
        avatar.changeHandler(e);
        setIsProfileChange(true);
    }

  return (
    <Dialog open={isProfile} onClose={() => dispatch(setIsProfile(false))} fullWidth={true}>
        <Stack spacing={'2rem'} direction='column' alignItems='center' justifyContent={'center'} sx={{ margin: '15px' }}>
            <form
                style={{
                  width: '100%',
                  marginTop: '1rem',
                }}
                onSubmit={handleProfileChange}
            >
                <Stack position='relative' width='10rem' margin='auto'>
                  <Avatar
                    sx={{
                      width: '10rem',
                      height: '10rem',
                      objectFit: 'contain',
                    }}
                    src={(user?.avatar?.url && !isProfileChange )? user.avatar.url : avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      color: 'white',
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      ':hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                    component='label'
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        onChange={handleAvatarChange}
                        type='file'
                      />
                    </>
                  </IconButton>
                  {
                  isProfileChange && 
                    <IconButton type='submit' sx={{width: 'fit-content'}} onClick={handleProfileChange}>
                        <DoneIcon />
                    </IconButton>
                  }
                </Stack>
                {avatar.error && (
                  <Typography
                    m='1rem auto'
                    width='fit-content'
                    display='block'
                    color='error'
                    variant='caption'
                  >
                    {avatar.error}
                  </Typography>
                )}
            </form>
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ProfileCard heading={'Username'} text={user?.username} edit={true} editHandler={editHandler} />
                <ProfileCard heading={'Bio'} text={user?.bio} edit={true} editHandler={editHandler} />
                <ProfileCard heading={'Name'} text={user?.name} edit={true} editHandler={editHandler} />
                <ProfileCard heading={'Joined'} text={moment(user?.createdAt).fromNow()} edit={false} />
                <Typography variant='caption' color='gray' marginBottom={0} marginTop='2rem'>Customize Themes:</Typography>
                <Stack direction={'row'} spacing={'2rem'} alignItems={'center'} >
                    {themes.map((theme, i) => <ThemeCard theme={theme} clickHandler={themeChanger} key={i} />)}
                </Stack>
            </Box>
        </Stack>
    </Dialog>
  )
}

const ProfileCard = ({ text, Icon, heading, edit, editHandler }) => {
    const [editValue, setEditValue] = useState(text);
    const [isEdit, setIsEdit] = useState(false);

    const editProfile = () => {
        if(!editValue) {
            toast.error(`${heading} can not be Empty!`);
            return;
        }
        switch(heading){
            case 'Username':
                editHandler('username', editValue);
                break;
            case 'Bio':
                editHandler('bio', editValue);
                break;
            case 'Name':
                editHandler('name', editValue);
                break;
            default:
                setIsEdit(false);
        }
        setIsEdit(false);
    }
    return (
    <Stack direction='row' alignItems='center' justifyContent='center' spacing='1rem' color='white' textAlign='center'>
        <Stack>
            <Typography variant='caption' color='gray' >{heading}</Typography>
            {
                isEdit ? (
                    <>
                    <Box 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextField 
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                        />
                        <IconButton
                            onClick={editProfile}
                        >
                            <DoneIcon />
                        </IconButton>        
                    </Box>
                    </>
                ) : (
                    <>
                    <Box 
                    sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography variant='body1' color='black' >{editValue}</Typography>
                        { edit && (
                            <IconButton
                                onClick={() => setIsEdit(true)}
                            >
                                <EditIcon />
                            </IconButton>
                        )}
                    </Box>
                    </>
                )
            }
        </Stack>
    </Stack>);
}

const ThemeCard = ({ theme, clickHandler }) => {
    return (
        <IconBtn
            width={'5px'}
            height={'5px'} 
            variant='caption' 
            sx={{
                backgroundColor: theme,
                borderRadius: '50%',
            }}
            onClick={() => clickHandler(theme)}
        />
    )
}

export default ProfileDialog