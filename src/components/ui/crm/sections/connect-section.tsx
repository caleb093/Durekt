import Button from "@/components/primary/Button"
import Salesforce from "../../../../../public/svgs/salesforce.svg"
import Hubspot from "../../../../../public/svgs/hubspot.svg"
import salesforce from "../../../../../public/images/salesforce.png"
import hubspot from "../../../../../public/images/hubspot.png"
import useModal from "@/components/util/useModal"
import { FC, useEffect, useState } from "react"
import StatusModal from "../status-modal"
import { usePostGenerateAuthMutation, usePostVerifyHubAuthMutation } from "../../../../../api-feature/apiSlice"
import useLoading from "@/components/util/useLoading"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { crmconnectedtype } from "../crm-setup"
import Image from "next/image"

interface props {
    handleChangeStep: (step: 1 | 2 | 3) => void
    handleSkip: () => void;
    handleChangeSection: (item: "connect" | "sync") => void;
    hubspotId?: number;
    salesforceId?: number;
    updateConnected: (item: crmconnectedtype) => void
}

type QueryParams = {
    code: string
    state: string
}

type PLATFORMTYPE = "Hubspot" | "Salesforce"
type STATUSTYPE = "fulfilled" | "rejected"

const ConnectCrmSection:FC<props> = ({handleChangeStep, hubspotId, salesforceId, updateConnected, handleSkip, handleChangeSection}) => {
    const router = useRouter()
    const {modalOpen, closeModal, openModal} = useModal()
    const {code, state} = router.query as QueryParams
    const [generateCrmAuth] = usePostGenerateAuthMutation()
    const [verifyHubAuth] = usePostVerifyHubAuthMutation()
    const {loading, startLoading, stopLoading} = useLoading()
    const {loading: salesLoading, startLoading: startSalesLoading, stopLoading: stopSalesLoading} = useLoading()
    const [verifyingCRM, setVerifyingCRM] = useState(false)
    const [platform, setPlatform] = useState<PLATFORMTYPE>("" as PLATFORMTYPE)
    const [verifyStatus, setVerifyStatus] = useState<STATUSTYPE>("" as STATUSTYPE)

    const handleHubspotConnect = async (id: number) => {
        try {
            id === hubspotId ? startLoading() : startSalesLoading()
            const response = await generateCrmAuth({callback: `http://localhost:3000/company-setup?goToStep=crm`, platformId: id}).unwrap()
            // @ts-ignore
            window.open(response?.data?.url, "_self")
        } catch(error) {
            // @ts-ignore
            toast.error(error?.data?.message ?? "Error occured")
            console.error(error)
        } finally {
            stopLoading()
            stopSalesLoading()
        }
    }

    useEffect(() => {
        if (code && state) {
            const toastId = toast.loading("Verifying Hubspot")

            // Verify Hubspot
            const verifyAuthAsync = async () => {
                setPlatform("Hubspot")
                try {
                    setVerifyingCRM(true)
                    const fulfilled = await verifyHubAuth({ code: code, state: state })
                    console.log(fulfilled)
                    setVerifyStatus("fulfilled")
                    toast.success("Hubspot Verified", {duration: 6000})
                    updateConnected("hubspot")
                    openModal()
                    // await getProfileData() // await this function
                        // .catch((rejected) => {
                        //     toast.error("Error verifying payment")
                        //     console.error(rejected);
                        // });
                } catch (error) {
                    toast.error("Error verifying Auth")
                    setVerifyStatus("rejected")
                    console.error(error);
                } finally {
                    toast.dismiss(toastId);
                    setVerifyingCRM(false)
                }
            };

            verifyAuthAsync();
        }
    },[code])

    return (
        <div className="text-center flex flex-col items-center w-[93%] sm:w-[75%] m-auto ">
            <StatusModal platform={platform} modalOpen={modalOpen} closeModal={closeModal} success={verifyStatus === "fulfilled" ? true : verifyStatus === "rejected" && false} handleChangeSection={handleChangeSection} />
            <h1 className="text-[1.5em] sm:text-[30px] font-[500] mt-3 text-center">Connect your CRM</h1>
            <p className="text-[#333333]">Choose your preferred CRM platform to integrate with Durekt for seamless data management.</p>

            <div className="flex flex-col mdx2:flex-row gap-12 mt-12 w-full">
                <div className="bg-white py-10 px-5 flex flex-col flex-1 gap-5 items-center rounded-2xl shadow-lg">
                    <Image src={salesforce} className="h-[13em] w-[13em] border" alt="sales-force" />
                    {/* <Salesforce /> */}
                    <p>Sync your Salesforce with Durekt to auto-populate your deals</p>
                    {/* @ts-ignore */}
                    <Button disabled={verifyingCRM} className="h-[2.60em]" onClick={() => handleHubspotConnect(salesforceId)}>{salesLoading ? <ActivityIndicator /> : "Continue to salesforce"}</Button>
                </div>
                <div className="bg-white py-10 px-5 flex flex-col flex-1 gap-5 items-center rounded-2xl shadow-lg">
                    <Image src={hubspot} className="h-[13em] w-[13em] border scale-x-[1.2]" alt="hubspot" />
                    {/* <Hubspot /> */}
                    <p>Sync your Hubspot with Durekt to auto-populate your deals</p>
                    {/* @ts-ignore */}
                    <Button disabled={verifyingCRM} className="h-[2.60em]" onClick={() => handleHubspotConnect(hubspotId)}>{loading ? <ActivityIndicator /> : "Continue to HubSpot"}</Button>
                </div>
            </div>

            <div className="flex gap-5 pb-8 mdx2:pb-0 mt-12 ml-auto justify-end items-center">
                <p className="text-[#333333] font-[700]">Step 3 of 3</p>
                <div className="flex gap-3 items-center">
                    {/* <div className="w-[100px]">
                        <Button onClick={() => handleChangeStep(2)} className="py-[5px] bg-transparent border border-[#B3387F]"><p className="text-[#B3387F]">Previous</p></Button>
                    </div> */}
                    <div className="w-[160px]">
                        <Button onClick={handleSkip} className="py-[5px] h-[33px]">Skip</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectCrmSection