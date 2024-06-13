import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import UserItem from "../shared/UserItem";
import { useAvailableFriendsQuery, useAddGroupMemberMutation } from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/Hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { isAddMember } = useSelector(state => state.misc);
  const dispatch = useDispatch();
  
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMemberMutation);
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMembers('Adding Members...', { chatId, members: selectedMembers });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  
  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? <Skeleton /> : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem 
                key={i._id} 
                user={i} 
                handler={selectMemberHandler} 
                isAdded = {selectedMembers.includes(i._id)}
            />
            ))
          ) : (
            <Typography>No Friends</Typography>
          )}
        </Stack>

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMembers}
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
