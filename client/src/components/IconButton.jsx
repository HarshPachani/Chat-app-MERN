import React from "react";
import { Tooltip, IconButton, Badge } from '@mui/material';
import { orange } from "../constants/color";

const IconBtn = ({ title, icon, onClick, value, color='inherit' }) => {
    return (
      <Tooltip title={title}>
        <IconButton size="large" onClick={onClick} style={{
          color: color
        }}>
          {
            value ? <Badge badgeContent={value} color='error'>{icon}</Badge> : icon
          }
        </IconButton>
      </Tooltip>
    );
  };

export default IconBtn