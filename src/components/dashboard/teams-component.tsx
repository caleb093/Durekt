import { globalState } from "../../../api-feature/apiSlice"
import TeamsManager from "./manager/teams-manager"
import { useRouter } from "next/router"
import { useLayoutEffect } from "react"
import { useContext } from "react"
import { appContext } from "../contexts/appContext"

const TeamsComponent = () => {
    const {accountType: account_type} = useContext(appContext)
    const routeTo = useRouter()

    useLayoutEffect(() => {
        if (account_type !== "manager" && account_type !== "owner") {
            routeTo.push("/dashboard")
            return
        }
    },[])

    return (
        <div>
            {(account_type === "manager" || account_type === "owner") && <TeamsManager />}
        </div>
    )
}

export default TeamsComponent