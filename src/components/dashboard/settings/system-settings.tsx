import Button from "@/components/primary/Button"
import Input from "@/components/primary/input"
import BotIcon from "../../../../public/svgs/bot-icon.svg"
import Image from "next/image"
import ChromeIcon from "../../../../public/svgs/chrome-icon.svg"
import DownloadIcon from "../../../../public/svgs/download-icon.svg"
import CheckIcon from "../../../../public/svgs/check-icon.svg"
import { ApiType, profileType, SkillsType, topSkillType } from "../../../../api-feature/types"
import { FC, useContext, useEffect, useState } from "react"
import useModal from "@/components/util/useModal"
import { dataContext } from "@/components/contexts/dataContext"
import EditSkillsModal from "@/components/modals/editSkills-modal"
import EditCompanyName from "@/components/modals/editCompanyName"
import { useGetFetchCompanySkillsQuery, useGetFetchSettingsQuery, useGetSubscriptionHistoryQuery, useGetSubscriptionsQuery, usePostCancelSubscriptionMutation, usePostUpdateSettingsMutation, usePostVerifyPaymentMutation } from "../../../../api-feature/apiSlice"
import SubscriptionModal from "@/components/modals/subscription-modal"
import { appContext } from "@/components/contexts/appContext"
import { settingsType } from "../../../../api-feature/settings/settings-type"
import { Switch } from "@mui/material"
import Modal from "@/components/primary/Modal"
import toast from "react-hot-toast"
import { subHistoryType, subscriptionType } from "../../../../api-feature/subscription/subscription-type"
import useLoading from "@/components/util/useLoading"

interface props {
    data: profileType
}

interface subscriptionApiType extends ApiType {
    data: {data: subscriptionType[], success: boolean}
}

interface settingsApiType extends ApiType {
    data: {data: settingsType, success: boolean}
}

interface topSkillsApiType extends ApiType {
    data: {data: topSkillType[], success: boolean}
}

interface subHistoryApiType extends ApiType {
    data: {data: subHistoryType[], success: boolean}
}

