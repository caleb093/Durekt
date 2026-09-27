import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { subHistoryType, subscriptionType } from './subscription-type';

const subscriptionEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        // 'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings',
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
        'api'
    >) => ({
        getSubscriptions: builder.query<subscriptionType[] ,void>({
            query: () => ({
                url: `/subscription`,
                method: "GET"
            })
        }),
        getSubscriptionHistory: builder.query<subHistoryType[] ,void>({
            query: () => ({
                url: `/subscription/history`,
                method: "GET"
            })
        }),
        postMakePayment: builder.mutation<undefined, {planId: number, success_url: string, cancel_url: string}>({
            query: (data) => ({
                url: `/subscription/subscribe`,
                method: 'POST',
                body: data,
            })
        }),
        postVerifyPayment: builder.mutation<undefined, {id: number, reference: string}>({
            query: (data) => ({
                url: `/subscription/verify-payment`,
                method: 'POST',
                body: data,
            })
        }),
        postCancelSubscription: builder.mutation<undefined, {id: number}>({
            query: (data) => ({
                url: `/subscription/cancel-subscription`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["getProfile"]
        }),

});

export default subscriptionEndpoints;