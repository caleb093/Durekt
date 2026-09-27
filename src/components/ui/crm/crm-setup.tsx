import Salesforce from "../../../../public/svgs/salesforce.svg"
import Hubspot from "../../../../public/svgs/hubspot.svg"
import Button from "../../primary/Button"
import ActivityIndicator from "../../secondary/ActivityIndicator"
import { FC, useContext, useState } from "react"
import { appContext } from "../../contexts/appContext"
import { useRouter } from "next/router"
import StatusModal from "./status-modal"
import useModal from "@/components/util/useModal"
import { syncTestData } from "@/testData"
import ConnectCrmSection from "./sections/connect-section"
import SyncDataSection from "./sections/syncdata-section"
import { useGetPlatformsQuery } from "../../../../api-feature/apiSlice"
import { ApiType } from "../../../../api-feature/types"

interface props {
    handleChangeStep: (step: 1 | 2 | 3) => void
}

interface platformApi extends ApiType {
    data: {data: {id: number, logo: string, name: string, status: boolean, type: string}[], success: boolean}
}

export type crmconnectedtype = "salesforce" | "hubspot"

const CrmSetup:FC<props> = ({handleChangeStep}) => {
    const {userProfile, setShouldReload} = useContext(appContext)
    const [connected, setConnected] = useState<crmconnectedtype>("" as crmconnectedtype)
    const {data, status, error} = useGetPlatformsQuery<platformApi>("CRM")
    const [section, setSection] = useState<"connect" | "sync">("connect")
    const routeTo = useRouter()
    const crmData = data?.data

    const hubspotId = crmData?.find(item => item?.name === "Hubspot")?.id
    const salesforceId = crmData?.find(item => item?.name === "Salesforce")?.id

    const handleChangeSection = (item: "connect" | "sync") => {
        setSection(item)
    }

    const updateConnected = (text: "salesforce" | "hubspot") => {
        setConnected(text)
    }

    const handleSkip = () => {
        setShouldReload(true)
        routeTo.push("/dashboard")
    }

    return (
        <div className="text-center flex flex-col w-full h-screen ">
            {section === "connect" &&
                <ConnectCrmSection updateConnected={updateConnected} hubspotId={hubspotId} salesforceId={salesforceId} handleChangeStep={handleChangeStep} handleSkip={handleSkip} handleChangeSection={handleChangeSection} />
            }
            {section === "sync" && 
                <SyncDataSection connected={connected} hubspotId={hubspotId} salesforceId={salesforceId} handleChangeStep={handleChangeStep} handleSkip={handleSkip} />
            }
        </div>
    )
}

export default CrmSetup