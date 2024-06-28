import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents'
import AvatarCard from './AvatarCard'
import { Box, Stack, Typography } from '@mui/material';
import { gray, white } from '../constants/color';
import { useSelector } from 'react-redux';

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    index = 0,
    newMessageAlert,
}) => {
  const { theme } = useSelector(store => store.chat);
  
  return (
    <Link
      sx = {{
          padding: '0',
          borderRadius: '10px 10px 10px 0px'
      }}
      to={`/chat/${_id}`}
    >
        <div
          style={{
             display: "flex",
             gap: "1rem",
             alignItems: "center",
             backgroundColor: sameSender ? gray : "unset",
             color: sameSender ? "black" : "unset",
             position: "relative",
             padding: "1rem",
          }}
        >
          <div
            style={{
              position: 'relative',
            }}
          >
            <AvatarCard avatar={avatar}/>
            {(isOnline && !groupChat) && (
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'green',
                  border: '0.5px solid white',
                  margin: '2px',
                  marginBottom: 0,
                  position: 'absolute',
                  bottom: 0,
                  right: { xs: '1.7rem', sm: '1rem' },
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </div>
            <Stack>
                <Typography variant='h6'>{name}</Typography>
            </Stack>
              <Typography 
                sx={{
                  fontSize: '0.75rem',
                  padding: '0px 7px',
                  margin: '3px',
                  bgcolor: theme,
                  color: white,
                  borderRadius: '50%',
                  position: 'absolute',
                  right: 0,
              }}>{newMessageAlert?.count}</Typography>
        </div>
    </Link>
  )
}

export default memo(ChatItem)