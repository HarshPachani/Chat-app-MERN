import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1/` }),
  tagTypes: ['Chat', 'User', 'Message'],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: 'chat/my',
        credentials: 'include',
      }),
      providedTags: ['Chat'],
    }),
    getChatDetails: builder.query({
        query: ({ chatId, populate=false }) => {
          let url = `chat/${chatId}`;
          if(populate) url+= '?populate=true';
  
          return ({
            url,
            credentials: "include",
          });
        },
        providedTags: ['Chat'], //For not caching for this API.
    }),
    getMessages: builder.query({
      query: ({ chatId, page=1, totalMessages }) => {
          return ({
            url: `chat/message/${chatId}?page=${page}&totalMessages=${totalMessages}`,
            credentials: "include",
          })
        },
        keepUnusedDataFor: 0,
      }
    ),  
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search-user?name=${name}`,
        credentials: 'include',
      }),
      providedTags: ['User'],
    }),
    getNotification: builder.query({
      query: () => ({
        url: 'user/notifications',
        credentials: 'include',
      }),
      keepUnusedDataFor: 0,
    }),
    availableFriends: builder.query({
      query: (chatId) => {
        let url = '/user/friends';
        if(chatId) url += `?chatId=${chatId}`;

        return { 
          url,
          credentials: 'include',
        };
      },
        providedTags: ['Chat']
      },
    ),
    myGroups: builder.query({
      query: ({ chatId, page }) => ({
          url: `chat/my/groups/`,
          credentials: "include",
        }),
        providedTags: ['Chat']
      },
    ),
    getOtherChatMember: builder.query({
      query: ({ chatId }) => ({
        url: `chat/members/${chatId}`,
        credentials: 'include',
      }),
      providedTags: ['Chat']
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: 'user/send-request',
        method: 'PUT',
        credentials: 'include',
        body: data,
      }),
      validateTags: ['User']
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: 'user/accept-request',
        method: 'PUT',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Chat'],  //Chat Refetch
    }),
    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: '/chat/new',
        method: 'POST',
        credentials: 'include',
        body: { name, members },
      }),
      invalidatesTags: ['Chat']
    }),
    removeGroupMember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chat/removemember`,
        method: 'PUT',
        credentials: 'include',
        body: { chatId, userId },
      }),
      invalidatesTags: ['Chat']
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: 'PUT',
        credentials: 'include',
        body: { name },
      }),
      invalidatesTags: ['Chat']
    }),
    addGroupMember: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `chat/addmembers`,
        method: 'PUT',
        credentials: 'include',
        body: { chatId, members },
      }),
      invalidatesTags: ['Chat']
    }),
    updateProfile: builder.mutation({
      query: ({ field, value }) => ({
        url: `user/profile/update?field=${field}`,
        method: 'PUT',
        credentials: 'include',
        body: { value }
      })
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: '/chat/message',
        method: 'POST',
        credentials: 'include',
        body: data,
      })
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Chat']
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Chat']
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useGetChatDetailsQuery,
  useGetMessagesQuery,
  useLazySearchUserQuery,
  useGetNotificationQuery,
  useAvailableFriendsQuery,
  useMyGroupsQuery,
  useGetOtherChatMemberQuery,

  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useNewGroupMutation,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
  useAddGroupMemberMutation,
  useUpdateProfileMutation,
  useSendAttachmentsMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
} = api;

