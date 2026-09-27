import Button from "../../primary/Button"
import PiechartComponent from "../../secondary/Piechart"
import PaginationComponent from "../../secondary/Pagination"
import Dropdown from "../../secondary/Dropdown"
import DropdownItem from "../../secondary/DropdownItem"
import NavIcon from "../../../../public/svgs/next-icon.svg"
import MoreIcon from "../../../../public/svgs/more-icon.svg"
import { dealsData } from "@/testData"
import { FC, useCallback, useState } from "react"
import { useGetSalesRepActivitiesQuery, useGetSalesrepAreaOfConcernQuery, useGetSalesrepDealsQuery, useGetSalesrepScheduledTrainingQuery } from "../../../../api-feature/apiSlice"
import { APISTATUS, ApiType } from "../../../../api-feature/types"
import { AreaofconcernType, AssignedDealsType, salesrepActivitiesType, scheduleTrainingsType } from "../../../../api-feature/manager-owner/sales-rep/salesrep-type"
import Loading from "../../secondary/LoadingSpinner"
import useModal from "../../util/useModal"
import MessageModal from "../../modals/message-modal"
import { getRandomColor } from "../../util/helperFunctions"
import { useRouter } from "next/router"
import AreaOfConcern from "./area-of-concern"
import SalesReportComponent from "./salesrep-report-component"

// interface areaofConcernApi extends ApiType {
//     data: {success: boolean, data: AreaofconcernType[]}
// }

interface assignedDealsApi extends ApiType {
    data: {success: boolean, data: {data: AssignedDealsType[]}}
}

interface scheduledTrainingApi extends ApiType {
    data: {success: boolean, data: {data: scheduleTrainingsType[]}}
}

interface props {
    userId: number,
    activitiesData: {data: salesrepActivitiesType, success: boolean},
    activitiesStatus: APISTATUS,
    modalOpen: boolean;
    closeModal: () => void;
    openModal: () => void
}

