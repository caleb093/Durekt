import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { salesrepSkillsType, skillTrendType } from './skills-type';

const skillsEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
        'api'
    >) => ({
    getSalesrepSkills: builder.query<{success: boolean; data:{ salesReps: salesrepSkillsType[]}}, void>({
        query: () => ({
            url: '/skills/sales-rep',
            method: 'GET',
        }),
    }),
    getSkillTrends: builder.query<{data: {skills: skillTrendType[]}}, void>({
        query: () => ({
            url: '/skills/trend',
            method: 'GET',
        }),
    })
});

export default skillsEndpoints;