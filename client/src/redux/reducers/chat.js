import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { blue, lightBlue, orange, purple } from "../../constants/color";

const getOrSetTheme = ({ value='' }) => {
    let theme = getOrSaveFromStorage({ key: 'THEME', get: true }) || 'orange';
    let color;
    if(value) {
        theme = value;
    }

    switch(theme){
      case 'orange':
        color=orange
        break;
      case 'purple':
        color=purple
        break;
      case 'blue':
        color=blue
        break;
      case 'lightBlue':
        color=lightBlue
        break;
      default:
        color = orange;
    }


    return color;
}

const initialState = {
    notificationCount: getOrSaveFromStorage({ key: 'NOTIFICATIONS', get: true }) || 0,
    newMessageAlert: getOrSaveFromStorage({ key: 'NEW_MESSAGE_ALERT', get: true }) || [
        {
            chatId: '',
            count: 0,
        }
    ],
    theme: getOrSetTheme({}),
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        incrementNotification: (state) => {
            state.notificationCount += 1;
            getOrSaveFromStorage({ key: 'NOTIFICATIONS', value: state.notificationCount })
            },
        resetNotificationCount: (state) => {
            state.notificationCount = 0;
            getOrSaveFromStorage({ key: 'NOTIFICATIONS', value: state.notificationCount })
        },
        setNewMessagesAlert: (state, action) => {
            const chatId = action.payload.chatId;
            const index = state.newMessageAlert.findIndex((item) => item.chatId === chatId);
            if(index !== -1) {
                state.newMessageAlert[index].count += 1; 
            } else {
                state.newMessageAlert.push({
                    chatId, count: 1
                })
            }
        },
        removeNewMessagesAlert: (state, action) => {
            state.newMessageAlert = state.newMessageAlert.filter(item => item.chatId !== action.payload);
        },
        setTheme: (state, action) => {
            getOrSaveFromStorage({ key: 'THEME', value: action.payload });
            state.theme = getOrSetTheme({ value: action.payload });
        }
    }
});


export default chatSlice;
export const { 
    incrementNotification,
    resetNotificationCount,
    setNewMessagesAlert,
    removeNewMessagesAlert,
    setTheme,
 } = chatSlice.actions;