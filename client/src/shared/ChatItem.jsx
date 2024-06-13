import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents'
import AvatarCard from './AvatarCard'
import { Box, Stack, Typography } from '@mui/material';
import { gray, orange, white } from '../constants/color';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

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
        {/* <motion.div */}
        <div
          // initial={{ opacity: 0, y:'-100%' }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ delay: index * 0.01 }}
        
          style={{
             display: "flex",
             gap: "1rem",
             alignItems: "center",
             backgroundColor: sameSender ? gray : "unset",
             color: sameSender ? "black" : "unset",
            //  backgroundColor: sameSender ? gray : "black",
            //  color: sameSender ? 'black' : 'white',
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
                  margin: '2px',
                  marginBottom: 0,
                  position: 'absolute',
                  bottom: 0,
                  right: '1rem',
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