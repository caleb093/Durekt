import ArrorwIcon from "../../../../public/svgs/arrow2-icon.svg"
import { useContext, useState } from "react"
import SkillsExcerpt from "@/components/secondary/SkillsExcerpt"
import { useGetSalesDashInsightsQuery } from "../../../../api-feature/apiSlice"
import { ApiType, insightsType } from "../../../../api-feature/types"
import { appContext } from "@/components/contexts/appContext"

interface insightsApi extends ApiType {
    data: {data: {pagination: {totalPages: number, currentPage: number, totalSkills: number, pageSize: number}, potentialRating: number, skills: insightsType[]}, success: boolean}
}

const InsightSalesrep = () => {
    const {userProfile} = useContext(appContext)
    const {data, status, error} = useGetSalesDashInsightsQuery<insightsApi>()

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-[600] text-[#333333]">My Rating</h1>
            </div>

            <div className="mt-5 flex flex-col-reverse mdx2:flex-row gap-5 ">
                <SkillsExcerpt data={data?.data?.skills} status={status} />
                 
                <div className="bg-white p-2 flex-[0.5]  border rounded-md">
                    <div className="bg-slate-500 h-[30em] mdx2:h-full flex">
                        <div className="font-[700] rounded-md text-white w-full mb-3 pb-2 pt-3 text-center bg-slate-400 px-2 mx-3 mt-auto">
                            <p className="bg-gradient-to-r from-[#6FA9E2] to-[#B3387F] px-4 py-3 inline-block rounded-full">{data?.data?.potentialRating ?? 0}</p>
                            <p className="mt-2 text-[18px]">Potential Rating</p>
                            {/* @ts-ignore */}
                            <p className="bg-green-400 rounded-md py-3 mt-3 text-[25px]">{userProfile?.firstName} {userProfile?.lastName}</p>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default InsightSalesrep