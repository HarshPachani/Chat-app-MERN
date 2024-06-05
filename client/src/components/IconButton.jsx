import React from "react";
import { Tooltip, IconButton, Badge } from '@mui/material';

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
          {
            value ? <Badge badgeContent={value} color='error'>{icon}</Badge> : icon
          }
        </IconButton>
      </Tooltip>
    );
  };

export default IconBtn