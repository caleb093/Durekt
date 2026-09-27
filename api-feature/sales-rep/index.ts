import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const salesrepDashboardEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
        'api'
    >) => ({
        getSalesDashOverview: builder.query<undefined, void>({
            query: () => ({
                url: "/sales-rep/my-overall",
                method: "GET",
            })
        }),
        getSalesDashAreaOfConcern: builder.query<undefined, void>({
            query: () => ({
                url: "/sales-rep/areas-of-concern",
                method: "GET",
            })
        }),
        getSalesDashScheduledTraining: builder.query<undefined, void>({
            query: () => ({
                url: "/sales-rep/scheduled-trainings",
                method: "GET",
            })
        }),
        getSalesDashAssignedDeals: builder.query<undefined, void>({
            query: () => ({
                url: "/sales-rep/assigned-deals",
                method: "GET",
            })
        }),
        getSalesDashActivities: builder.query<undefined, void>({
            query: () => ({
                url: "/sales-rep/activities",
                method: "GET",
            })
        }),
        getSalesDashInsights: builder.query<undefined, void>({
            query: () => ({
                url: "/user/insights",
                method: "GET",
            })
        })
});

export default salesrepDashboardEndpoints;