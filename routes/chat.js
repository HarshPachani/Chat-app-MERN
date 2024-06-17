import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { getMyChats, sendAttachments, getMyGroups, addMembers, removeMembers, leaveGroup, getMessages, getChatDetails, renameGroup, deleteChat, newGroupChat, getOtherChatMember, } from '../controllers/chat.js';
import { newGroupChatValidator, addMemberValidator, chatIdValidator, removeMemberValidator, sendAttachmentsValidator, renameGroupValidator, validateHandler } from '../lib/validators.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const router = express.Router();

router.use(isAuthenticated);

router.post('/new', newGroupChatValidator(), validateHandler,newGroupChat);
router.get('/my', getMyChats);
router.get('/my/groups', getMyGroups);

router.put('/addmembers', addMemberValidator(), validateHandler, addMembers);
router.put('/removemember', removeMemberValidator(), validateHandler, removeMembers);

router.delete('/leave/:id', chatIdValidator(), validateHandler, leaveGroup);

router.post('/message', attachmentsMulter, sendAttachmentsValidator(), validateHandler, sendAttachments);

router.get('/message/:id', chatIdValidator(), validateHandler, getMessages);

router.get('/members/:id', chatIdValidator(), validateHandler, getOtherChatMember);

router
  .route('/:id')
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameGroupValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default router;