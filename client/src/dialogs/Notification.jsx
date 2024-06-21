import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../redux/reducers/misc";
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/Hook";

const Notifications = () => {

  const { isLoading, data, error, isError } = useGetNotificationQuery();
  const [ acceptRequest ] = useAsyncMutation(useAcceptFriendRequestMutation);

  const { isNotification } = useSelector(state => state.misc);
  const dispatch = useDispatch();
  
  useErrors([{ error, isError }]);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Processing Request...", { requestId: _id, accept });
  }

  const closeHandler = () => dispatch(setIsNotification(false));

  return <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ sx: '1rem', sm: '2rem' }} maxWidth={'25rem'}>
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading ? (
            <Skeleton />
          ) : (
            <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map((i) => (
                <NotificationItem 
                key={i._id}
                sender={i.sender}
                _id={i._id}
                handler={friendRequestHandler} 
               />
            ))
            ) : ( 
             <Typography textAlign={'center'}>0 Notifications</Typography>
            )}
          </>
          ) 
        }
      </Stack>
    </Dialog>
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return <ListItem>
        <Stack 
          direction={'row'} 
          alignItems={'center'}
          spacing='1rem'
          width='100%'
        >
            <Avatar />

            <Tooltip title={`${name} sent you a friend request.`}>
                <Typography
                variant='body1'
                sx={{
                    flexGlow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                }}
                >
                    {`${name}`}
                </Typography>
            </Tooltip>

            <Stack direction={{
              xs: 'column',
              sm: 'row',
            }}>
              <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
              <Button color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>
            </Stack>
        </Stack>
    </ListItem>;
})

export default Notifications