import PiechartComponent from "@/components/secondary/Piechart"
import Loading from "@/components/secondary/LoadingSpinner"
import { useGetSalesrepAreaOfConcernQuery } from "../../../../api-feature/apiSlice"
import { ApiType } from "../../../../api-feature/types"
import { AreaofconcernType } from "../../../../api-feature/manager-owner/sales-rep/salesrep-type"
import { FC } from "react"
import { getRandomColor } from "@/components/util/helperFunctions"

interface areaofConcernApi extends ApiType {
    data: {success: boolean, data: AreaofconcernType[]}
}

interface props {
    userId: number
}

const AreaOfConcern:FC<props> = ({userId}) => {
    const {data: areaofconcern, status: areaofConcerStatus, error: areaofconcernError} = useGetSalesrepAreaOfConcernQuery<areaofConcernApi>(userId)
    const areaofConcernData = areaofconcern?.data

    const piechartdata = [] as {id: number, value: number, color: string, label: string}[]
    areaofConcernData?.map((item, i) => piechartdata.push({id: i, value: item?.grade, color: getRandomColor(), label: item?.skillName.substring(0, 20)}))

    return (
        <div className='border flex-1 bg-white p-3 pb-10 px-3 rounded-lg'>
            <h1 className='text-[#333333] text-[20px] font-[600] pb-2'>Area of concern</h1>
            {areaofConcerStatus === "pending" && <div className="flex items-center justify-center my-3"><Loading /></div>}
            {areaofConcerStatus === "rejected" && <p className="text-red-600 italic text-center">Error occured</p>}
            {areaofConcerStatus === "fulfilled" && <PiechartComponent data={piechartdata} />}
        </div>
    )
}

export default AreaOfConcern