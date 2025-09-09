import { apiSlice } from "../apiSlice";

const USER_URL = "/user";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    deteteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getTeamList: builder.query({
      query: () => ({
        url: `${USER_URL}/get-team`,
        method: "GET",
        credentials: "include",
      }),
    }),
    userAction: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `${USER_URL}/notifications`,
        method: "GET",
        credentials: "include",
      }),
    }),
    markNotiAsRead: builder.mutation({
      query: ({ type, id }) => {
        console.log("LLAMADA MUTATION:", type, id); // 👀
        return {
          url: `${USER_URL}/read-noti?isReadType=${type}&id=${id}`,
          method: "PUT",
          credentials: "include",
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-password`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetTeamListQuery,
  useDeteteUserMutation,
  useUserActionMutation,
  useGetNotificationsQuery,
  useMarkNotiAsReadMutation,
  useChangePasswordMutation,
} = userApiSlice;
