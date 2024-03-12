// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthapi = createApi({
  reducerPath: 'userAuthapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://project.vickytajpuriya.com/user/' }),
  endpoints:(builder) => ({
    registerUser : builder.mutation({
      query:(user)=>{
        return{
          url :'register/',
          method: 'POST',
          body: user,
          headers:{
            'Content-type' : 'application/json',
          }
        }
      }
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getLoggedUser: builder.query({
      query: (access_token) => {
        return {
          url: 'profile/',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    updateUserInfo: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'userinfo/',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    course: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'activecourse/',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'changepassword/',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    projects: builder.mutation({
      query: ( actualData ) => {
        return {
          url: 'project/',
          method:'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    updateprojects: builder.mutation({
      query: ( actualData ) => {
        const {id,...rest} = actualData
        console.log(rest)
        console.log(actualData)
        return {
          url: `project/${actualData.id}/`,
          method:'PUT',
          body: rest,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    deleteprojects: builder.mutation({
      query: ( actualData ) => {
        const {id,...rest} = actualData
        return {
          url: `project/${actualData.id}/`,
          method:'DELETE',
        }
      }
    }),
    activeCourse: builder.mutation({
      query: (actualData) => {
        return {
          url: 'activecourse/',
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'send-reset-password-email/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    registration: builder.mutation({
      query: (actualData) => {
        return {
          url: `/registration/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    refreshAccessToken: builder.mutation({
      query: (refreshToken) => {
        return {
          url: 'token/refresh/',
          method: 'POST',
          body: refreshToken,  // Fix: Pass the object directly
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),    
  }),
})

export const { useUpdateUserInfoMutation, useRegisterUserMutation, useLoginUserMutation, useActiveCourseMutation ,useGetLoggedUserQuery ,useProjectsMutation ,useUpdateprojectsMutation ,useDeleteprojectsMutation , useCourseMutation , useChangeUserPasswordMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation, useRegistrationMutation ,useRefreshAccessTokenMutation } = userAuthapi;


export const sipalayaApi = createApi({
  reducerPath: 'userAuthapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/sipalaya/' }),
  endpoints:(builder) => ({
    contact : builder.mutation({
      query:(user)=>{
        return{
          url :'contact/',
          method: 'POST',
          body: user,
          headers:{
            'Content-type' : 'application/json',
          }
        }
      }
    }),
  }),
})

  export const {useContactMutation} = sipalayaApi


export const PaymentApi = createApi({
  reducerPath: 'userAuthapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/payment' }),
  endpoints:(builder) => ({
    payment : builder.mutation({
      query:(user)=>{
        return{
          url :'payment/',
          method: 'POST',
          body: user,
          headers:{
            'Content-type' : 'application/json',
          }
        }
      }
    }),
  }),
})

  export const {usePaymentMutation} = PaymentApi


