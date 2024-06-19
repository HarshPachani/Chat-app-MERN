import { Search as SearchIcon } from '@mui/icons-material';
import { CircularProgress, Dialog, DialogTitle, InputAdornment, List, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../redux/reducers/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../redux/api/api';
import UserItem from '../shared/UserItem';
import { useAsyncMutation } from '../hooks/Hook';

const Search = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const { isSearch } = useSelector((store) => store.misc);

    const [searchUser, {isFetching}] = useLazySearchUserQuery();
    const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
    
    const dispatch = useDispatch();
    
    const searchCloseHandler = () => dispatch(setIsSearch(false));
    
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            searchUser(search)
                .then(({ data }) => setUsers(data?.users))
                .catch((err) => console.log(err))
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [search]);

    const addFriendHandler = async(id) => {
        await sendFriendRequest('Sending friend request...', { userId: id });
    };

    return (
        <Dialog open={isSearch} onClose={searchCloseHandler}>
            <Stack p='2rem' direction='column'>
                <DialogTitle textAlign={'center'}>Find People</DialogTitle>
                <TextField
                    label=''
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant='outlined'
                    size='small'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                    }}
                />

                <List>
                    {isFetching ? (<CircularProgress />) : (users.length > 0 &&
                        users?.map((user, index) => (
                            <UserItem 
                                user={user}
                                key={user._id}
                                handler={addFriendHandler}
                                handlerIsLoading={isLoadingSendFriendRequest}
                            />
                        ))
                    )}
                </List>
            </Stack>
        </Dialog>
    );
};

export default Search;