import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { salesrepSkillsType, skillTrendType } from './skills-type';

const hubspotEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
        'api'
    >) => ({
    postGenerateAuth: builder.mutation<undefined, {platformId: number, callback: string}>({
        query: (body) => ({
            url: `/crm/authorization-url/${body.platformId}`,
            method: 'POST',
            body: {callback_url: body.callback},
        }),
        // invalidatesTags: ['getDeals']
    }),
    postVerifyHubAuth: builder.mutation<undefined, {state: string, code: string}>({
        query: (body) => ({
            url: '/crm/hub-callback',
            method: 'POST',
            body: body,
        }),
    }),
    postSyncDeals: builder.mutation<undefined, {platformId: number, dealIds: string[]}>({
        query: (body) => ({
            url: `/crm/sync-deals/${body.platformId}`,
            method: 'POST',
            body: {dealIds: body.dealIds},
        }),
    }),
    getImportDeals: builder.query<undefined, {platformId: number}>({
        query: (data) => (  {
            url: `crm/fetch-crm-deals/${data.platformId}`,
            method: 'GET',
        }),
    })
});

export default hubspotEndpoints;