const SalesRepDetails:FC<props> = ({userId, activitiesData, activitiesStatus, modalOpen, openModal, closeModal}) => {
    const router = useRouter()
    // const {data: areaofconcern, status: areaofConcerStatus, error: areaofconcernError} = useGetSalesrepAreaOfConcernQuery<areaofConcernApi>(userId)
    const {data: assignedData, status: assignedDealsStatus, error: assignedDealsError} = useGetSalesrepDealsQuery<assignedDealsApi>(userId)
    const {data: datatraining, status: trainingStatus, error: trainingError} = useGetSalesrepScheduledTrainingQuery<scheduledTrainingApi>(userId)

    const trainingData = datatraining?.data?.data
    const assignedDeals = assignedData?.data?.data
    // const areaofConcernData = areaofconcern?.data

    // const piechartdata = [] as {id: number, value: number, color: string, label: string}[]
    // areaofConcernData?.map((item, i) => piechartdata.push({id: i, value: item?.grade, color: getRandomColor(), label: item?.skillName.substring(0, 20)}))

    const [displayTrainingDropdown, setDisplayTrainingDropdown] = useState(false)
    const handleTrainingDropdown = () => {
        setDisplayTrainingDropdown(prev => !prev)
    }

    return (
        <div className='py-5'>
            <MessageModal 
                modalOpen={modalOpen}
                closeModal={closeModal}
                userId={userId}
            />
            <div className='flex w-[20em] gap-4 ml-auto'>
                <Button onClick={openModal} className='text-[13px] py-1'>Message</Button>
                <Button onClick={() => router.push("/dashboard/trainings")} className='text-[13px] py-1 bg-transparent border border-[#A4A4A4]' ><p className='text-[#333333]'>Schedule Training</p></Button>
            </div>
            <div className='flex flex-col mdx5:flex-row gap-5 mt-5'>
                <AreaOfConcern userId={userId} />
                {/* <div className='border flex-1 bg-white p-3 pb-10 px-3 rounded-lg'>
                    <h1 className='text-[#333333] text-[20px] font-[600] pb-2'>Area of concern</h1>
                    {areaofConcerStatus === "pending" && <div className="flex items-center justify-center my-3"><Loading /></div>}
                    {areaofConcerStatus === "rejected" && <p className="text-red-600 italic text-center">Error occured</p>}
                    {areaofConcerStatus === "fulfilled" && <PiechartComponent data={piechartdata} />}
                </div> */}
                <SalesReportComponent userId={userId} />
                {/* <div className='border flex-1 bg-white pt-3 pb-10 px-3 rounded-lg'>
                    <h1 className='text-[#333333] text-[20px] font-[600] pb-2'>Dureket Report</h1>
                    {activitiesStatus === "pending" && <div className="flex items-center justify-center my-3"><Loading /></div>}
                    {activitiesStatus === "rejected" && <p className="text-red-600 italic text-center">Error occured</p>}
                    {activitiesStatus === "fulfilled" && <p className='text-[#4A4A4A] text-[13.5px] font-[400] mdx5:h-[16.5em] overflow-auto'>{activitiesData?.data?.report ?? "No report"}</p>}
                </div> */}
            </div>
            <div className='flex flex-col mdx3:flex-row gap-5 mt-5'>
                <div className='border flex-1 flex flex-col bg-white p-3 pb-10 px-3 rounded-lg'>
                    <h1 className='text-[#333333] text-[20px] font-[600] pb-4'>Assigned Deals</h1>
                    <div className=' h-full'>
                        <PaginationComponent 
                            loading={assignedDealsStatus === "pending"}
                            error={assignedDealsStatus === "rejected"}
                            items={assignedDeals}
                            hidePaginationStatus
                            itemsPerPage={5}
                            renderItems={(data) => (
                                data?.map((item, i) => (
                                    <div key={i} className="flex h-full transition-all cursor-pointer py-2 justify-between items-center">
                                        <p className="font-[600] mb-auto text-[14px] text-[#333333] underline">{item.name}</p>
                                    </div>
                                ))
                            )}
                            footer={({ currentPage, totalPages, handlePageChange, itemsPerPage, handlePageSizeChange, start, end }) => (
                                <div className='flex flex-col xl:flex-row justify-between gap-4'>
                                    <div className='mt-4 sm:mt-0'>
                                        <p className='text-[#626262] font-light text-[14px]'>{`Showing ${start} - ${end} of ${dealsData.length} entries`}</p>
                                    </div>
                                    <div className='flex items-center gap-2 justify-between'>
                                        <button className='mr-3 scale-[0.85] cursor-pointer hover:bg-slate-300 rounded-lg active:scale-[1.05] transition-all p-1' onClick={() => handlePageChange(currentPage - 1)}  disabled={currentPage === 1}><NavIcon /></button>
                                        <div className='flex items-center gap-1 text-[#333333]'>
                                            <p>Page</p>
                                            <div className=' border border-[#D4D4D4] ml-3 mr-1 rounded-md w-14 pl-2 '><p>{currentPage}</p></div>
                                            <p>of <span className='pl-1'>{totalPages}</span></p>
                                        </div>
                                        <button className="rotate-[180deg] ml-2 scale-[0.85] cursor-pointer hover:bg-slate-300 rounded-lg active:scale-[1.05] transition-all p-1" onClick={() => handlePageChange(currentPage + 1)}  disabled={currentPage === totalPages}><NavIcon /></button>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className='border flex-1 bg-white pt-3 pb-10 px-3 rounded-lg'>
                    <div className='flex justify-between pb-4'>
                        <h1 className='text-[#333333] text-[20px] font-[600] '>Scheduled Training</h1>
                        <div className='relative flex w-[30%]'>
                            <div onClick={handleTrainingDropdown} className='border border-[#A4A4A4] w-full relative rounded-lg pl-3 flex items-center text-[14px] text-[#333333]'>
                                <p>All</p>
                            </div>
                            <Dropdown className='-left-5 top-[35px]' isOpen={displayTrainingDropdown}>
                                <DropdownItem className='py-1 px-2' onClick={handleTrainingDropdown} text='Completed' />
                                <DropdownItem className='py-1 px-2' onClick={() => {}} text='In Progress' />
                                <DropdownItem className='py-1 px-2' onClick={() => {}} text='Not Started' />
                            </Dropdown>
                        </div>
                    </div>
                    <div>
                        <PaginationComponent 
                            loading={trainingStatus === "pending"}
                            error={trainingStatus === "rejected"}
                            items={trainingData}
                            hidePaginationStatus
                            itemsPerPage={5}
                            renderItems={(data) => (
                                data?.map((item, i) => (
                                    <div key={i} className="flex cursor-pointer mb-auto py-2 text-[#333333] text-[14px] justify-between items-center ">
                                        <div className='flex items-center'>
                                            <MoreIcon className="rotate-[90deg]" />
                                            <div>
                                                <p className="font-[600]">{item?.trainingTopic?.title}</p>
                                                <p className='text-[12px]'>{item?.trainingTopic?.training?.title}</p>
                                            </div>
                                        </div>
                                        <p className='px-3 bg-[#D9D9D94D] text-[#333333] rounded-full'>{item?.progress}</p>
                                    </div>
                                ))
                            )}
                            footer={({ currentPage, totalPages, handlePageChange, itemsPerPage, handlePageSizeChange, start, end }) => (
                                <div className='flex flex-col xl:flex-row justify-between gap-4 '>
                                    <div className='mt-4 sm:mt-0'>
                                        <p className='text-[#626262] font-light text-[14px]'>{`Showing ${start} - ${end} of ${dealsData.length} entries`}</p>
                                    </div>
                                    <div className='flex items-center gap-2 justify-between'>
                                        <button className='mr-3 scale-[0.85] cursor-pointer hover:bg-slate-300 rounded-lg active:scale-[1.05] transition-all p-1' onClick={() => handlePageChange(currentPage - 1)}  disabled={currentPage === 1}><NavIcon /></button>
                                        <div className='flex items-center gap-1 text-[#333333]'>
                                            <p>Page</p>
                                            <div className=' border border-[#D4D4D4] ml-3 mr-1 rounded-md w-14 pl-2 '><p>{currentPage}</p></div>
                                            <p>of <span className='pl-1'>{totalPages}</span></p>
                                        </div>
                                        <button className="rotate-[180deg] ml-2 scale-[0.85] cursor-pointer hover:bg-slate-300 rounded-lg active:scale-[1.05] transition-all p-1" onClick={() => handlePageChange(currentPage + 1)}  disabled={currentPage === totalPages}><NavIcon /></button>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default SalesRepDetails