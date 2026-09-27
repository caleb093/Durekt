import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const notificationEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
        'api'
    >) => ({
       getNotifications: builder.query<undefined,void>({
            query: () => ({
                url: "/notification",
                method: "GET"
            }),
            providesTags: ["getNotifications"]
        }),
        patchMarkNotification: builder.mutation<undefined, {id: number | string}>({
            query: (data) => ({
                url: `/notification/${data.id}/read`,
                method: 'PATCH',
                // body: data,
            })
        }),
       getMarkAllNotifications: builder.query<undefined,void>({
            query: () => ({
                url: "/notification/mark-as-read-all",
                method: "GET"
            }),
        }),
        deleteNotification: builder.mutation<undefined, {notificationId: number | string}>({
            query: (data) => ({
                url: `/notification/${data?.notificationId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['getNotifications']
        }),
        postDeleteManyNotification: builder.mutation<undefined, {notificationIds: string[]}>({
            query: (data) => ({
                url: `/notification/delete-many`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['getNotifications']
        }),

});

export default notificationEndpoints;