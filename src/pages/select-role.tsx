import Input from "@/components/primary/input"
import UserIcon from "../../public/svgs/user-icon.svg"
import { useContext, useEffect, useState } from "react"
import { apiSlice, globalState, usePostSwitchCompaniesMutation, usePostSwitchRoleMutation } from "../../api-feature/apiSlice" 
import useLoading from "@/components/util/useLoading"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import Button from "@/components/primary/Button"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"
import { useGetCompaniesQuery } from "../../api-feature/apiSlice"
import { ApiType } from "../../api-feature/types"
import { companyType } from "../../api-feature/manager-owner/company/company-type"
import { appContext } from "@/components/contexts/appContext"

interface companiesApi extends ApiType {
    data: {data: companyType[], success: boolean}
}

const SelectRole = () => {
    const routeTo = useRouter()
    const {data:companyData, status: companyStatus, error: companyError} = useGetCompaniesQuery<companiesApi>()
    const [changeMade, setChangeMade] = useState({changed: false, company: false, role: false})
    const {userProfile, setShouldReload, loggedIn, setAccountType} = useContext(appContext)
    const {loading, startLoading, stopLoading} = useLoading()
    const [switchRole] = usePostSwitchRoleMutation()
    const [switchCompany] = usePostSwitchCompaniesMutation()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        company: 0,
        role: 0
    })
    const accountType = data.role === 1 ? "owner" : data.role === 2 ? "manager" : "sales personel"
    const findCompany = companyData?.data?.find(item => item.companyId === Number(data.company))

    console.log(findCompany)

    const companyOptions = [] as {value: number, name: string}[]
    companyData?.data?.map(item => companyOptions.push({value: item.companyId, name: item.companyName}))

    const handleSwitchRole = async () => {
        try {
            await switchRole({ roleId: data.role }).unwrap();
        } catch (error) {
            // @ts-ignore
            toast.error(error?.data?.message ?? "Error switching role");
        }
    }
    
    const handleSwitchCompany = async () => {
        try {
            await switchCompany({companyId: data?.company}).unwrap()
            toast.success("Company Swithched")
            // dispatch(apiSlice.util.resetApiState())
        } catch (error) {
            console.error(error)
            // @ts-ignore
            toast.error(error?.data?.message ?? "Error switching company")
        }
    }

    const handleProceed = async () => {
        if (changeMade.changed) {
            startLoading()
            if (changeMade.company) {
                await handleSwitchCompany();
                setShouldReload(true);
            }
            if (changeMade.role) {
                await handleSwitchRole();
                setAccountType(accountType)
                globalState.account_type = accountType
            }
            stopLoading()
            changeMade.company && dispatch(apiSlice.util.resetApiState())
            routeTo.push("/dashboard");
        } else {
            // changeMade.company && setShouldReload(true)
            routeTo.push("/dashboard")
        }
        // routeTo.push("/dashboard")
    }

    useEffect(() => {
        if (userProfile) {
            const userRoles = userProfile?.company?.roles
            const roleId = 
                userRoles?.length > 0 ? 
                userRoles[0]?.roles.find(item => item.is_active === true)?.id ??
                userRoles[0]?.roles[0]?.id : 0

            setData({company: userProfile?.company?.id, role: roleId})
        }
    },[userProfile])
    
    if (loggedIn) {
        return (
            <div className="bg-[#F8F8FA] min-h-screen flex flex-col justify-center w-full px-4 md:px-10 pt-10 pb-4">
                <h1 className="text-center text-[1.5em] sm:text-[30px] font-[500] text-[#333333]">Please select your role to access the appropriate interface</h1>

                <Input 
                    optionsLoading={companyStatus === "pending"}
                    select 
                    selectIcon 
                    options={companyOptions} 
                    value={data.company} 
                    onChange={(e) => {
                        setChangeMade(prev => ({...prev, changed: true, company: true})), 
                        setData(prev => ({...prev, company: Number(e.target.value)}))}
                    }
                    className="mt-8" 
                    inputClassname="bg-white py-2 px-3" 
                    placeholder="None" 
                    name="company"
                    label="Select Company" 
                />
                <div className="grid md:grid-cols-2 gap-8 px-0 md:px-20 mt-12 pb-10">
                    {findCompany?.roleNames?.includes("Owner") && <div
                        onClick={() => {
                            setChangeMade(prev => ({...prev, changed: true, role: true})), 
                            setData(prev => ({...prev, role: 1}))}
                        } 
                        className={`bg-white text-center cursor-pointer border-[2px] ${1 === data.role ? "border-[#B3387F]" : "border-white"} hover:border-[#B3387F] h-[17em] rounded-xl flex-1 flex items-center justify-center py-10 px-3 flex-col`}
                    >
                        <UserIcon className="h-20 w-20" />
                        <p className="font-[600] text-[18px] text-[#524D5E] ">Owner</p>
                        <p className="mt-4">Manage your business and monitor performance</p>
                    </div>}
                    {findCompany?.roleNames?.includes("Manager") && <div
                        onClick={() => {
                            setChangeMade(prev => ({...prev, changed: true, role: true})), 
                            setData(prev => ({...prev, role: 2}))}
                        } 
                        className={`bg-white text-center cursor-pointer border-[2px] ${2 === data.role ? "border-[#B3387F]" : "border-white"} hover:border-[#B3387F] h-[17em] rounded-xl flex-1 flex items-center justify-center py-10 px-3 flex-col`}
                    >
                        <UserIcon className="h-20 w-20" />
                        <p className="font-[600] text-[18px] text-[#524D5E] ">Manager</p>
                        <p className="mt-4">Manage Deals and Sales Reps</p>
                    </div>}
                    {findCompany?.roleNames?.includes("Sales Personel") && <div
                        onClick={() => {
                            setChangeMade(prev => ({...prev, changed: true, role: true})), 
                            setData(prev => ({...prev, role: 3}))}
                        } 
                        className={`bg-white text-center cursor-pointer border-[2px] ${3 === data.role ? "border-[#B3387F]" : "border-white"} hover:border-[#B3387F] h-[17em] rounded-xl flex-1 flex items-center justify-center py-10 px-3 flex-col`}
                    >
                        <UserIcon className="h-20 w-20" />
                        <p className="font-[600] text-[18px] text-[#524D5E] ">Sales Rep</p>
                        <p className="mt-4">Access sales tools and client data</p>
                    </div>}

                    {/* {findCompany?.roleNames.map((item, i) => (
                        <div 
                            onClick={() => {
                                setChangeMade(prev => ({...prev, changed: true, role: true})), 
                                setData(prev => ({...prev, role: i+1}))}
                            } 
                            className={`bg-white cursor-pointer border-[2px] ${i+1 === data.role ? "border-[#B3387F]" : "border-white"} hover:border-[#B3387F] h-[17em] rounded-xl flex-1 flex items-center justify-center py-10 px-3 flex-col`}
                        >
                            <UserIcon className="h-20 w-20" />
                            <p className="font-[600] text-[18px] text-[#524D5E] ">{item}</p>
                            <p className="mt-4">{item.toLowerCase() === "manager" ? "Manage deals and sales reps" : item.toLowerCase() === "owner" ? "Manage your business and monitor performance" : "Access sales tools and client data" }</p>
                        </div>
                    ))} */}
                </div>

                <div className="flex mb-4 mt-auto justify-end ">
                    <div className="flex gap-3 items-center">
                        <Button onClick={handleProceed} className="py-[5px] px-10 h-[33px]">{loading ? <ActivityIndicator /> : "Proceed To Dashboard"}</Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="bg-[#F8F8FA] min-h-screen flex flex-col items-center gap-5 justify-center w-full px-10 pt-10 pb-4">
                <h1>UnAuthorized</h1>
                <div className="w-[12em]" >
                    <Button onClick={() => routeTo.push("/onboarding")} >Log In</Button>
                </div>
            </div>   
        )
    }
    
}

export default SelectRole