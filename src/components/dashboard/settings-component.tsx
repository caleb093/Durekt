import { useEffect, useState } from "react"
import ProfileSettings from "./settings/profile-settings"
import SystemSettings from "./settings/system-settings"
import AuditTrail from "./settings/audit-trial"
import { useContext } from "react"
import { appContext } from "@/components/contexts/appContext"
import UserIcon from "../../../public/svgs/user-icon.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { usePostVerifyPaymentMutation } from "../../../api-feature/apiSlice"
import { dataContext } from "../contexts/dataContext"
import Walkthrough from "../secondary/Walkthrough"

type QueryParams = {
    reference: string
    id: string
}

const steps = [
    {
        target: '#profile-settings-btn',
        content: 'Handle Profile settings here(password, Name)',
    },
    {
        target: '#system-settings-btn',
        content: 'Handle system settings here (subscriptions, Company name, Company skills, Recording)',
    },
    {
        target: '#auditlog-settings-btn',
        content: 'View Audit Logs Here',
    },
]

const SettingsComponent = () => {
    const router = useRouter()
    const {getProfileData} = useContext(dataContext)
    const { accountType: account_type, userProfile} = useContext(appContext)
    const {reference, id} = router.query as QueryParams
    const [currentSection, setCurrentSection] = useState<"profile" | "system" | "audit-trial">("profile")
    const [verifyPayment] = usePostVerifyPaymentMutation()
   
    const handleSwitchSection = (newSection: "profile" | "system" | "audit-trial") => {
        setCurrentSection(newSection)
    }

    useEffect(() => {
        if (reference && id) {
            const toastId = toast.loading("Verifying Payment")

            const verifyPaymentAsync = async () => {
                try {
                    await verifyPayment({ reference: reference, id: Number(id) }).unwrap()
                        .then(async (fulfilled) => {
                            toast.success("Payment Succeded", {duration: 6000})
                            console.log(fulfilled)
                            await getProfileData() // await this function
                        })
                        .catch((rejected) => {
                            toast.error("Error verifying payment")
                            console.error(rejected);
                        });
                } catch (error) {
                    toast.error("Error verifying payment")
                    console.error(error);
                } finally {
                    toast.dismiss(toastId);
                }
            };

            verifyPaymentAsync();
        }
    },[reference])

    return (
        <div>
            <Walkthrough steps={steps} />
            <div className="flex items-center gap-1">
                <h1 className="text-[1.5em] font-[600] text-[#333333]">Settings</h1>
            </div>

            <div className={`flex flex-col mdx2:flex-row gap-4 text-center mt-3`}>
                {account_type !== "admin" && 
                    <div style={{boxShadow: "0px 0px 8px 1px rgba(187, 185, 185, 0.25)"}} className="bg-white rounded-md w-[100%] mdx2:w-[17em] flex flex-col h-min flex-none">
                        <div className="py-4">
                            <div className="rounded-full h-14 w-14 mx-auto overflow-hidden">
                                {userProfile?.url ? <Image src={userProfile?.url} alt="profile img" height={5000} width={5000} /> : <UserIcon className="scale-[1.15]" />}
                            </div>
                            <p className="text-[14px] text-[#1E1E1E]">{userProfile?.firstName} {userProfile?.lastName}</p>
                        </div>
                        <div className="text-[14px] text-[#1E1E1E] font-[400]">
                            <p id="profile-settings-btn" onClick={() => handleSwitchSection("profile")} className={`${currentSection === "profile" ? "bg-[#077AB233]" : "bg-transparent"} border-b border-b-[#0000000D] py-3 hover:bg-[#077AB233] cursor-pointer`}>My Profile</p>
                            {(account_type === "manager" || account_type === "owner") && 
                                <>
                                    <p id="system-settings-btn" onClick={() => handleSwitchSection("system")} className={`${currentSection === "system" ? "bg-[#077AB233]" : "bg-transparent"} border-b border-b-[#0000000D] py-3 hover:bg-[#077AB233] cursor-pointer`}>System Settings</p>
                                    <p id="auditlog-settings-btn" onClick={() => handleSwitchSection("audit-trial")} className={`${currentSection === "audit-trial" ? "bg-[#077AB233]" : "bg-transparent"} border-b border-b-[#0000000D] py-3 hover:bg-[#077AB233] cursor-pointer`}>Audit Trial</p>    
                                </>
                            }
                        </div>
                    </div>
                }
                <div className="w-full overflow-hidden ">
                    {currentSection === "profile" && <ProfileSettings data={userProfile} />}
                    {currentSection === "system" && <SystemSettings data={userProfile} />}
                    {currentSection === "audit-trial" && <AuditTrail />}
                </div>
            </div>
        </div>
    )
}

export default SettingsComponent