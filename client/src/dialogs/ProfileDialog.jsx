import { Avatar, Box, Dialog, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsProfile } from '../redux/reducers/misc';
import moment from 'moment';
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon,
    Edit as EditIcon,
    Done as DoneIcon,
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

const ProfileDialog = () => {
    const { isProfile } = useSelector((store) => store.misc);
    const { user } = useSelector(store => store.auth);
    const socket = useSocket();

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

  return (
    <Dialog open={isProfile} onClose={() => dispatch(setIsProfile(false))} fullWidth={true}>
        <Stack spacing={'2rem'} direction='column' alignItems='center' sx={{ margin: '15px' }}>
            <Avatar 
                src={user?.avatar?.url}
                sx={{
                width: 200,
                height: 200,
                objectFit: 'contain',
                marginBottom: '1rem',
                border: '5px solid white'
                }}
            />
            <ProfileCard heading={'Username'} text={user?.username} Icon={<UserNameIcon />} edit={true} editHandler={editHandler} />
            <ProfileCard heading={'Bio'} text={user?.bio} edit={true} editHandler={editHandler} />
            <ProfileCard heading={'Name'} text={user?.name} Icon={<FaceIcon />} edit={true} editHandler={editHandler} />
            <ProfileCard heading={'Joined'} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />} edit={false} />
            <Typography variant='caption' color='gray' >Customise Themes:</Typography>
            <Stack direction={'row'} spacing={'2rem'} alignItems={'center'}>
                {themes.map((theme, i) => <ThemeCard theme={theme} clickHandler={themeChanger} key={i} />)}
            </Stack>
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
    <Stack direction='row' alignItems='center' spacing='1rem' color='white' textAlign='center'>
        { Icon && Icon }
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
                    }}>
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
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
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