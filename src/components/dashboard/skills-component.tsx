import SkillsManager from "./manager/skills-manager"
import { useRouter } from "next/router"
import { useLayoutEffect } from "react"
import { useContext } from "react"
import { appContext } from "../contexts/appContext"

const SkillsComponent = () => {
    const {accountType: account_type} = useContext(appContext)
    const routeTo = useRouter()
    
    useLayoutEffect(() => {
        if (account_type !== "owner" && account_type !== "manager") {
            routeTo.push("/dashboard")
            return
        }
    },[])

    return (
        <div>
            {(account_type === "manager" || account_type === "owner") && <SkillsManager />}
        </div>
    )
}

export default SkillsComponent