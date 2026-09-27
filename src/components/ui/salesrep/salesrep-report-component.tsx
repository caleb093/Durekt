import Loading from "@/components/secondary/LoadingSpinner"
import { useGetSalesRepActivitiesQuery } from "../../../../api-feature/apiSlice"
import { ApiType } from "../../../../api-feature/types"
import { FC } from "react"

interface activitiesApi extends ApiType {
    data: {data: {report?: string, dealCount: number, meetingCount: string}, success: boolean}
}

interface props {
    userId: number
}

const SalesReportComponent:FC<props> = ({userId}) => {
    const {data: activitiesData, status: activitiesStatus, error: activitiesError} = useGetSalesRepActivitiesQuery<activitiesApi>(userId, {skip: !userId})
    
    return (
        <div className='border flex-1 bg-white pt-3 pb-10 px-3 rounded-lg'>
            <h1 className='text-[#333333] text-[20px] font-[600] pb-2'>Dureket Report</h1>
            {activitiesStatus === "pending" && <div className="flex items-center justify-center my-3"><Loading /></div>}
            {activitiesStatus === "rejected" && <p className="text-red-600 italic text-center">Error occured</p>}
            {activitiesStatus === "fulfilled" && <p className='text-[#4A4A4A] text-[13.5px] font-[400] mdx5:h-[16.5em] overflow-auto'>{activitiesData?.data?.report ?? "No report"}</p>}
        </div>
    )
}

export default SalesReportComponent