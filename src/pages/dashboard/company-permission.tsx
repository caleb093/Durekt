import DashboardLayout from "@/components/layouts/DashboardLayout"
import CompanypermissionComponent from "../../components/dashboard/companypermission-component"
import { useContext } from "react"
import { appContext } from "@/components/contexts/appContext"

const CompanyPermission = () => {
    const {accountType} = useContext(appContext)
    return (
        <DashboardLayout>
            {accountType !== "admin" && <CompanypermissionComponent />}
        </DashboardLayout>
    )
}

export default CompanyPermission