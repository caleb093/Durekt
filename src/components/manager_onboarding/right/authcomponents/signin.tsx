import Image from "next/image"
import Logo from "@/components/primary/Logo"
import Line from "../../../../../public/svgs/Line 1.svg"
import Button from "@/components/primary/Button"
import { FC, FormEventHandler, useEffect, useState } from "react"
import { sectionType } from "../rightContainer"
import Input from "@/components/primary/input"
import { BASE_URL, globalState, useAuthSignInMutation } from "../../../../../api-feature/apiSlice"
import { authAccountType } from "@/pages/onboarding"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"
import { useRouter } from "next/router"
import axios from "axios"
import { useContext } from "react"
import { appContext } from "@/components/contexts/appContext"
import toast from "react-hot-toast"
import { ACCOUNT_TYPE, TOKEN_NAME } from "../../../../../api-feature/types"
import GoogleMicrosoft from "../../GoogleMicrosoft"

interface props {
    changeSection: (newSection: sectionType) => void
    accountType: authAccountType
}

type QueryParams = {
    durekt: string
}

const Signin:FC<props> = ({changeSection, accountType}) => {
    const {loggedIn, setLoggedIn, setUserProfile, saveAuthorizationTokenWithExpiry, checkedLocalStorage} = useContext(appContext)
    const router = useRouter()
    const {durekt} = router.query as QueryParams
    const {setAccountType} = useContext(appContext)
    const [authSignin] = useAuthSignInMutation()
    const [loginRequestStatus, setLoginRequestStatus] = useState<"idle" | "pending">("idle");
    const [displayLoading, setDisplayLoading] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    })

    const changeRequestStatus = (status: "idle" | "pending") => {
        setLoginRequestStatus(status)
    }
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value
        setLoginDetails(prev => ({...prev, [name]: value}))
    }

    const getProfileData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user`, {
                headers: { Authorization: `Bearer ${globalState.authorizationToken}` },
            }); 
            const data = response.data.data
            const current_subscription = response?.data?.current_subscription
            const completeData = {...data, current_subscription}
            const userRoles = data?.company?.roles
            // const account_type = userRoles.length > 0 ? userRoles[0]?.roles[0]?.title.toLowerCase() as ACCOUNT_TYPE : ""
            const account_type = 
                userRoles?.length > 0 ? 
                // @ts-ignore
                userRoles[0]?.roles.find(item => item.is_active === true)?.title.toLocaleLowerCase() as ACCOUNT_TYPE ?? 
                userRoles[0]?.roles[0]?.title.toLowerCase() as ACCOUNT_TYPE : ""

            setUserProfile(completeData)
            globalState.account_type = account_type
            setAccountType(account_type)
            // router.push("/dashboard")
            router.push("/select-role")
        } catch (error) {
            // @ts-ignore
            if (error?.response?.data?.message === "No company selected") {
                router.push("/company-setup")
            // @ts-ignore
            } else if (error?.response?.data?.message === "Please verify your email") {
                changeSection("checkmail")
            } else {
                console.error(error)
                toast.error("Error getting Profile, reload page")
            }
        } finally {
            setDisplayLoading(false)
            changeRequestStatus("idle")
            // setLoginRequestStatus("idle")
        }
    }

    
    useEffect(() => {
        if (durekt) {

            globalState.authorizationToken = durekt
            setLoggedIn(true)
            saveAuthorizationTokenWithExpiry(TOKEN_NAME, durekt, 60 )
            toast.success("Logged In, please wait")
            getProfileData() 
        }
    },[durekt])

    const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (loginRequestStatus == "idle") {
            // setLoginRequestStatus("pending")
            changeRequestStatus("pending")
            setDisplayLoading(true);
            try {
                authSignin({...loginDetails}).unwrap()
                    .then(fulfilled => {
                        globalState.authorizationToken = fulfilled.data.accessToken
                        setLoggedIn(true)
                        saveAuthorizationTokenWithExpiry(TOKEN_NAME, fulfilled.data.accessToken, 60 )
                        toast.success("Logged In, please wait")
                        getProfileData() 
                    })
                    .catch(rejected => {
                        setDisplayLoading(false)
                        // setLoginRequestStatus("idle")
                        changeRequestStatus("idle")
                        console.error(rejected)
                        if (rejected.status === 400) {
                            toast.error(rejected?.data?.message)
                            return
                        } else {
                            toast.error("Error Occured, Refresh Page") 
                            return
                        }
                    })
            } catch (err) {
                console.error(err)
                setDisplayLoading(false)
                // setLoginRequestStatus("idle")
                changeRequestStatus("idle")
            }
        }
    }

    return (
        <>
            <Logo />
            <h1 className="text-[1.5em] sm:text-[2em] mt-3 font-medium">Welcome Back</h1>
            <GoogleMicrosoft changeRequestStatus={changeRequestStatus} />
            <div className="py-8 flex justify-center items-center gap-4">
                <div className="border-[0.1px] w-full"></div>
                <p>Or</p>
                <div className="border-[0.1px] w-full"></div>
            </div>
            <form className="mb-6" onSubmit={handleSignin}>
                <Input 
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Email</label>} 
                    value={loginDetails.email}
                    onChange={handleOnChange}
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                />

                <Input 
                    type={"password"}
                    value={loginDetails.password}
                    onChange={handleOnChange}
                    label={
                        <div className="flex w-full justify-between">
                            <label className="text-[#333333] font-medium text-[0.9em]" >Password</label>
                            <label onClick={() => changeSection("forgotpassword")} className=" text-[#5272EA] cursor-pointer font-medium text-[0.9em]">Forget Password</label>
                        </div>
                    } 
                    placeholder="Enter password"
                    name="password"
                />
                <Button 
                    type="submit" 
                    disabled={(!loginDetails.email || !loginDetails.password) || loginRequestStatus !== "idle"} 
                    className="mt-1 h-[2.68em]"
                >
                    {displayLoading ? <ActivityIndicator /> : "Sign in"}
                </Button>
            </form>
            
            <p className="mt-6 text-[0.85em] text-[#475467] font-normal">Don't have an account <span onClick={() => changeSection("signup")} className="cursor-pointer text-[#5272EA] font-medium">Sign up</span></p>
            
        </>
    )
}

export default Signin
