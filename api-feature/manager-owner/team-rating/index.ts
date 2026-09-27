import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SalesrepType } from '../sales-rep/salesrep-type';
import { ratingType, teamRatingType } from './teamrating-type';

const teamRatingEndpoints = (
        builder: EndpointBuilder<
            BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
            'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
            'api'
        >
    ) => ({
        getTopSalesrep: builder.query<SalesrepType, void>({
            query: () => ({
                url: "/ratings/top-sales-reps",
                method: "GET",
            })
        }),
        getOverallRating: builder.query<ratingType, void>({
            query: () => ({
                url: "/ratings/overall",
                method: "GET",
            })
        }),
        // Requires Params
        getTeamRating: builder.query<teamRatingType[], {start: string, end: string}>({
            query: (date) => ({
                url: "/ratings",
                params: {startDate: date.start, endDate: date.end},
                method: "GET",
            })
        }),
})

export default teamRatingEndpoints