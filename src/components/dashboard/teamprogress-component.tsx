import DashboardLayout from "@/components/layouts/DashboardLayout"
import Link from "next/link"
import Button from "@/components/primary/Button"
import ArrorwIcon from "../../../public/svgs/arrow2-icon.svg"
import FilterIcon from "../../../public/svgs/filter-icon.svg"
import Search from "@/components/secondary/Search"
import MoreIcon from "../../../public/svgs/more-icon.svg"
import { useContext, useEffect, useState } from "react"
import gsap from "gsap"
import { TeamProgresData } from "@/testData"
import { dataContext } from "@/components/contexts/dataContext"
import Loading from "../secondary/LoadingSpinner"
import { useGetUserTopicProgressQuery } from "../../../api-feature/apiSlice"
import { teamType } from "../../../api-feature/manager-owner/team/team-type"
import { ApiType } from "../../../api-feature/types"
import { userTopicProgress } from "../../../api-feature/manager-owner/training/trainings-type"

interface userTopicApi extends ApiType {
    data: {success: boolean, data: userTopicProgress[]}
    // data: {data: userTopicProgress[], page: number, totalPage: number, totalUser: number, success: boolean}
}

const TrainingTeamProgress = () => {
    const {teamData, teamDataStatus, trainingModuleData, trainingModuleStatus} = useContext(dataContext)
    const [currentModule, setCurrentModule] = useState(trainingModuleData?.length > 0 ? trainingModuleData[0] : null)
    const [selectedMember, setSelectedMember] = useState({} as teamType)
    const skip = !(selectedMember.email && currentModule?.id)
    // @ts-ignore
    const {data: userTopics, status: userTopicStatus, error, refetch} = useGetUserTopicProgressQuery<userTopicApi>({trainingId: currentModule?.id, userId: selectedMember?.userId}, {skip: skip})
    const [openDropDown, setOpenDropDown] = useState(false)

    useEffect(() => {
        if (trainingModuleData?.length > 0) {
            setCurrentModule(trainingModuleData[0]);
        }
    }, [trainingModuleData]);

    useEffect(() => {
        gsap.timeline()
            .to(".trainings-txt", {color: "#5B5B5B", fontSize: "14px", fontWeight: "400", textDecoration: "underline"})
            .to(".topic-txt", {x: 0, opacity: 1})
    },[])

    const handleDropDown = () => {
        setOpenDropDown(prev => !prev)
    }
    
    const getUserProgress = (item: teamType) => {
        setSelectedMember(item)
        // setTimeout(() => {
        //     console.log("RAN")
        //     !skip && refetch()
        // },4000) 
    }

    return (
        <>
            <div className="flex text-[#333333] flex-col">
                <div className="flex flex-col mdx4:flex-row justify-between mdx4:items-center gap-3">
                    <div className="flex items-center gap-0 text-[15px]">
                        <Link className="trainings-txt text-[20px] font-[600] text-[#333333] " href={"/dashboard/trainings"}><p >Training</p></Link>
                        {/* <Link className=" cursor-pointer underline text-[#5B5B5B]" href={"/dashboard/trainings"}><p >Trainings</p></Link> */}
                        <div className="topic-txt flex items-center -translate-x-16 opacity-0">
                            <ArrorwIcon className="scale-[0.8]" />
                            <p className=" text-[#333333] font-[500] ">Team Progress</p>
                        </div>
                    </div>
                    <div className="relative flex items-center gap-2 ml-auto">
                        <p className="font-[500] ">Module:</p>
                        <div onClick={handleDropDown} className="border border-[#A4A4A4] cursor-pointer font-[500] text-[14px] rounded-lg flex justify-between items-center gap-10 pl-2">
                            <p>{trainingModuleStatus === "pending" ? "loading" : trainingModuleStatus === "rejected" ? <span className="text-red-500 italic">"Error occured"</span> : trainingModuleStatus === "fulfilled" && <span>{currentModule?.title}</span>}</p>
                            <ArrorwIcon className="scale-[0.9]" />
                        </div>

                        <div className={`${openDropDown ? "h-auto max-h-[50vh] opacity-1" : "h-0 max-h-0 opacity-[0.4]"} bg-white text-[14px] transition-all text-[#333333] font-[500] absolute w-full overflow-auto top-0 mt-9`}>
                            {(trainingModuleStatus === "fulfilled" && trainingModuleData?.length > 0) && trainingModuleData?.map(item => (
                                <p onClick={() => {handleDropDown()}} className="py-2 border-b pl-2 hover:bg-slate-100 cursor-pointer">{item?.title}</p>
                            ))}
                            {trainingModuleStatus === "fulfilled" && trainingModuleData?.length <= 0 && <p onClick={() => {handleDropDown()}} className="py-2 border-b pl-2 hover:bg-slate-100 cursor-pointer italic">No Sales rep</p>}
                            {trainingModuleStatus === "pending" && <p onClick={() => {handleDropDown()}} className="py-2 border-b pl-2 hover:bg-slate-100 cursor-pointer">loading...</p>}
                        </div>  
                    </div>
                </div>
            </div>

            <div className="flex flex-col mdx2:flex-row mt-7 gap-4">
                <div className="bg-white flex-[0.5] mdx2:h-[75vh] overflow-auto px-3 py-3 border">
                    <div className="flex justify-between mb-4 items-center">
                        <p className="text-[18px]">Modules</p>
                        <div className="flex items-center gap-2">
                            <FilterIcon className="h-4 w-4 text-[#C32782]" />
                            <p className="text-[#5B5B5B] text-[14px]">filter by</p>
                        </div>
                    </div>
                    <Search className="w-[100%]" value="" onChange={() => {}} />
                    <div className="flex flex-col mt-2 ">
                        {teamDataStatus === "pending" && <Loading />}
                        {teamDataStatus === "fulfilled" && teamData?.map((item, i) => (
                            <div key={i} onClick={() => getUserProgress(item)} className={`${selectedMember?.userId === item?.userId && "bg-[#CBF3FF66]"} flex text-[15px] text-[#333333] font-[500] justify-between items-center cursor-pointer hover:bg-[#CBF3FF66] hover:scale-[1.03] duration-[0.09s] py-3 px-2`}>
                                <p>{item?.firstName} {item?.lastName}</p>
                                <div className=" flex items-center">
                                   <p>0/10</p>
                                </div>
                            </div>
                        ))}
                        {teamDataStatus === "rejected" && <p className="text-red-600 italic text-center">Error occured</p>}
                    </div>
                </div>
                <div className="bg-white px-3 min-h-[20em] flex flex-col py-1 flex-[1] overflow-auto">
                    <div className="bg-white border-b py-4 font-[700] text-[16px] flex justify-between px-0">
                        <p className="flex-[0.5] mdx2:flex-1">Topics</p>
                        <div className="flex justify-between flex-1 gap-3">
                            <p>Progress</p>
                            <p className="mr-4">Assigned Date</p>
                        </div>

                    </div>
                    {!selectedMember?.userId && 
                        <div className=" flex-1 flex items-center justify-center">
                            <p className="font-[500]">Select A Team Member</p>
                        </div>
                    }
                    {userTopicStatus === "pending" && 
                        <div className="flex-1 flex items-center justify-center">
                            <Loading  />
                        </div>
                    }
                    {userTopicStatus === "rejected" && 
                        <div className="flex-1 flex items-center justify-center text-red-600 italic">
                            <p>Error getting progress</p>
                        </div>
                    }
                    {userTopicStatus === "fulfilled" && userTopics?.data?.length <= 0 && <p className="text-center h-full flex items-center justify-center text-[14px] text-[#333333]" >No Trainings Available</p>}
                    {userTopicStatus === "fulfilled" && userTopics?.data.map(item => (
                        <div className="flex py-4 text-[15px] font-[500] justify-between border-b">
                            <div className="flex pl-3 flex-[0.5] mdx2:flex-1">
                                <p>{item.topicTitle}</p>
                            </div>
                            <div className="flex items-center justify-between flex-1 gap-1">
                                <p className="bg-[#D9D9D94D] pl-2 pr-5 py-[3px] rounded-xl">{item.progress}</p>
                                <p className="mr-8">11/05/2024</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default TrainingTeamProgress