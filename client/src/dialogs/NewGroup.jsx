import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography, } from "@mui/material";
import React, { useState } from "react";
import UserItem from "../shared/UserItem";
import { useErrors, useAsyncMutation } from "../hooks/Hook";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setIsNewGroup } from "../redux/reducers/misc";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../redux/api/api";

const NewGroups = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((store) => store.misc);

  const { isError, error, isLoading, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const [groupName, setGroupName] = useState('');

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup('Creating New Group...', { name: groupName, members: selectedMembers });
    dispatch(setIsNewGroup(false));
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={"2rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i, index) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
