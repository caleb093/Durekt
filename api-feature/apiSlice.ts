import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { ACCOUNT_TYPE, AuthResponseType, SkillsType } from "./types";
import {authEndpoints, teamEndpoints, settingsEndpoints, hubspotEndpoints, subscriptionEndpoints, notificationEndpoints, teamRatingEndpoints, trainingEndpoints, dealsEndpoints, salesRepEndpoints, companyEndpoints, skillsEndpoints, overviewEndpoints, salesrepDashboardEndpoints} from "./index"

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface globalStateType {
    userId: string,
    account_type: ACCOUNT_TYPE
    authorizationToken: string
    currentUser: {
        firstName: string,
        lastName: string,
        email: string,
        company: {
            id: number,
            name: string,
            position: string,
            role: string
        }
    }
}

export const globalState: globalStateType = {
    userId: "",
    account_type: "",
    authorizationToken: "",
    currentUser: {
        firstName: "",
        lastName: "",
        email: "",
        company: {
            id: 0,
            name: "",
            position: "",
            role: ""
        }   
    }
};

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ['getAvailableSkills', 'getDeals' , 'getDealNotes', 'getTeams', 'getProfile', 'getSettings', 'getNotifications', 'getCompanies'],
    // baseQuery: fetchBaseQuery({
    //     baseUrl: BASE_URL
    // }),
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = globalState.authorizationToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: builder => ({
        ...authEndpoints(builder),
        ...companyEndpoints(builder),
        ...teamRatingEndpoints(builder),
        ...salesRepEndpoints(builder),
        ...teamEndpoints(builder),
        ...dealsEndpoints(builder),
        ...trainingEndpoints(builder),
        ...skillsEndpoints(builder),
        ...overviewEndpoints(builder),
        ...salesrepDashboardEndpoints(builder),
        ...settingsEndpoints(builder),
        ...subscriptionEndpoints(builder),
        ...notificationEndpoints(builder),
        ...hubspotEndpoints(builder),
        getAvailableSkillsList: builder.query<SkillsType[], void>({
            query: () => ({
                url: "/company/available-skills",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${globalState.authorizationToken}`,
                }
            }),
            providesTags: ['getAvailableSkills']
        }),
        getInsights: builder.query<undefined, number>({
            query: (userId) => ({
                url: `/user/${userId}/insights`,
                method: "GET"
            })
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${globalState.authorizationToken}`,
                }
            }),
            providesTags: ["getProfile"]
        }),
        getPlatforms: builder.query<undefined, "CRM" | undefined>({
            query: (crm) => ({
                url: "/setting/platforms",
                method: "GET",
                params: {type: crm}
            }),
            providesTags: ['getProfile']
        }),
    })
})

export const {
    // Auth
    useAuthSignUpMutation,
    useAuthSignInMutation,
    useGetOTPMutation,
    useVerifyOTPMutation,
    useGetUserProfileQuery,
    useChangePasswordMutation,
    useForgetPasswordMutation,
    useVerifyForgetPasswordMutation,

    // Companies
    usePostCreateCompanyMutation,
    useGetCompaniesQuery,
    usePostSwitchCompaniesMutation,
    useGetAvailableSkillsListQuery,
    usePostAuditLogsMutation,
    usePostCreateEnquiresMutation,
    usePostEditCompaniesNameMutation,
    usePostSwitchRoleMutation,

    // Team Rating
    useGetTopSalesrepQuery,
    useGetOverallRatingQuery,
    useGetTeamRatingQuery,

    // Sales Rep
    useGetAllSalesrepQuery,
    useGetSalesrepPerformanceQuery,
    useGetSalesrepDealsQuery,
    useGetSalesrepAreaOfConcernQuery,
    useGetSalesrepScheduledTrainingQuery,
    useGetSalesRepActivitiesQuery,
    usePostSendSalesrepMessageMutation,

    // Team
    useGetTeamQuery,
    usePostInviteTeamMutation,
    useAcceptInviteMutation,
    useGetRolesQuery,
    useUpdateRoleMutation,

    // Deals
    useGetDealsQuery,
    usePostCreateDealMutation,
    usePostEditDealMutation,
    useGetDealNotesQuery,
    usePostCreateNoteMutation,
    usePostEditNoteMutation,
    useDeleteNoteMutation,
    useGetMeetingsQuery,
    usePostScheduleMeetingMutation,
    useGetDealStagesQuery,
    useGetDealOverviewQuery,
    useGetDealSalesrepPerformanceQuery,
    useGetTimezonesQuery,

    // Training
    useGetTrainingsQuery,
    useGetTrainingTopicsQuery,
    usePostAssignTopicMutation,
    useGetEnrolledTrainingQuery,
    useGetUserEnrolledTopicQuery,
    useGetUserTopicProgressQuery,
    useGetUserTrainingProgressQuery,

    // Skills
    useGetSalesrepSkillsQuery,
    useGetSkillTrendsQuery,

    // Subscription
    useGetSubscriptionsQuery,
    usePostMakePaymentMutation,
    usePostVerifyPaymentMutation,
    usePostCancelSubscriptionMutation,
    useGetSubscriptionHistoryQuery,

    // Overview
    useGetOverviewQuery,
    useGetRecentCallsQuery,

    // SalesRepDashboard
    useGetSalesDashOverviewQuery,
    useGetSalesDashAreaOfConcernQuery,
    useGetSalesDashScheduledTrainingQuery,
    useGetSalesDashAssignedDealsQuery,
    useGetSalesDashActivitiesQuery,
    useGetSalesDashInsightsQuery, 

    // Settings
    usePostUpdateProfileImageMutation,
    usePostUpdateProfileMutation,
    useGetFetchSettingsQuery,
    usePostUpdateSettingsMutation,
    useGetFetchCompanySkillsQuery,
    usePostMarkAsFavouriteMutation,

    // Notifications
    useGetNotificationsQuery,
    usePatchMarkNotificationMutation,
    useDeleteNotificationMutation,
    useGetMarkAllNotificationsQuery,
    usePostDeleteManyNotificationMutation,

    // CRM (Hubspot)
    usePostGenerateAuthMutation,
    usePostVerifyHubAuthMutation,
    usePostSyncDealsMutation,
    useGetImportDealsQuery,

    // /////////////
    useGetInsightsQuery,
    useGetPlatformsQuery,

} = apiSlice

