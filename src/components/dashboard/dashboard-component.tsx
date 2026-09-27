import ManagerDashboard from "./manager/dashboard-manager"
import SalesrepDashboard from "./sales-rep/dashboard-salesrep"
import AdminDashboard from "./admin/dashboard-admin"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { appContext } from "../contexts/appContext"
import Walkthrough from "../secondary/Walkthrough"

const steps = [
    {
        target: '#nav-create-team',
        content: 'Manage your team members from this tab',
    },
    {
        target: '#nav-create-deal',
        content: 'Manage your Deals and Meetings from this tab',
    },
    {
        target: '#nav-team-rating',
        content: 'View your team ratings here',
    },
    {
        target: '#nav-settings',
        content: 'Mangage your settings here (subscriptions, profile..)',
    },
    {
        target: '#nav-notifications',
        content: 'View and Manage your Notifications here',
    },
];

const DashboardComponent = () => {
    const {accountType: account_type, shouldReload, setShouldReload, displayWalkthrough} = useContext(appContext)
     
    useLayoutEffect(() => {
        if (shouldReload) {
            setShouldReload(false); // Reset the flag after reloading
            window.location.reload(); // Reload the page
        }
    }, [shouldReload, setShouldReload]);
    
    return (
        <div>
            <Walkthrough steps={steps} />
            {account_type === "admin" && <AdminDashboard />}
            {(account_type === "manager" || account_type === "owner") && <ManagerDashboard />}
            {account_type === "sales personel" && <SalesrepDashboard />}
        </div>
    )
}

export default DashboardComponent
