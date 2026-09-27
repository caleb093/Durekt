import axios from "axios"
import { useCallback, useState } from "react"
import { BASE_URL, globalState } from "../../../api-feature/apiSlice"
import { teamType } from "../../../api-feature/manager-owner/team/team-type"
import useLoading from "./useLoading"

const useSearchTeam = () => {
    const [filteredTeam, setFilteredTeam] = useState([] as teamType[])
    const [searchTeamText, setSearchText] = useState("")
    const [searching, setSearching] = useState(false)
    const {loading, startLoading, stopLoading} = useLoading()
    const cache: Record<string, teamType[]> = {} // ✅ Cache object

    const clearSearch = () => {
        setSearchText("")
        setSearching(false)
    }

    const handleFetchTeam = async (text: string) => {
        if (cache[text]) {
            console.log("Fetching from cache");
            setFilteredTeam(cache[text]);
            return;
        }

        try {
            startLoading();
            const response = await axios.get<{ data: { data: teamType[] } }>(
                `${BASE_URL}/team?search=${text}`,
                {
                    headers: { Authorization: `Bearer ${globalState.authorizationToken}` },
                }
            );
            const data = response?.data?.data?.data;
            cache[text] = data; // ✅ Store result in cache
            setFilteredTeam(data);
        } catch (error) {
            console.error(error);
        } finally {
            stopLoading();
        }
    };

    const updateTeamText = useCallback((text: string) => {
        !searching && setSearching(true)
        setSearchText(text)
        handleFetchTeam(text)
    },[])

    return {searchTeamText, updateTeamText, filteredTeam, searching, clearSearch, loading}
}

export default useSearchTeam