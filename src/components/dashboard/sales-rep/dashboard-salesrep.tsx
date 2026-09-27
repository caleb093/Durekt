import Button from "@/components/primary/Button"
import Dropdown from "@/components/secondary/Dropdown"
import DropdownItem from "@/components/secondary/DropdownItem"
import GradientCircle from "@/components/secondary/GradientCircle"
import PaginationComponent from "@/components/secondary/Pagination"
import PiechartComponent from "@/components/secondary/Piechart"
import ProgressCircle from "@/components/secondary/ProgressCircle"
import { callDataType } from '@/testData';
import MoreIcon from "../../../../public/svgs/more-icon.svg"
import BookmarkIcon from "../../../../public/svgs/bookmark-icon.svg"
import { dealsData } from '@/testData';
import NavIcon from "../../../../public/svgs/next-icon.svg"
import Callicon from "../../../../public/svgs/round-call.svg"
import BriefcaseIcon from "../../../../public/svgs/briefcase-icon.svg"
import Link from "next/link"
import { useGetSalesDashActivitiesQuery, useGetSalesDashAreaOfConcernQuery, useGetSalesDashAssignedDealsQuery, useGetSalesDashOverviewQuery, useGetSalesDashScheduledTrainingQuery } from "../../../../api-feature/apiSlice"
import { ApiType } from "../../../../api-feature/types"
import { AreaofconcernType, AssignedDealsType, SalesrepType, scheduleTrainingsType } from "../../../../api-feature/manager-owner/sales-rep/salesrep-type"
import { useContext } from "react"
import { appContext } from "@/components/contexts/appContext"
import { getRandomColor } from "@/components/util/helperFunctions"
import Loading from "@/components/secondary/LoadingSpinner"


// const piechartdata = 
//     [
//         { id: 0, value: 40, color: "#C32781", label: "Building Trust"},
//         { id: 1, value: 45, color: "#00FFB0", label: "Building Value"},
//         { id: 2, value: 60, color: "#49D0FF", label: "Conviction"},
//         // { id: 3, value: 80, color: "#C32781", label: "Building Trust"},
//     ]

interface overallApiType extends ApiType {
    data: {success: boolean, data: SalesrepType}
}

interface areaofConcernApi extends ApiType {
    data: {success: boolean, data: AreaofconcernType[]}
}

interface assignedDealsApi extends ApiType {
    data: {success: boolean, data: {data: AssignedDealsType[]}}
}

interface scheduledTrainingApi extends ApiType {
    data: {success: boolean, data: {data: scheduleTrainingsType[]}}
}

interface activitiesApi extends ApiType {
    data: {data: {report?: string, dealCount: number, meetingCount: string}, success: boolean}
}

