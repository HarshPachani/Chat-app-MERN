import React from 'react'
import { Link } from '../styles/StyledComponents'
import AvatarCard from './AvatarCard'
import { Stack, Typography } from '@mui/material';

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
      }}
      to={`/chat/${_id}`}
    >
        <div
            style={{
               display: "flex",
               gap: "1rem",
               alignItems: "center",
               backgroundColor: sameSender ? "black" : "unset",
               color: sameSender ? "white" : "unset",
               position: "relative",
               padding: "1rem",
            }}
        >
            <AvatarCard avatar={avatar}/>
            <Stack>
                <Typography>{name}</Typography>
            </Stack>
        </div>
    </Link>
  )
}

export default ChatItem