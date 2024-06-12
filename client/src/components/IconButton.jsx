import React from "react";
import { Tooltip, IconButton, Badge } from '@mui/material';

const IconBtn = ({ title, icon, onClick, value, color='inherit', sx }) => {
    return (
      <Tooltip title={title} sx={sx}>
        <IconButton size="large" onClick={onClick} style={{
          color: color
        }}>
          {
            value ? <Badge badgeContent={value} color='warning'>{icon}</Badge> : icon
          }
        </IconButton>
      </Tooltip>
    );
  };

export default IconBtn