const SystemSettings:FC<props> = ({data}) => {
    const {setUserProfile} = useContext(appContext)
    const {availableSkills, availableSkillsStatus} = useContext(dataContext)
    const {loading: isCancelLoading, startLoading: startCancelLoading, stopLoading: stopCancelLoading} = useLoading()
    const [recordingSettings, setRecordingSettings] = useState({
        bot: "",
        autoRecord: false,
        otherLanguageSupport: false
    })
    const [cancelSubscription] = usePostCancelSubscriptionMutation()
    const {data: topSkillsD, status: topSkillStatus, error: topSkillsError} = useGetFetchCompanySkillsQuery<topSkillsApiType>()
    const {data: subHistory, status: subHistoryStatus, error: subHistoryError} = useGetSubscriptionHistoryQuery<subHistoryApiType>()
    const [requestStatus, setRequestStatus] = useState<"idle" | "pending">("idle");
    const [isRecordingSettingChange, setIsRecordingSettingChange] = useState(false)
    const [updateSetting] = usePostUpdateSettingsMutation()
    const {data: settingd, status: settingStatus, error: settingsError} = useGetFetchSettingsQuery<settingsApiType>()
    const {accountType} = useContext(appContext)
    const {modalOpen, openModal, closeModal} = useModal()
    const {modalOpen: cancelModalOpen, openModal: openCancelModal, closeModal: closeCancelModal} = useModal()
    const {modalOpen: botNameModal, openModal: openBotModal, closeModal: closeBotModal} = useModal()
    const {modalOpen: subscriptionOpen, openModal: openSubscription, closeModal: closeSubscription} = useModal()
    const {modalOpen: companyModalOpen, openModal: openCompanyModal, closeModal: closeCompanyModal} = useModal()
    const {data: subscriptionData, status: subscriptionStatus, error: subscriptionError} = useGetSubscriptionsQuery<subscriptionApiType>()

    console.log(data)

    const isSubscriptionActive = Boolean(data?.current_subscription?.status === "active")
    const settingsData = settingd?.data
    const subHistoryData = subHistory?.data

    const topSkillsData = topSkillsD?.data
    // console.log(availableSkills)
    // console.log(topSkillsData)

    const existingSkills = [
        {
            id: 4,
            name: "Value Over Price",
            symbol: "VP"
        },
        {
            id: 2,
            name: "Becoming Obsessed",
            symbol: "BO"
        },
    ]
    const [topSkills, setTopSkills] = useState([] as {skillId: number}[])

    const changeRequestStatus = (status: "idle" | "pending") => {
        setRequestStatus(status)
    }

    useEffect(() => {
        settingStatus === "fulfilled" && setRecordingSettings(settingsData)
    },[settingStatus])

    useEffect(() => {
        if (topSkillStatus === "fulfilled") {
            const newArray = [] as {skillId: number}[]
            topSkillsData?.map(item => item.is_favourite && newArray.push({skillId: item.skillId}))

            setTopSkills(newArray)
        }
    },[topSkillStatus])

    // useEffect(() => {
    //     const newArray = [] as {skillId: number}[]
    //     existingSkills?.map(item => newArray.push({skillId: item.id}))

    //     setTopSkills(newArray)
    // },[availableSkillsStatus])

    const changeRecordSetting = ({type, value}: {type: keyof settingsType, value?: string}) => {
        setIsRecordingSettingChange(true)
        if (type === "autoRecord" || type === "otherLanguageSupport") {
            setRecordingSettings(prev => ({...prev, [type]: !prev?.[type]}))
        } else if (type === "bot") {
            value && setRecordingSettings(prev => ({...prev, bot: value}))
        }
    }

    const handleSubmitRecordSettings = async () => {
        const toastId = toast.loading("updating")
        changeRequestStatus("pending")
        try {
            await updateSetting({...recordingSettings}).unwrap()
                .then(fulfilled => {
                    toast.success("Record settings updated")
                    setIsRecordingSettingChange(false)
                })
                .catch(rejected => {
                    console.error(rejected)
                    toast.error(rejected?.data?.message ?? "Error occured")
                    // toast.error("Error occured")
                })
        } catch (error) {
            toast.error("Error occured")
            console.error(error)
        } finally {
            changeRequestStatus("idle")
            toast.dismiss(toastId)
        }
    }

    const handleCancelSubscription = async () => {
        const toastId = toast.loading("updating")
        changeRequestStatus("pending")
        startCancelLoading()
        try {
            await cancelSubscription({id: 0}).unwrap()
                .then(fulfilled => {
                    toast.success("subscription cancelled")
                    // @ts-ignore
                    setUserProfile(prev => ({...prev, current_subscription: null}))
                    closeCancelModal()
                })
                .catch(rejected => {
                    console.error(rejected)
                    toast.error("Error occured")
                })
        } catch (error) {
            toast.error("Error occured")
            console.error(error)
        } finally {
            changeRequestStatus("idle")
            stopCancelLoading()
            toast.dismiss(toastId)
        }
    }

    return (
        <div style={{boxShadow: "0px 0px 8px 1px rgba(187, 185, 185, 0.25)"}} className="bg-white px-4 mdx2:px-7 py-6 mb-6 rounded-md text-left text-[14px] ">
            <SubscriptionModal modalOpen={subscriptionOpen} closeModal={closeSubscription} subscriptionData={subscriptionData?.data}  />
            <EditCompanyName modalOpen={companyModalOpen} closeModal={closeCompanyModal} companyId={data?.company?.id} companyName={data?.company?.name} />
            <EditSkillsModal
                modalOpen={modalOpen}
                closeModal={closeModal}
                availableSkills={topSkillsData}
                topSkills={topSkills}
                setTopSkills={setTopSkills}
            />
            <Modal isOpen={botNameModal} onClose={closeBotModal}>
                <div className="px-5 py-10">
                    <Input
                        label={<p>Bot name</p>}
                        placeholder="Bot name"
                        value={recordingSettings?.bot}
                        onChange={(e) => changeRecordSetting({type: "bot", value: e.target.value})}
                        name="bot"
                        type="text"
                    />
                    <Button onClick={closeBotModal}>
                        Update
                    </Button>
                </div>
            </Modal>
            <Modal isOpen={cancelModalOpen} onClose={isCancelLoading ? () => {} : closeCancelModal}>
                <div className="px-5 pt-14 pb-5 flex gap-4">
                    <Button disabled={isCancelLoading} onClick={handleCancelSubscription} className="border border-red-600 text-red-600 bg-white">
                        <span className="text-red-600">Cancel subscription, Yes?</span>
                    </Button>
                    <Button onClick={isCancelLoading ? () => {} : closeCancelModal} className="bg-blue-600" color="">
                        No, close
                    </Button>
                </div>
            </Modal>

            <h1 className="text-[16px] mb-3 text-black font-[600]">System Settings</h1>
            <div className="border flex flex-col mdx2:flex-row gap-4 justify-between px-5 py-6 rounded-lg mb-3 items-center border-[#D4D4D4]">
                <div className="mr-auto">
                    <p>Subscription plan</p>
                    <div className={`flex justify-center items-center gap-1 ${isSubscriptionActive ? "bg-[#307EA71A] text-[#307EA7] " : "bg-slate-800 text-white" }  text-center rounded-full py-1 mt-1`}>
                        <div className={`h-[7px] w-[7px] rounded-full ${isSubscriptionActive ? "bg-[#307EA7]" : "bg-red-500"}`} />
                        <p className=" ">{isSubscriptionActive ? data?.current_subscription?.subscriptionPlan?.name : "No Plan"}</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3">
                    {isSubscriptionActive && <button onClick={openCancelModal} className="text-[#AE0317] font-[500] cursor-pointer">Cancel subscription</button>}
                    <div className="w-[150px]">
                        <Button onClick={accountType !== "owner" ? () => {toast.error("Must have owner permission")} : openSubscription}>{isSubscriptionActive ? "Upgrade" : "subscribe"}</Button>
                    </div>
                </div>
            </div>

            <div className="border flex flex-col mdx2:flex-row mdx2:gap-[25%] justify-between px-5 py-6 rounded-lg mb-3 items-center border-[#D4D4D4]">
                <Input 
                    label={<p>Company name</p>}
                    placeholder="company name"
                    disabled
                    value={data?.company?.name}
                    onChange={() => {}}
                    name="companyName"
                    type="text"
                />
                <div className="w-[150px]">
                    <Button onClick={openCompanyModal}>Update</Button>
                </div>
            </div>

            <div className="border flex flex-col mdx2:flex-row gap-4 justify-between px-5 py-6 rounded-lg mb-3 items-center border-[#4A4B571A]">
                <p>Top 5 Skills Configuration</p>
                <div className="w-[100px]">
                    <Button onClick={openModal} className=" bg-transparent border border-[#C32781]"><span className="text-[#C32781]">Edit</span></Button>
                </div>
            </div>

            <div className="flex justify-between items-center my-4 ">
                <h1 className="text-[16px] ">Durekt Recording Setting</h1>
                {isRecordingSettingChange && <button onClick={handleSubmitRecordSettings} disabled={requestStatus !== "idle"} className="h-7 px-4 text-white bg-[#C32781] rounded-lg active:scale-[0.95] transition-all ">Save</button>}
            </div>
            
            <div className="border flex justify-between px-5 py-6 rounded-lg mb-3 items-center border-[#D4D4D4]">
                <p>Auto Record all Scheduled Meetings</p>
                <Switch checked={recordingSettings?.autoRecord} onChange={() => changeRecordSetting({type: "autoRecord"})} />
            </div>
            
            <div className="border flex justify-between px-5 py-6 rounded-lg mb-3 items-center border-[#D4D4D4]">
                <p>Non-English Language support</p>
                <Switch checked={recordingSettings?.otherLanguageSupport} onChange={() => changeRecordSetting({type: "otherLanguageSupport"})} />
            </div>

            <div className="border flex flex-col mdx2:flex-row justify-between px-5 py-6 gap-4 rounded-lg mb-3 items-center border-[#D4D4D4]">
                <div className="flex gap-2">
                    <BotIcon className="flex-shrink-0" />
                    <div>
                        <p className="text-[16px]">Bot Name: <span className="text-[14px]">{recordingSettings?.bot}</span></p>
                        <p>The name your Durekt bot will go by during the call</p>
                    </div>
                </div>
                <div className="w-[100px]">
                    <Button onClick={openBotModal} className=" bg-transparent border border-[#C32781]"><span className="text-[#C32781]">Edit</span></Button>
                </div>
            </div>

            <div className="border flex flex-col justify-between px-4 mdx2:px-10 py-10 rounded-lg mb-6 gap-6 border-[#D4D4D4]">
                <div className="flex items-center gap-2">
                    <Image className="h-[45px] sm:h-[55px] w-[45px] sm:w-[55px]" height={50000} width={50000} alt="zoom" src={"/images/homepage/zoom.png"} />
                    <p>Zoom: <span className="text-[#1F9624] ml-4 inline-block">Fully Enabled</span></p>
                </div>
                <div className="flex items-center gap-2">
                    <Image className="h-[45px] sm:h-[55px] w-[45px] sm:w-[55px]" height={50000} width={50000} alt="meet" src={"/images/homepage/google.png"} />
                    <p>Meet: <span className="text-[#1F9624] ml-4 inline-block">Fully Enabled</span></p>
                </div>
                {/* <div className="flex items-center gap-2">
                    <Image className="h-[45px] sm:h-[55px] w-[45px] sm:w-[55px]" height={50000} width={50000} alt="kixie" src={"/images/homepage/kixie.png"} />
                    <p>Kixie: <span className="text-[#1F9624] ml-4 inline-block">Fully Enabled</span></p>
                </div> */}
            </div>

            <h1 className="text-[16px] mb-3">Delete</h1>

            <div className="border flex flex-col mdx2:flex-row gap-4 justify-between px-5 py-2 rounded-lg mb-3 items-center border-[#4A4B571A] text-[14px]">
                <div className="mr-auto">
                    <p className="mb-2 ">Delete Account</p>
                    <p className="text-[#AE0317] ">Deleting your account is permanent.</p>
                    <p className="text-[#AE0317] ">All data will be lost.</p>
                </div>
                <p className="text-[#AE0317] font-[600]">Delete Account</p>
            </div>

        </div>
    )
}

export default SystemSettings