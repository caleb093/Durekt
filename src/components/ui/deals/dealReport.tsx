import { FC } from "react"
import { dealsOverviewType } from "../../../../api-feature/manager-owner/deals/deal-type"
import Loading from "@/components/secondary/LoadingSpinner"

interface props {
    loading: boolean,
    error: boolean,
    data: dealsOverviewType
}

const DealReport:FC<props> = ({loading, error, data}) => {
    return (
        <div className="flex-1 bg-white border p-3">
            <h1 className='text-[#333333] text-[20px] font-[600] pb-4'>Durekt Report</h1>
            {loading && <div className="h-[10em] flex items-center justify-center"><Loading /></div>}
            {error && <div className="h-[10em] flex items-center justify-center"><p className="text-red-600 text-center italic">Error occured</p></div>}
            {(!loading && !error) && 
                <p className='text-[#4A4A4A] text-[13.5px] font-[400]'>{data?.details?.report ?? `No Report`}</p>
            }
        </div>
    )
}

export default DealReport