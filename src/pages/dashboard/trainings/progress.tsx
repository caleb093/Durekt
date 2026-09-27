import { appContext } from "@/components/contexts/appContext"
import TrainingTeamProgress from "@/components/dashboard/teamprogress-component"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import Button from "@/components/primary/Button"
import Link from "next/link"
import { useContext } from "react"

const TrainingProgress = () => {
    const {accountType} = useContext(appContext)

    return (
        <DashboardLayout>
            {(accountType === "manager" || accountType === "owner") ? <TrainingTeamProgress /> : 
                <div className=" h-[70vh] justify-center items-center flex flex-col">
                    <p>Un-Authorized</p>
                </div>
            }
        </DashboardLayout>
    )
}

export default TrainingProgress