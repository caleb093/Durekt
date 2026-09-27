import Uptime from "@/components/ui/uptime"
import SecurityIcon from "../../../../public/svgs/security-icon.svg"
import SecurityWarnings from "@/components/ui/securitywarnings"

const ServerhealthComponent = () => {
    return (
        <div>
             <div className="flex flex-col ">
                <h1 className="text-[20px] font-[600] text-[#333333]">Server Health</h1>
                <p className="text-[#333333] font-[500] ">Last updated: 2024-08-16 14:35</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-6">
                <div className="flex-[0.6] p-4 bg-white rounded-xl">
                    <h1 className="text-[#333333] font-[600] text-[18px]">Risk Score</h1>
                </div>
                <div className="flex-[1]">
                   <Uptime />
                </div>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row gap-5 text-[#333333]">
                <div className="flex-[1]">
                    <SecurityWarnings />
                </div>
                <div className="bg-green-300 flex-[0.6] p-5 rounded-xl">

                </div>
            </div>
        </div>
    )
}

export default ServerhealthComponent