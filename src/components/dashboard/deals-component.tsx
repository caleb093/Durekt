import { globalState } from "../../../api-feature/apiSlice"
import DealsManager from "./manager/deals-manager"
import DealSalesrep from "./sales-rep/deals-salesrep"
import { useContext } from "react"
import { appContext } from "../contexts/appContext"
import Walkthrough from "../secondary/Walkthrough"

const steps = [
    {
        target: '#create-deal-btn',
        content: 'Create Deals here, so as to be able to schedule meetings',
    },
    {
        target: '.MuiDataGrid-columnHeader--last',
        content: 'To schedule meeting for a deal, click on a deal actions icon and view more',
    },
]

const DealsComponent = () => {
    const {accountType: account_type} = useContext(appContext)

    return (
        <div>
            <Walkthrough steps={steps} />
            {(account_type === "manager" || account_type === "owner") && <DealsManager />}
            {account_type === "sales personel" && <DealSalesrep />}
        </div>
    )
}

export default DealsComponent
