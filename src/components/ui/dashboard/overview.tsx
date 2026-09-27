import MoreIcon from "../../../../public/svgs/more-icon.svg"
import { useGetOverviewQuery } from "../../../../api-feature/apiSlice"
import { overviewType } from "../../../../api-feature/manager-owner/overview/overview-type"
import { ApiType } from "../../../../api-feature/types"
import CallIcon from "../../../../public/svgs/call-icon.svg"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"
import { useContext } from "react"
import { dataContext } from "@/components/contexts/dataContext"

interface overviewApiType extends ApiType {
    data: {success: boolean, data: overviewType}
}

export const OverviewComponent = () => {
    const {data, status, error} = useGetOverviewQuery<overviewApiType>()
    const {overallSalesrepData} = useContext(dataContext)

    const overviewData = data?.data

    return (
        <div className="grid sm:grid-cols-2 gap-4 w-full flex-[2]">
            <div className="bg-white rounded-2xl p-3">
                <div className="flex justify-between ">
                    <div className="flex gap-2 items-center">
                        <CallIcon className="flex-shrink-0" />
                        <p className=" text-[14px] font-[600]">Total calls Analyzed</p>
                    </div>
                    {/* <div className="flex gap-1 items-center">
                        <MoreIcon />
                    </div> */}
                </div>
                <h1 className="text-[29px] font-semibold text-[#333333] pt-2 pb-4">
                    {status === "pending" ? 
                        <ActivityIndicator color="#333333" /> : 
                    status === "rejected" ? 
                        <span className="text-red-600">Error</span> :
                    status === "fulfilled" && 
                        overviewData?.total_calls_analysed
                    }
                </h1>
                <p className="text-[#828282] text-[12px]">sales calls analyzed this month</p>
            </div>
            <div className="bg-white rounded-2xl p-3">
                <div className="flex justify-between ">
                    <div className="flex gap-2 items-center">
                        <CallIcon className="flex-shrink-0" />
                        <p className=" text-[14px] font-[600]">Average Performance Score</p>
                    </div>
                    {/* <div className="flex gap-1 items-center">
                        <MoreIcon />
                    </div> */}
                </div>
                <h1 className="text-[29px] font-semibold text-[#333333] pt-2 pb-4">
                    {status === "pending" ? 
                        <ActivityIndicator color="#333333" /> : 
                    status === "rejected" ? 
                        <span className="text-red-600">Error</span> :
                    status === "fulfilled" && 
                        `${overviewData?.average_performance}%`
                    }
                </h1>
                <p className="text-[#828282] text-[12px]">Average performance grade of all analyzed calls</p>
            </div>
            <div className="bg-white rounded-2xl p-3">
                <div className="flex justify-between ">
                    <div className="flex gap-2 items-center">
                        <CallIcon className="flex-shrink-0" />
                        <p className=" text-[14px] font-[600]">Top Performer</p>
                    </div>
                    {/* <div className="flex gap-1 items-center">
                        <MoreIcon />
                    </div> */}
                </div>
                {overallSalesrepData?.length > 0 && <h1 className="text-[29px] font-semibold text-[#333333] pt-2 pb-4">{overallSalesrepData[0]?.firstName ?? "null"} {overallSalesrepData[0]?.lastName}</h1>}
                <p className="text-[#828282] text-[12px]">Highest-performing salesperson</p>
            </div>
            <div className="bg-white rounded-2xl p-3">
                <div className="flex justify-between ">
                    <div className="flex gap-2 items-center">
                        <CallIcon className="flex-shrink-0" />
                        <p className=" text-[14px] font-[600]">Improvement Areas</p>
                    </div>
                    {/* <div className="flex gap-1 items-center">
                        <MoreIcon />
                    </div> */}
                </div>
                <h1 className="text-[29px] font-semibold text-[#333333] pt-2 pb-4">
                    {status === "pending" ? 
                        <ActivityIndicator color="#333333" /> : 
                    status === "rejected" ? 
                        <span className="text-red-600">Error</span> :
                    status === "fulfilled" && 
                        (overviewData?.improvement_areas ?? 0)
                    }
                </h1>
                <p className="text-[#828282] text-[12px]">Calls flagged for needing improvement.</p>
            </div>
        </div>
    )
}

export default OverviewComponent