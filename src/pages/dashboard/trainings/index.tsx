import DashboardLayout from "@/components/layouts/DashboardLayout"
import TrainingsComponent from "@/components/dashboard/trainings-component"
import { globalState } from "../../../../api-feature/apiSlice"
import { useRouter } from "next/router"
import { useContext, useLayoutEffect } from "react"
import { appContext } from "@/components/contexts/appContext"

const Trainings = () => {
    const {accountType: account_type} = useContext(appContext)
    const routeTo = useRouter()

    useLayoutEffect(() => {
        if (account_type !== "manager" && account_type !== "owner" ) {
            routeTo.push("/dashboard")
            return
        }
    },[])

    return (
        <DashboardLayout>
            {(account_type === "manager" || account_type === "owner")&& <TrainingsComponent />}
        </DashboardLayout>
    )
}

export default Trainings