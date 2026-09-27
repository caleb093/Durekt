import { globalState } from '../../apiSlice';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { AuthResponseType } from '../../types';

const authEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
        'api'
    >) => ({
    authSignIn: builder.mutation<AuthResponseType, { email: string; password: string }>({
        query: (details) => ({
        url: '/auth/login',
        method: 'POST',
        body: details,
        }),
        invalidatesTags: ['getAvailableSkills'],
    }),
    authSignUp: builder.mutation({
        query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
        }),
        transformResponse: (res) => {
        return res;
        },
    }),
    getOTP: builder.mutation({
        query: () => ({
            url: "/auth/send-otp",
            method: "POST",
            body: {},
            headers: {
                Authorization: `Bearer ${globalState.authorizationToken}`,
            },
        })
    }),
    verifyOTP: builder.mutation({
        query: (body) => ({
            url: "/auth/verify-otp",
            method: "POST",
            body: body,
            headers: {
                Authorization: `Bearer ${globalState.authorizationToken}`,
            },
        })
    }),
    changePassword: builder.mutation<undefined, {currentPassword: string, newPassword: string}>({
        query: (body) => ({
            url: "/auth/change-password",
            method: "POST",
            body: body,
            // headers: {
            //     Authorization: `Bearer ${globalState.authorizationToken}`,
            // },
        })
    }),
    forgetPassword: builder.mutation<undefined, {email: string}>({
        query: (body) => ({
            url: "/auth/forget-password",
            method: "POST",
            body: body,
            // headers: {
            //     Authorization: `Bearer ${globalState.authorizationToken}`,
            // },
        })
    }),
    verifyForgetPassword: builder.mutation<undefined, {email: string, otp: string, newPassword: string}>({
        query: (body) => ({
            url: "/auth/forget-passord-verify",
            method: "POST",
            body: body,
            // headers: {
            //     Authorization: `Bearer ${globalState.authorizationToken}`,
            // },
        })
    }),
});

export default authEndpoints;