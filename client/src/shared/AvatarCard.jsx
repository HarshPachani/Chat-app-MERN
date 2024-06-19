import React, { memo } from 'react'
import { Avatar, AvatarGroup, Stack, Box } from '@mui/material'

const AvatarCard = ({ avatar=[], max=4 }) => {
  return (
    <Stack 
        direction={'row'} 
        spacing={0.5}
    >
        <AvatarGroup
            max={max}
            sx={{
                position: 'relative'
            }}
        >
            <Box width={'5rem'} height={'3rem'} />
            {avatar && avatar?.map((i, index) => (
                <Avatar
                  key={Math.random()*100} 
                  src={i?.avatar ? i?.avatar?.url : i} 
                  alt={`Avatar ${index}`}
                  sx={{
                    width: '3rem',
                    height: '3rem',
                    position: 'absolute',
                    left: {
                        xs: `${0.5 + index}rem`,
                        sm: `${index+1}rem`
                    }
                  }} 
                />
            ))}
        </AvatarGroup>
    </Stack>
  )
}

export default memo(AvatarCard)