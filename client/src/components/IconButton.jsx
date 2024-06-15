import React, { memo } from "react";
import { Tooltip, IconButton, Badge, Avatar } from '@mui/material';

// lightBlue: info
// orange: warning
// blue: primary

const IconBtn = ({ title, icon, onClick, value, color='inherit', sx, src }) => {
  return (
      <Tooltip title={title} sx={sx}>
        <IconButton size="large" onClick={onClick} style={{
          color: color
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
                          backgroundColor: color === 'inherit' ? 'white' : color ,
                          color: color === 'inherit' ? 'black' : 'white',
                        },
                      }}
                    >{icon}</Badge> : icon
          }
        </IconButton>
      </Tooltip>
    );
};

export default memo(IconBtn)