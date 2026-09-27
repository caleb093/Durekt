import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { trainingTopicType, trainingModuleType } from './trainings-type';

const trainingEndpoints = ( 
    builder: EndpointBuilder<
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
        'getAvailableSkills' | 'getDeals' | 'getDealNotes' | 'getTeams' | 'getProfile' | 'getSettings' | 'getNotifications' | 'getCompanies',
        'api'
    >) => ({
    getTrainings: builder.query<trainingModuleType[], void>({
        query: () => ({
            url: '/training',
            method: 'GET',
        }),
    }),
    getTrainingTopics: builder.query<trainingTopicType[], void>({
        query: () => ({
            url: '/training/training-topics',
            method: 'GET',
        }),
    }),
    postAssignTopic: builder.mutation<undefined, {userIds: number[], trainingTopicIds: number[], trainingId: number}>({
        query: (data) => ({
            url: `/training/${data.trainingId}/assign-topics`,
            method: 'POST',
            body: {userIds: data.userIds, trainingTopicIds: data.trainingTopicIds},
        }),
    }),
    getEnrolledTraining: builder.query<undefined, void>({
        query: () => ({
            url: `/training/enrolled`,
            method: 'GET',
        }),
    }),
    getUserEnrolledTopic: builder.query<undefined, string>({
        query: (topicId) => ({
            url: `/training/enrolled/${topicId}`,
            method: 'GET',
        }),
    }),
    getUserTopicProgress: builder.query<undefined, {trainingId: number, userId: number}>({
        query: (body) => {
            const {trainingId, userId} = body
            return {
                url: `/training/user-topic-progress/${userId}/${trainingId}`,
                method: 'GET',
        }},
    }),
    getUserTrainingProgress: builder.query<undefined, {trainingId: string | number}>({
        query: (trainingId) => ({
            url: `/training/progress/${trainingId}`,
            method: 'GET',
        }),
    }),
});

export default trainingEndpoints;