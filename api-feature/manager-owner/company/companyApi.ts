import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { AuditLogType } from './company-type';

const companyEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies', 
        'api'
    >) => ({
    postCreateCompany: builder.mutation<unknown, {name: string, skills: {skillId: number}[]}>({
        query: (body) => ({
            url: "/company",
            method: "POST",
            body: body,
        })
    }),
    getCompanies: builder.query<undefined, void>({
        query: () => ({
            url: "/company/user-companies",
            method: "GET",
        }),
        providesTags: ["getCompanies"]
    }),
    postSwitchCompanies: builder.mutation({
        query: (body) => ({
            url: "/company/switch-company",
            method: "POST",
            body: body,
        })
    }),
    postAuditLogs: builder.mutation<{success: boolean, data: AuditLogType[]}, {userId: string, start_date: string, end_date: string, roleId: number}>({
        query: (body) => ({
            url: "/company/audit-logs",
            method: "POST",
            body: body,
        })
    }),
    postCreateEnquires: builder.mutation<unknown, {email: string, description: string, subject: string}>({
        query: (body) => ({
            url: "/company/enquiries",
            method: "POST",
            body: body,
        })
    }),
    postEditCompaniesName: builder.mutation<unknown, {name: string, id: number}>({
        query: (body) => ({
            url: "/company/update-company",
            method: "POST",
            body: body,
        })
    }),
    postSwitchRole: builder.mutation<unknown, {roleId: number}>({
        query: (body) => ({
            url: "/company/switch-role",
            method: "POST",
            body: body,
        })
    }),
});

export default companyEndpoints;