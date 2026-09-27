import MessageModal from "@/components/modals/message-modal"
import Button from "@/components/primary/Button"
import { useRouter } from "next/router";
import { FC } from "react";
import AreaOfConcern from "./area-of-concern";
import SalesReportComponent from "./salesrep-report-component";
import ProgressCircle from "@/components/secondary/ProgressCircle";
import Callicon from "../../../../public/svgs/round-call.svg"
import GradientCircle from "@/components/secondary/GradientCircle";
import ArrorwIcon from "../../../../public/svgs/arrow2-icon.svg" 
import UploadIcon from "../../../../public/svgs/download2-icon.svg"
import Image from "next/image";
import Logo from "@/components/primary/Logo";
import { salesrepSectionTypes } from "@/components/dashboard/manager/salesrep-manager";

interface props {
    userId: number,
    meetingId?: number;
    modalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
    handleChangeSection: (section: salesrepSectionTypes) => void
}

const MeetingReports:FC<props> = ({userId, meetingId, handleChangeSection, modalOpen, openModal, closeModal}) => {
    const router = useRouter()
    return (
        <div className='py-5 flex flex-col gap-4'>
            <MessageModal 
                modalOpen={modalOpen}
                closeModal={closeModal}
                userId={userId}
            />
            <div className="flex items-center gap-0 text-[15px] -mt-10 ">
                <p className=" cursor-pointer underline text-[#5B5B5B]" onClick={() => router.back()}><span>Back</span></p>
                <ArrorwIcon className="scale-[0.8]" />
                <p className=" cursor-pointer underline text-[#5B5B5B]"><p >Meeting Report</p></p>
            </div>

            <div className="bg-white lg:h-[150px] rounded-2xl flex flex-col lg:flex-row gap-2 p-3">
                <div className='w-[130px] h-[120px] bg-slate-200 lg:h-full rounded-lg flex-shrink-0  relative overflow-hidden  '>
                    {/* {selectedSalesRep?.user?.url ? 
                        <Image src={selectedSalesRep?.user?.url ?? ""} className='h-full' alt='image'  height={2000} width={2000}  /> : */}
                        <Logo classname='w-full h-full px-2' /> 
                    {/* } */}
                </div>
                <div className='flex-1'>
                    <div className='flex justify-between'>
                        <div>
                            <p>firstName lastName</p>
                            <p className='text-[#828282] text-[14px]'>selectedSalesRep?.role</p>
                        </div>
                        <p className="inline-flex z-[2] relative gap-1 px-2 py-1 rounded-lg items-center border h-min"><UploadIcon /> <span className="text-[14px]">Export</span></p>
                    </div>
                    <div className='grid grid-cols-2 mt-4 lg:mt-3 lg:flex justify-between gap-10 lg:gap-4'>
                        <ProgressCircle type="progress" value={89} textClassname='text-[15px]' size={60} label={<span>Overall<br />Rating</span>} />
                        <div className='flex flex-col sm:flex-row items-center gap-2'>
                            <GradientCircle size={60}>
                                <Callicon />
                            </GradientCircle>
                            <div>
                                <p className='text-[#333333] font-[600]'>2 Hour</p>
                                <p>Meeting</p>
                            </div>
                        </div>
                        <ProgressCircle type="skill" value={"BV"} textClassname='text-[15px]' size={60} label={"Baev han"} />
                    </div>
                </div>
            </div>
            <div className='flex w-[20em] gap-4 ml-auto'>
                <Button onClick={openModal} className='text-[13px] py-1'>Message</Button>
                <Button onClick={() => router.push("/dashboard/trainings")} className='text-[13px] py-1 bg-transparent border border-[#A4A4A4]' ><p className='text-[#333333]'>Schedule Training</p></Button>
            </div>
            <div className='flex flex-col mdx5:flex-row gap-5'>
                <AreaOfConcern userId={userId} />
                <div className="flex-1 bg-white p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                        <h1 className='text-[#333333] text-[20px] font-[600] pb-2'>Meeting Transcipt</h1>
                        <p onClick={() => handleChangeSection("transcript")} className="text-[#C32782] text-[14px] cursor-pointer">view all</p>
                    </div>
                    <div>
                        <p className="font-[600] text-[#232326]">Elizabeth Parker:</p>
                        <p className="text-[#4A4A4A] " >
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta iusto, perspiciatis recusandae cum, voluptate, porro corrupti atque
                            suscipit labore itaque repudiandae praesentium aliquam voluptatum ad veritatis numquam ipsum. Voluptates, ad.
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <SalesReportComponent userId={userId} />
            </div>
        </div>
    )
}

export default MeetingReports