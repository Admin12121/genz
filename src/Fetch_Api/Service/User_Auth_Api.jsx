import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageServices";


export const userAuthapi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://project.vickytajpuriya.com/user/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: () => {
        const {access_token} = getToken();
        return {
          url: "profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    getUserProfile: builder.query({
      query: ({ username }) => {
        const {access_token} = getToken();
        return {
          url: `users/?name=${username}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    updateUserInfo: builder.mutation({
      query: ({ actualData }) => {
        const formData = new FormData();
        Object.keys(actualData).forEach((key) => {
          if (key !== "file") {
            formData.append(key, actualData[key]);
          }
        });

        // Add file data to FormData
        if (actualData.file) {
          formData.append("file", actualData.file);
        }
        console.log(formData);
        console.log(actualData);
        // return {
        //   url: 'userinfo/',
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     'authorization': `Bearer ${access_token}`,
        //     'Content-Type': 'application/json',
        //   }
        // }
      },
    }),
    course: builder.mutation({
      query: ({ actualData }) => {
        const {access_token} = getToken();
        return {
          url: "activecourse/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData }) => {
        const {access_token} = getToken();
        return {
          url: "changepassword/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    projectdata: builder.query({
      query: ({ username, project_title }) => {
        const {access_token} = getToken();
        return {
          url: `projects/?name=${username}&project_title=${project_title}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    project: builder.query({
      query: ({ page }) => {
        const {access_token} = getToken();
        return {
          url: `${page ? `projects/?page=${page}` : "projects/"} `,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    view: builder.query({
      query: ({ username }) => {
        const {access_token} = getToken();
        return {
          url: `projects/?name=${username}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    projects: builder.mutation({
      query: ({ actualData }) => {
        const {access_token} = getToken();
        return {
          url: "projects/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    projectsLike: builder.mutation({
      query: (id) => {
        const {access_token} = getToken();
        return {
          url: `projects/?id=${id}`,
          method: "PATCH",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    updateprojects: builder.mutation({
      query: ({ username, project_title, actualData, id }) => {
        const {access_token} = getToken();
        return {
          url: `projects/?name=${username}&project_title=${project_title}&id=${id}`,
          method: "PATCH",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    deleteprojects: builder.mutation({
      query: ({ id, username }) => {        
        const {access_token} = getToken();
        return {
        url: `projects/?name=${username}&id=${id}`, // Assuming projectId is the ID of the project you want to delete
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`, // Sending the username for permission check on the server side
        },
      }},
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "send-reset-password-email/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        const {access_token} = getToken();
        return {
          url: `/reset-password/${id}/${token}/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    registration: builder.mutation({
      query: (actualData) => {
        return {
          url: `/registration/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    refreshAccessToken: builder.mutation({
      query: (refreshToken) => {
        return {
          url: "token/refresh/",
          method: "POST",
          body: refreshToken, // Fix: Pass the object directly
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    feedback: builder.mutation({
      query: ({ actualData }) => {
        const {access_token} = getToken();
        return {
          url: "feedback",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useUpdateUserInfoMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedUserQuery,
  useGetUserProfileQuery,
  useProjectdataQuery,
  useProjectQuery,
  useViewQuery,
  useProjectsMutation,
  useProjectsLikeMutation,
  useUpdateprojectsMutation,
  useDeleteprojectsMutation,
  useCourseMutation,
  useChangeUserPasswordMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useRegistrationMutation,
  useRefreshAccessTokenMutation,
  useFeedbackMutation,
} = userAuthapi;

export const courseApi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_KEY_BACKEND_DOMAIN}/tutorials/`,
  }),
  endpoints: (builder) => ({
    course: builder.query({
      query: ({ name, video_title }) => {
        if (name) {
          const {access_token} = getToken();
          return {
            url: `course/?name=${name}`,
            method: "GET",
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          };
        } else if (video_title) {
          const {access_token} = getToken();
          return {
            url: `coursedata/?video_title=${video_title}`,
            method: "GET",
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          };
        } else {
          const {access_token} = getToken();
          return {
            url: `course/`,
            method: "GET",
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          };
        }
      },
    }),
  }),
});

export const { useCourseQuery } = courseApi;
