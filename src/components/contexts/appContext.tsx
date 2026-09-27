import { SnackbarCloseReason } from "@mui/material";
import { createContext, useEffect, ReactNode, SyntheticEvent, useLayoutEffect } from "react";
import { useState } from "react";
import { globalState, useGetUserProfileQuery } from "../../../api-feature/apiSlice";
import { ACCOUNT_TYPE, ApiType, profileType, TOKEN_NAME } from "../../../api-feature/types";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { OnboardingQueryParams } from "../manager_onboarding/right/rightContainer";

interface AppContextProps {
    toastDetails: {open: boolean, duration: number, message: string},
    setToastDetails: React.Dispatch<React.SetStateAction<{open: boolean, duration: number, message: string}>>
    openToast: (duration: number, message: string) => void
    handleToastClose: (event: SyntheticEvent | Event, reason: SnackbarCloseReason) => void
    salesRepData: string[]
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    checkedLocalStorage: boolean;
    setCheckedLocalStorage: React.Dispatch<React.SetStateAction<boolean>>;
    saveAuthorizationTokenWithExpiry: (key: typeof TOKEN_NAME, token: string, expiryInMinutes: number) => void
    accountType: ACCOUNT_TYPE,
    setAccountType: React.Dispatch<React.SetStateAction<ACCOUNT_TYPE>>
    userProfile: profileType
    setUserProfile: React.Dispatch<React.SetStateAction<profileType>>
    shouldReload: boolean
    setShouldReload: React.Dispatch<React.SetStateAction<boolean>>
    displayWalkthrough: boolean
    setDisplayWalkthrough: React.Dispatch<React.SetStateAction<boolean>>
}

const appContext = createContext<AppContextProps>({
    toastDetails: {open: false, duration: 3000, message: ""},
    setToastDetails: () => {},
    openToast: () => {},
    handleToastClose: () => {},
    salesRepData: [],
    loggedIn: false,
    setLoggedIn: () => {},
    checkedLocalStorage: false,
    setCheckedLocalStorage: () => {},
    saveAuthorizationTokenWithExpiry: () => {},
    accountType: "",
    setAccountType: () => {},
    userProfile: {} as profileType,
    setUserProfile: () => {},
    shouldReload: false,
    setShouldReload: () => {},
    displayWalkthrough: false,
    setDisplayWalkthrough: () => {}
})

interface profileApiType extends ApiType {
  data: {data: profileType, success: boolean, current_subscription: {}}
}

function ContextProvider({children}: { children: ReactNode }) {
    const router = useRouter()
    const {data, status, error, refetch} = useGetUserProfileQuery<profileApiType>(undefined, {skip: !(globalState.authorizationToken && !globalState.account_type)})
    // const {data, status, error, refetch} = useGetUserProfileQuery<profileApiType>(undefined)
    const [shouldReload, setShouldReload] = useState(false)
    const [userProfile, setUserProfile] = useState({} as profileType)
    const [accountType, setAccountType] = useState("" as ACCOUNT_TYPE)
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkedLocalStorage, setCheckedLocalStorage] = useState(false)
    const [displayWalkthrough, setDisplayWalkthrough] = useState(false)
    const [toastDetails, setToastDetails] = useState({
        open: false,
        duration: 3000,
        message: ""
    })
    const salesRepData = ["Angela", "chris", "John", "Elizabeth", "Michael"]
    
    const handleToastClose = (event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return
        }
        else setToastDetails({ open: false, duration: 3000, message: "" })
    }

    const openToast = (duration: number, message: string) => {
        setToastDetails({open: true, duration, message})
    }

    useEffect(() => {
        const toastId = toast

        if (status === "pending") {
            toastId.loading("loading")
        } else if (status === "rejected") {
            // @ts-ignore
            if (error?.data?.message === "Please verify your email") {
                toastId.dismiss()
                toast.error("Error, Verify Email!");
                const goToSection: OnboardingQueryParams['goToSection'] = "checkmail";

                router.push({
                    pathname: "/onboarding",
                    query: { goToSection },
                });
            // @ts-ignore
            } else if (error?.data?.message === "No company selected") {
                toast.error("No Company Selected")
                toastId.dismiss()
                router.push("/company-setup")
            } else {
                toastId.dismiss()
                toast.error("Error occured, reload page")
            }

            return            
        } else if (status === "fulfilled") {
            toastId.dismiss()
            const current_subscription = data?.current_subscription
            const completeData = {...data?.data, current_subscription}
            // @ts-ignore
            setUserProfile(completeData)
            const userRoles = data?.data?.company?.roles
            // const account_type = userRoles?.length > 0 ? userRoles[0]?.roles[0]?.title.toLowerCase() as ACCOUNT_TYPE : ""
            const account_type = 
                userRoles?.length > 0 ? 
                userRoles[0]?.roles.find(item => item.is_active === true)?.title.toLocaleLowerCase() as ACCOUNT_TYPE ??
                userRoles[0]?.roles[0]?.title.toLowerCase() as ACCOUNT_TYPE : ""

            globalState.account_type = account_type
            // @ts-ignore
            setAccountType(account_type)
            setLoggedIn(true)
        } else {
            toastId.dismiss()
        }
    },[status])

    useLayoutEffect(() => {
        const item = localStorage.getItem(TOKEN_NAME)
        setCheckedLocalStorage(true)
        if (item) {
            const data = JSON.parse(item);
            if (new Date().getTime() < data.expiry) {

                globalState.authorizationToken = data.token
                setLoggedIn(true)
            } else {
                localStorage.removeItem(TOKEN_NAME)
                globalState.authorizationToken = ''
            }
        }
    }, []);
    
    const saveAuthorizationTokenWithExpiry = (key: typeof TOKEN_NAME, token: string , expiryInMinutes: number) => {
        const now = new Date();
        const item = {
            token: token,
            expiry: now.getTime() + expiryInMinutes * 60 * 1000 // Convert expiry time to milliseconds
        };
        localStorage.setItem(key, JSON.stringify(item));
        setCheckedLocalStorage(true)
    };

    const contextValue: AppContextProps = {
        toastDetails,
        setToastDetails,
        handleToastClose,
        openToast,
        salesRepData,
        loggedIn,
        setLoggedIn,
        checkedLocalStorage,
        setCheckedLocalStorage,
        saveAuthorizationTokenWithExpiry,
        accountType,
        setAccountType,
        userProfile,
        setUserProfile,
        shouldReload,
        setShouldReload,
        displayWalkthrough,
        setDisplayWalkthrough
    }

    return(
        <appContext.Provider value={contextValue}>{children}</appContext.Provider>
    )
}

export { appContext, ContextProvider }