const SalesrepDashboard = () => {
    const {userProfile} = useContext(appContext)
    const {data: salesrepOverview, status: overviewStatus, error: overviewError} = useGetSalesDashOverviewQuery<overallApiType>()
    const {data: areaOfConcern, status: areaOfConcernStatus, error: areaOfConcernError} = useGetSalesDashAreaOfConcernQuery<areaofConcernApi>()
    const {data: assignedDeals, status: assignedDealsStatus, error: assignedDealsError} = useGetSalesDashAssignedDealsQuery<assignedDealsApi>()
    const {data: datatraining, status: trainingStatus, error: trainingError} = useGetSalesDashScheduledTrainingQuery<scheduledTrainingApi>()
    const {data: activities, status: activityStatus, error: activityError} = useGetSalesDashActivitiesQuery<activitiesApi>()
    
    const overviewData = salesrepOverview?.data
    const areaOfConcernData = areaOfConcern?.data
    const assignedData = assignedDeals?.data?.data
    const trainingData = datatraining?.data?.data
    const activitiesData = activities?.data

    const piechartdata = [] as {id: number, value: number, color: string, label: string}[]
    areaOfConcernData?.map((item, i) => piechartdata.push({id: i, value: item?.grade, color: getRandomColor(), label: item?.skillName.substring(0, 20)}))


    return (
        <div>
            <div className="bg-white border xl:h-[180px] rounded-2xl flex flex-col gap-2 p-3">
                <h1 className="text-[1.5em] font-[600] text-[#333333]">Welcome Back!</h1>
                <div className="flex flex-col xl:flex-row gap-5 h-full">
                    <div className="flex gap-4">
                        <div className='bg-slate-700 w-[130px] h-[120px] xl:h-full rounded-lg flex-shrink-0 '>
                        </div>
                        <div className='flex justify-between my-auto'>
                            <div>
                                <p className="text-[20px] text-[#333333] font-[500]">{userProfile?.firstName} {userProfile?.lastName}</p>
                                <p className='text-[#828282] text-[14px]'>{userProfile?.company?.position}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 flex items-center'>
                        <div className='grid w-full grid-cols-2 mt-4 lg:mt-0 mdx2:flex justify-between gap-10 lg:gap-4 text-[#333333]'>
                            <ProgressCircle type="progress" value={overviewData?.grade} textClassname='text-[1.2em]' size={50} label={<span >Overall<br />Rating</span>} />
                            <div className='flex flex-col sm:flex-row items-center gap-2'>
                                <GradientCircle size={50}>
                                    <Callicon />
                                </GradientCircle>
                                <div>
                                    <p className='text-[#333333] font-[600]'>{activitiesData?.meetingCount ?? 0}</p>
                                    <p className="text-[14px] text-[#6D6D6D]">Total Calls</p>
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row items-center gap-2'>
                                <GradientCircle size={50}>
                                    <BriefcaseIcon />
                                </GradientCircle>
                                <div>
                                    <p className='text-[#333333] font-[600]'>{activitiesData?.dealCount ?? 0}</p>
                                    <p className="text-[14px] text-[#6D6D6D]">Deals</p>
                                </div>
                            </div>
                            <ProgressCircle type="skill" value={overviewData?.skillSymbol} size={50} textClassname="text-[1.2em]" label={<span className="text-[14px] text-[#6D6D6D]">{overviewData?.skills}</span>} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='py-5'>
                <div className='flex flex-col mdx5:flex-row gap-5 mt-5'>
                    <div className='border flex-1 bg-white p-3 pb-10 px-3 rounded-lg'>
                        <div className="flex justify-between mb-10">
                            <h1 className='text-[#333333] text-[20px] font-[600] pb-2'>Area of concern</h1>
                            <Link href={"/dashboard/insights"}>
                                <Button className="bg-white border border-[#C32781] rounded-md px-7 py-[4px]"><p className="text-[#C32781]">View Insight</p></Button>
                            </Link>
                        </div>
                    {areaOfConcernStatus === "pending" && <div className="flex items-center justify-center my-3"><Loading /></div>}
                    {areaOfConcernStatus === "rejected" && <p className="text-red-600 italic text-center">Error occured</p>}
                    {areaOfConcernStatus === "fulfilled" && <PiechartComponent data={piechartdata} />}
                    </div>
                    <div className='border flex-1 bg-white pt-3 pb-10 px-3 rounded-lg'>
                        <h1 className='text-[#333333] text-[20px] font-[600] pb-6'>Dureket Report</h1>
                        {activityStatus === "pending" && <div className="flex items-center justify-center my-3"><Loading /></div>}
                        {activityStatus === "rejected" && <p className="text-red-600 italic text-center">Error occured</p>}
                        {activityStatus === "fulfilled" && <p className='text-[#4A4A4A] text-[13.5px] font-[400] mdx5:h-[16.5em] overflow-auto'>{activitiesData?.report ?? "No report"}</p>}
                    </div>
                </div>
                <div className='flex flex-col mdx3:flex-row gap-5 mt-5'>
                    <div className='border flex-1 flex flex-col bg-white p-3 pb-10 px-3 rounded-lg'>
                        <div className="flex justify-between mb-0">
                            <h1 className='text-[#333333] text-[20px] font-[600] pb-4'>Newest Assigned Deals</h1>
                            <Link href={"/dashboard/deals"}>
                                <Button className="bg-white border border-[#C32781] rounded-md px-7 py-[4px]"><p className="text-[#C32781]">View All</p></Button>
                            </Link>
                        </div>
                        <div className=' h-full'>
                            <PaginationComponent    
                                loading={assignedDealsStatus === "pending"}
                                error={assignedDealsStatus === "rejected"}                             
                                items={assignedData}
                                hidePaginationStatus
                                itemsPerPage={5}
                                renderItems={(data) => (
                                    data?.slice(0, 4)?.map(item => (
                                        <div className="flex h-full transition-all cursor-pointer py-2 justify-between items-center">
                                            {/* @ts-ignore */}
                                            <p className="font-[600] text-[14px] text-[#333333] underline">{item.name}</p>
                                        </div>
                                    ))
                                )}
                                footer={() => <></>}
                            />
                        </div>
                    </div>
                    <div className='border flex-1 bg-white pt-3 pb-10 px-3 rounded-lg'>
                        <div className="flex justify-between mb-3">
                            <h1 className='text-[#333333] text-[20px] font-[600] '>Newest Scheduled Training</h1>
                            <Link href={"/dashboard/trainings/112"}>
                                <Button className="bg-white border border-[#C32781] rounded-md px-7 py-[4px]"><p className="text-[#C32781]">View All</p></Button>
                            </Link>
                        </div>
                        <div>
                            <PaginationComponent 
                                loading={trainingStatus === "pending"}
                                error={trainingStatus === "rejected"}
                                items={trainingData}
                                hidePaginationStatus
                                itemsPerPage={5}
                                renderItems={(data) => (
                                    data?.slice(0, 4)?.map((item, i) => (
                                        <div className="flex cursor-pointer text-[#333333] py-2 text-[14px] justify-between items-center ">
                                            <div className='flex '>
                                                <p className="text-[17px] pr-3">{i+1}.</p>
                                                {/* <MoreIcon className="rotate-[90deg]" /> */}
                                                <div>
                                                    <p className="font-[600]">{item?.trainingTopic?.title}</p>
                                                    <p className='text-[12px]'>{item?.trainingTopic?.training?.title}</p>
                                                </div>
                                            </div>
                                            <progress value={20} />
                                        </div>
                                    ))
                                )}
                                footer={() => <></>}
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesrepDashboard