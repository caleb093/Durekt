import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const overviewEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
        'api'
    >) => ({
        getOverview: builder.query<undefined, void>({
            query: () => ({
                url: "/overview",
                method: "GET",
            })
        }),
        getRecentCalls: builder.query<undefined, void>({
            query: () => ({
                url: "/overview/recent-calls",
                method: "GET",
            })
        })
});

export default overviewEndpoints;