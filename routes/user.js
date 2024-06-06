import express from 'express';
import { registerValidator, validateHandler, loginValidator, sendFriendRequestValidator, acceptFriendRequestValidator } from '../lib/validators.js';
import { getMyProfile, login, logout, newUser, searchUser, searchFriends, sendFriendRequest, acceptFriendRequest,allNotifications, getMyFriends } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/new', registerValidator(), validateHandler, newUser);
router.post('/login', loginValidator(), validateHandler, login);

router.use(isAuthenticated);

router.get('/profile', getMyProfile);
router.get('/logout', logout);
router.get('/search-user', searchUser);

//Implement later, after creating chats.
router.get('/search-friends', searchFriends);

router.put('/send-request', sendFriendRequestValidator() ,validateHandler, sendFriendRequest);
router.put('/accept-request', acceptFriendRequestValidator() ,validateHandler, acceptFriendRequest);

router.get('/notifications', allNotifications);
router.get('/friends', getMyFriends);

export default router;