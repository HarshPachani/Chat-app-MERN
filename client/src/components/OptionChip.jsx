import { Box, Chip } from '@mui/material'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

const OptionChip = ({ optionType, setOptionType }) => {
    const { theme } = useSelector(store => store.chat);
  return (
    <Box display={'flex'} alignItems={'center'} gap={1} margin={'0.5rem'} marginTop={0} padding={'0.5rem'} borderRadius={'1rem'}>
        <Chip
          label="All" 
          variant={optionType==='all' ? 'filled' : 'outlined'}
          clickable
          onClick={() => setOptionType('all')}
          sx={{
            bgcolor: optionType === 'all' ? theme : 'transparent',
            color: optionType === 'all' ? '#ffffff' : theme,
            borderColor: optionType !== 'all' && theme,
          }}
          />
        <Chip
          label="Unread"
          variant={optionType==='unread' ? 'filled' : 'outlined'}
          clickable
          onClick={() => setOptionType('unread')}
          sx={{
            bgcolor: optionType === 'unread' ? theme : 'transparent',
            color: optionType === 'unread' ? '#ffffff' : theme,
            borderColor: optionType !== 'unread' && theme,
          }}
          />
        <Chip
          label="Group"
          variant={optionType==='group' ? 'filled' : 'outlined'}
          clickable
          onClick={() => setOptionType('group')}
          sx={{
            bgcolor: optionType === 'group' ? theme : 'transparent',
            color: optionType === 'group' ? '#ffffff' : theme,
            borderColor: optionType !== 'group' && theme,
          }}
        />
    </Box>
  )
}

export default memo(OptionChip)