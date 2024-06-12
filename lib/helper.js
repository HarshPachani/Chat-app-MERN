import { userSocketIDs } from "../server.js";

const getOtherMember = (members, userId) => {
    return members.find((member) => member._id.toString() !== userId.toString());
}

const getSockets = (users = []) => {
    const sockets = users.map((user) => userSocketIDs.get(user.toString()));
    return sockets;
}

export { getOtherMember, getSockets };