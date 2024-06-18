import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

//Skeleton Layout.
const LayoutLoader = () => {
  return (
    <Grid container height={'100%'} spacing='1rem'>
      <Grid
        item
        xs={0}
        sm={1}
        height={'100%'}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Skeleton variant='rounded' height={'100vh'} />
      </Grid>

      <Grid item xs={12} sm={4} height={'100%'}>
        <Stack spacing='1rem'>
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} variant='rounded' height={'3rem'} />
          ))}
        </Stack>
      </Grid>

      <Grid
        item
        xs={0}
        sm={7}
        md={7}
        height={'100%'}
      >
        <Stack spacing='1rem'>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} spacing='2rem' >
            <Skeleton variant='rounded' width='8%' height='100%' sx={{ borderRadius: '50%' }} />
            <Skeleton variant='rounded' width='80%' height='3rem' />
          </Box>
          {Array.from({ length: 11 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
              }}
            >
              <Skeleton
                variant='rounded'
                height='3rem'
                width='60%'
                sx={{
                  borderRadius: '1.5rem',
                  ...(index % 2 === 0 ? { marginLeft: '1rem' } : { marginRight: '1rem' }),
                }}
              />
            </Box>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction="row"
      padding="0.5rem"
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};

export { TypingLoader, LayoutLoader };
