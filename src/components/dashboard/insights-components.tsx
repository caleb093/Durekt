import { useContext } from "react"
import { globalState } from "../../../api-feature/apiSlice"
import InsightsManager from "./manager/insights-manager"
import InsightSalesrep from "./sales-rep/insights-salesrep"
import { appContext } from "../contexts/appContext"

export const skillsData = [
    {short: "BO", name: "Becoming Obsessed", score: 20}, 
    {short: "BV", name: "Building Value", score: 60},
    {short: "C", name: "Conviction", score: 80},
    {short: "VP", name: "Value Presentation", score: 90},
    {short: "BO", name: "Becoming Obsessed", score: 20}, 
    {short: "BV", name: "Building Value", score: 60},
    {short: "C", name: "Conviction", score: 80},
    {short: "VP", name: "Value Presentation", score: 90},
    {short: "BO", name: "Becoming Obsessed", score: 20}, 
    {short: "BV", name: "Building Value", score: 60},
    {short: "C", name: "Conviction", score: 80},
    {short: "VP", name: "Value Presentation", score: 90},
    {short: "BO", name: "Becoming Obsessed", score: 20}, 
    {short: "BV", name: "Building Value", score: 60},
    {short: "C", name: "Conviction", score: 80},
    {short: "VP", name: "Value Presentation", score: 90},
    {short: "BV", name: "Building Value", score: 60},
    {short: "C", name: "Conviction", score: 80},
    {short: "VP", name: "Value Presentation", score: 90},
    {short: "BO", name: "Becoming Obsessed", score: 20}, 
    {short: "BV", name: "Building Value", score: 60},
    {short: "C", name: "Conviction", score: 80},
    {short: "VP", name: "Value Presentation", score: 90},
    {short: "C", name: "Conviction", score: 80},
    {short: "VP", name: "Value Presentation", score: 90},
]

const InsightsComponent = () => {
    const {accountType: account_type} = useContext(appContext)

    return (
        <div>
            {(account_type === "manager" || account_type === "owner") && <InsightsManager />}
            {account_type === "sales personel" && <InsightSalesrep />}
        </div>
    )   
}

export default InsightsComponent