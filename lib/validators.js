import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerValidator = () => [
    body('name', 'Please Enter name').notEmpty(),
    body('username', 'Please Enter Username').notEmpty(),
    body('password', 'Please Enter Password').notEmpty(),
    body('bio', 'Please Enter Bio').notEmpty(),
];

const loginValidator = () => [
    body('username', 'Please Enter Username').notEmpty(),
    body('password', 'Please Enter Password').notEmpty(),
]

const sendFriendRequestValidator = () => [
    body('userId', 'Please Enter User ID').notEmpty(),
];

const acceptFriendRequestValidator = () => [
    body('requestId', 'Please Enter Request ID').notEmpty(),
    body('accept')
      .notEmpty()
      .withMessage('Please Add Accept')
      .isBoolean()
      .withMessage('Accept Must be Boolean'),
]

const sendAttachmentsValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
];

const addMemberValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    body("members")
      .notEmpty()
      .withMessage("Please Enter Members")
      .isArray({ min: 1, max: 97 })
      .withMessage("Members must be 1-97"),
];


const newGroupChatValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("members")
      .notEmpty()
      .withMessage("Please Enter Members")
      .isArray({ min: 2, max: 100 })
      .withMessage("Members must be 2-100"),
];


const removeMemberValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    body("userId", "Please Enter User ID").notEmpty(),
];


const chatIdValidator = () => [param("id", "Please Enter Chat ID").notEmpty()];
  
const renameGroupValidator = () => [
    param("id", "Please Enter Chat ID").notEmpty(),
    body("name", "Please Enter New Name").notEmpty(),
];
  

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
    
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(", ");
  
    if (errors.isEmpty()) return next();
  
    return next(new ErrorHandler(errorMessages, 400));
};


 export {
    newGroupChatValidator,
    registerValidator,
    validateHandler,
    loginValidator,
    sendFriendRequestValidator,
    acceptFriendRequestValidator,
    sendAttachmentsValidator,
    addMemberValidator,
    removeMemberValidator,
    chatIdValidator,
    renameGroupValidator,
}