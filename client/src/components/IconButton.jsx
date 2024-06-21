import React, { memo } from "react";
import { Tooltip, IconButton, Badge, Avatar, Box, Typography } from '@mui/material';
import { useSelector } from "react-redux";

const IconBtn = ({ title, icon, onClick, value, color='inherit', sx, src, name }) => {
  const { theme } = useSelector(store => store.chat);
  return (
      <Tooltip title={title} sx={sx}>
        <IconButton size="large" onClick={onClick} style={{
          color: color,
          flexDirection: 'column',
        }}>
          { src ? 
            value ? <Badge 
            badgeContent={value} 
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: color === 'inherit' ? 'white' : color ,
                color: color === 'inherit' ? 'black' : 'white',
              },
            }}
            >{icon}</Badge> : <Avatar src={src} />
            :
            value ? <Badge 
                      badgeContent={value} 
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: color === 'inherit' ? theme : 'white' ,
                          color: color === 'inherit' ? 'white' : 'black',
                        },
                      }}
                    >{icon}</Badge> : icon
          } 
          {name &&
            <Typography sx={{
              fontSize: '0.6rem',
              display: {xs: 'flex', sm: 'none'}
            }}>{name}</Typography>
          }
        </IconButton>
      </Tooltip>
    );
};

export default memo(IconBtn)