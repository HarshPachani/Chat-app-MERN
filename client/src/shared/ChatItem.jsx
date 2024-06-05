import React from 'react'
import { Link } from '../styles/StyledComponents'
import AvatarCard from './AvatarCard'
import { Stack, Typography } from '@mui/material';
import { gray, orange, white } from '../constants/color';

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
}) => {
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
            <AvatarCard avatar={avatar}/>
            <Stack>
                <Typography variant='h6'>{name}</Typography>
            </Stack>
              <Typography 
                sx={{
                  fontSize: '0.75rem',
                  padding: '0px 7px',
                  margin: '3px',
                  bgcolor: orange,
                  color: white,
                  borderRadius: '50%',
                  position: 'absolute',
                  right: 0,
              }}>1</Typography>
        </div>
    </Link>
  )
}

export default ChatItem