import { createContext, ReactNode, useState } from "react";
import { BASE_URL, globalState, useGetAllSalesrepQuery, useGetAvailableSkillsListQuery, useGetNotificationsQuery, useGetPlatformsQuery, useGetRolesQuery, useGetTeamQuery, useGetTrainingsQuery } from "../../../api-feature/apiSlice";
import { APISTATUS, ApiType, notificationsType, platformType, SkillsType } from "../../../api-feature/types";
import { useContext } from "react";
import { appContext } from "./appContext";
import { SalesrepType } from "../../../api-feature/manager-owner/sales-rep/salesrep-type";
import { teamRoleType, teamType } from "../../../api-feature/manager-owner/team/team-type";
import { trainingModuleType } from "../../../api-feature/manager-owner/training/trainings-type";
import usePaginationLimit from "../util/usePaginationLimit";
import axios from "axios";
import useSearchTeam from "../util/useSearchTeam";

interface skillsApiType extends ApiType {
  data: {success: boolean, data:SkillsType[]}
}

interface salesrepApiType extends ApiType {
    data: {data: SalesrepType[], success: boolean}
}

interface teamRolesApiType extends ApiType {
    data: {data: teamRoleType[], success: boolean}
}

interface getTeamsApi extends ApiType {
    data: {data: {data: teamType[], page: number, totalPage: number, totalUser: number}, success: boolean}
}

interface trainingApi extends ApiType {
    data: {data: trainingModuleType[]}, success: boolean
}

interface platformApi extends ApiType {
    data: {data: platformType[], success: boolean}
}

interface notificationApi extends ApiType {
    data: {data: notificationsType[], success: boolean}
}

interface DataContextProps {
    availableSkills: SkillsType[],
    availableSkillsStatus: APISTATUS
    overallSalesrepData: SalesrepType[]
    salesRepsataStatus: APISTATUS
    teamRolesData: teamRoleType[]
    teamRolesDataStatus: APISTATUS
    teamData: teamType[]
    teamDataStatus: APISTATUS
    trainingModuleData: trainingModuleType[]
    trainingModuleStatus: APISTATUS,
    platformData: platformType[];
    platformStatus: APISTATUS;
    getMoreTeamData: () => void;
    notificationsData: notificationsType[];
    notificationStatus: APISTATUS;
    getProfileData: () => void;
}

const dataContext = createContext<DataContextProps>({
    availableSkills: [],
    availableSkillsStatus: "pending",
    overallSalesrepData: [],
    salesRepsataStatus: "pending",
    teamRolesData: [],
    teamRolesDataStatus: "pending",
    teamData: [],
    teamDataStatus: "pending",
    trainingModuleData: [],
    trainingModuleStatus: "pending",
    platformData: [],
    platformStatus: "pending",
    getMoreTeamData: () => {},
    notificationsData: [],
    notificationStatus: "uninitialized",
    getProfileData: () => {}
})
 
function DataContextProvider({ children }: { children: ReactNode }) {
    const {loggedIn, accountType, setUserProfile} = useContext(appContext)
    const {dataLimit, getMoreData} = usePaginationLimit()
    const {data: dataNoti, status: notificationStatus, error: notificationError} = useGetNotificationsQuery<notificationApi>(undefined, {skip: !loggedIn})
    const {data: platforms, status: platformStatus, error: platformError} = useGetPlatformsQuery<platformApi>(undefined, {skip: !loggedIn})
    const {data: availableSkillsData, status: availableSkillsStatus, error: availableSkillsError} = useGetAvailableSkillsListQuery<skillsApiType>(undefined, {skip: !loggedIn})
    const {data: modules, status: trainingModuleStatus, error: modulesError} = useGetTrainingsQuery<trainingApi>(undefined, {skip: !loggedIn})
    // Change For Manager and sales rep
    const {data: salesRep, status: salesRepsataStatus, error: salesRepError} = useGetAllSalesrepQuery<salesrepApiType>(undefined, {skip: !loggedIn})
    const {data: teamRoles, status: teamRolesDataStatus, error: teamRolesError} = useGetRolesQuery<teamRolesApiType>(undefined, {skip: !loggedIn})
    // For Manager Accounts
    const {data: teamMembers, status: teamDataStatus, error: teamDataError} = useGetTeamQuery<getTeamsApi>({page: 1, limit: dataLimit}, {skip: !loggedIn})

    const getMoreTeamData = () => {
        getMoreData()
    }

    const platformData = platforms?.data
    const overallSalesrepData = salesRep?.data
    const teamRolesData = teamRoles?.data
    const teamData = teamMembers?.data?.data
    const trainingModuleData = modules?.data
    const availableSkills = availableSkillsData?.data
    const notificationsData = dataNoti?.data

    const getProfileData = async () => {
        const response = await axios.get(`${BASE_URL}/user`, {
            headers: { Authorization: `Bearer ${globalState?.authorizationToken}` },
        }); 
        const data = response.data.data
        const current_subscription = response?.data?.current_subscription
        const completeData = {...data, current_subscription}
        console.log(completeData)
        setUserProfile(completeData)
    }

    const contextValue: DataContextProps = {
        availableSkills,
        availableSkillsStatus,
        overallSalesrepData,
        salesRepsataStatus,
        teamRolesData,
        teamRolesDataStatus,
        teamData,
        teamDataStatus,
        trainingModuleData,
        trainingModuleStatus,
        platformData,
        platformStatus,
        getMoreTeamData,
        notificationsData,
        notificationStatus,
        getProfileData
    }

    return (
        <dataContext.Provider value={contextValue} >{children}</dataContext.Provider>
    )
}

export {dataContext, DataContextProvider}