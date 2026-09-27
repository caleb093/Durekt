import DashboardLayout from "@/components/layouts/DashboardLayout"
import { appContext } from "@/components/contexts/appContext"
import { useContext } from "react"
import DealdetailsComponent from "@/components/dashboard/deals-details-component"

const Deals = () => {
    const {accountType} = useContext(appContext)

    return (
        <DashboardLayout>
            {(accountType !== "admin" && accountType !== "") && <DealdetailsComponent />}
        </DashboardLayout>
    )
}

export default Deals