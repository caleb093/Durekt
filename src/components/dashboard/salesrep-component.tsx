import SalesRepManager from "./manager/salesrep-manager"
import { appContext } from "../contexts/appContext"
import { useContext } from "react"

const SalesRepComponent = () => {
    const {accountType: account_type} = useContext(appContext)

    return(
        <div>
            {(account_type === "manager" || account_type === "owner") && <SalesRepManager />}
        </div>
    )
}

export default SalesRepComponent