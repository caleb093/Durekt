import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const settingsEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        // 'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings',
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getTopSkills' | 'getCompanies',
        'api'
    >) => ({
        postUpdateProfile: builder.mutation<undefined, {first_name: string, last_name: string}>({
            query: (data) => ({
                url: `/user/update-profile`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["getProfile"]
        }),
        postUpdateProfileImage: builder.mutation<undefined, {profilePicture: File}>({
            query: (data) => {
                const imageData = new FormData()
                imageData.append("profilePicture", data.profilePicture);

                return ({
                    url: `/user/update-profile-image`,
                    method: 'POST',
                    // body: {profilePicture: {...file}}
                    body: imageData
                })
            },
            invalidatesTags: ["getProfile"]
        }),
        getFetchSettings: builder.query<undefined, void>({
            query: () => ({
                url: "/setting",
                method: "GET"
            }),
            providesTags: ["getSettings"]
        }),
        postUpdateSettings: builder.mutation<undefined, {bot: string, otherLanguageSupport: boolean, autoRecord: boolean}>({
            query: (data) => ({
                url: `/setting/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["getSettings"]
        }),
        getFetchCompanySkills: builder.query<undefined, void>({
            query: () => ({
                url: "/setting/company-skills",
                method: "GET"
            }),
            providesTags: ["getTopSkills"]
        }),
        postMarkAsFavourite: builder.mutation<undefined, {skillIds: number[], isFavourite: boolean}>({
            query: (data) => ({
                url: `/setting/mark-skill-as-favourite`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["getTopSkills"]
        }),

});

export default settingsEndpoints;