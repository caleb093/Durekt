import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { dealSalesrepPerformanceType, dealsOverviewType, dealStagesType, dealsType } from './deal-type';

const dealsEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getMeetings' | 'getNotifications' | 'getCompanies',
        // 'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getMeetings',
        'api'
    >) => ({
    getDeals: builder.query<dealsType[], {page?: number, limit?: number, search?: string}>({
        query: ({page = 1, limit = 40, search = ""}) => ({
            url: '/deal',
            method: 'GET',
            params: {page: page, limit: limit, search: search}
        }),
        providesTags: ['getDeals']
    }),
    postCreateDeal: builder.mutation<undefined, {name: string, client: string, dealStageId: number, salesReps: number[]}>({
        query: (deal) => ({
            url: '/deal',
            method: 'POST',
            body: deal,
        }),
        invalidatesTags: ['getDeals']
    }),
    postEditDeal: builder.mutation<undefined, {name: string, client: string, dealId: number, dealStageId: number, salesReps: number[]}>({
        query: (deal) => {
            return ({
                url: `/deal/${deal.dealId}/update`,
                method: 'POST',
                body: deal,
        })},
        invalidatesTags: ['getDeals']
    }),
    getDealNotes: builder.query<undefined, void>({
        query: (dealId) => ({
            url: `/deal/${dealId}/note`,
            method: 'GET',
        }),
        providesTags: ['getDealNotes']
    }),
    getTimezones: builder.query<undefined, void>({
        query: () => ({
            url: `/deal/timezones`,
            method: 'GET',
        })
    }),
    postCreateNote: builder.mutation<undefined, {message: string, id: number}>({
        query: (data) => ({
            url: `/deal/${data.id}/note`,
            method: 'POST',
            body: {message: data.message},
        }),
        invalidatesTags: ['getDealNotes']
    }),
    postEditNote: builder.mutation<undefined, {message: string, dealId: number, noteId: number}>({
        query: (data) => ({
            url: `/deal/${data.dealId}/note/update/${data.noteId}`,
            method: 'POST',
            body: {message: data.message, dealId: Number(data.dealId), dealNoteId: data.noteId},
        }),
        invalidatesTags: ['getDealNotes']
    }),
    deleteNote: builder.mutation<undefined, {dealId: number, noteId: number}>({
        query: (data) => ({
            url: `/deal/${data?.dealId}/note/delete/${data?.noteId}`,
            method: "DELETE",
        }),
        invalidatesTags: ['getDealNotes']
    }),
    getMeetings: builder.query<undefined, string>({
        query: (id) => ({
            url: `/deal/${id}/meeting`,
            method: 'GET',
        }),
        providesTags: ["getMeetings"]
    }),
    postScheduleMeeting: builder.mutation<undefined, {id: string, body: {title: string, platform: string, scheduledTime: string, endTime: string, timezone: string, invite_emails: string[]}}>({
        query: (data) => ({
            url: `/deal/${data.id}/meeting`,
            method: 'POST',
            body: data.body,
        }),
        invalidatesTags: ["getMeetings"]
    }),
    getDealStages: builder.query<dealStagesType[], void>({
        query: () => ({
            url: '/deal/stages',
            method: 'GET',
        }),
        transformResponse: res => {
            // @ts-ignore
            return res.data as dealStagesType[]
        }
    }),
    getDealOverview: builder.query<{success: boolean, data: dealsOverviewType}, string>({
        query: (dealId) => ({
            url: `/deal/${dealId}/overview`,
            method: 'GET',
        }),
    }),
    getDealSalesrepPerformance: builder.query<{success: boolean, data: dealSalesrepPerformanceType}, string>({
        query: (dealId) => ({
            url: `/deal/${dealId}/deals-sales-rep-performance`,
            method: 'GET',
        }),
    })
});

export default dealsEndpoints;