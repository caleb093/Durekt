import { FC } from "react"
import { dealsOverviewType } from "../../../../api-feature/manager-owner/deals/deal-type"
import ProgressCircle from "../../secondary/ProgressCircle"
import Loading from "@/components/secondary/LoadingSpinner"

interface props {
    loading: boolean,
    error: boolean,
    data: dealsOverviewType
}

const DealOverview:FC<props> = ({loading, error, data}) => {

    return (
        <div className="flex-[1.3] bg-white border p-3 ">
            {loading && <div className="h-full flex items-center justify-center"><Loading /></div>}
            {error && <div className="h-full flex items-center justify-center"><p className="text-red-600 text-center italic">Error occured</p></div>}
            {(!loading && !error) && 
                <>
                    <div className=""><div className='flex flex-1'><ProgressCircle type="progress" value={data?.overall_deal_health ?? 0} size={110} label={<span>Overall<br />Deal Health</span>} /></div></div>
                    <div className="flex flex-col gap-4 mt-4">
                        {/* <div className="flex items-center text-[#333333] justify-between">
                            <p className="font-[600] text-[16px]">Project Name:</p>
                            <p className="text-[13px] font-[500]">{data?.details?.name ?? "null"}</p>
                        </div> */}
                        <div className="flex items-center text-[#333333] justify-between">
                            <p className="font-[600] text-[16px]">Client/Company:</p>
                            <p className="text-[13px] font-[500]">{data?.details?.client ?? "null"}</p>
                        </div>
                        <div className="flex items-center text-[#333333] justify-between">
                            <p className="font-[600] text-[16px]">Stage:</p>
                            <p className="text-[13px] font-[500]">{data?.details?.stage?.name ?? "null"}</p>
                        </div>
                        <div className="flex items-center text-[#333333] justify-between">
                            <p className="font-[600] text-[16px]">Status:</p>
                            <p className="text-[13px] bg-[#ECF1EB] text-[#2E7E0B] font-[600] py-[3px] px-3">{data?.details?.status ?? "null"}</p>
                        </div>
                        {/* <div className="flex items-center text-[#333333] justify-between">
                            <p className="font-[600] text-[16px]">Date Created:</p>
                            <p className="text-[13px] font-[500]">{data?.details?.createdAt?.toString() ?? "null"}</p>
                        </div>
                        <div className="flex items-center text-[#333333] justify-between">
                            <p className="font-[600] text-[16px]">Date Modified:</p>
                            <p className="text-[13px] font-[500]">{data?.details?.updatedAt?.toString() ?? "null"}</p>
                        </div> */}
                    </div>    
                </>
            }
        </div>
    )
}

export default DealOverview