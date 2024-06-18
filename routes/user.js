import express from 'express';
import { registerValidator, validateHandler, loginValidator, sendFriendRequestValidator, acceptFriendRequestValidator } from '../lib/validators.js';
import { getMyProfile, login, logout, newUser, searchUser, searchFriends, sendFriendRequest, acceptFriendRequest,allNotifications, getMyFriends, updateProfile, updateProfilePic } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { singleAvatar } from '../middlewares/multer.js';

const router = express.Router();

router.post('/new', singleAvatar, registerValidator(), validateHandler, newUser);
router.post('/login', loginValidator(), validateHandler, login);

router.use(isAuthenticated);

router.get('/profile', getMyProfile);
router.get('/logout', logout);
router.get('/search-user', searchUser);

router.put('/profile/update', updateProfile);
router.put('/profile/update/avatar', singleAvatar, updateProfilePic);
router.put('/send-request', sendFriendRequestValidator() ,validateHandler, sendFriendRequest);
router.put('/accept-request', acceptFriendRequestValidator() ,validateHandler, acceptFriendRequest);

router.get('/notifications', allNotifications);
router.get('/friends', getMyFriends);

export default router;