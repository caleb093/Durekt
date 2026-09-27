import Link from "next/link"
import ArrorwIcon from "../../../../public/svgs/arrow2-icon.svg"
import { salesrepSectionTypes } from "@/components/dashboard/manager/salesrep-manager"
import { FC } from "react"
import { useRouter } from "next/router"

interface props {
    handleChangeSection: (section: salesrepSectionTypes) => void
}

const MeetingTranscript:FC<props> = ({handleChangeSection}) => {
    const router = useRouter()

    return (
        <div>
            <div className="flex items-center gap-0 text-[15px]">
                <p className=" cursor-pointer underline text-[#5B5B5B]" onClick={() => router.back()}><span>Back</span></p>
                <ArrorwIcon className="scale-[0.8]" />
                <p className=" cursor-pointer underline text-[#5B5B5B]"><p >Meeting Report</p></p>
                <ArrorwIcon className="scale-[0.8]" />
                <p className=" text-[#333333] font-[500] ">Transcript</p>
            </div>
            
            <div className="flex items-center justify-between mt-5">
                <p className="text-[#333333] font-[600] text-[16px]">Sales Call with ABC Corp</p>
                <p className="flex items-center gap-2"><span className="text-[#8E8B8B] text-[14px] font-[500]" >January 15, 2024</span> <span className="text-[#333333] font-[600] text-[16px]">John Smith, Head of Procurement, ABC Corp</span></p>
            </div>

            <div className="bg-white mt-6 h-[70vh] overflow-auto px-6 py-4">
                {[0,3,3,3,3,3].map(item => (
                    <div className="text-left mb-2">
                        <p className="text-[#010102] font-[500]">Elizabeth Parker:</p>
                        <p className="text-[#585858] font-[300] text-[14.2px]">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, nisi. Eum, quaerat vero magni dignissimos libero harum
                            mollitia minus impedit reprehenderit vitae laborum asperiores nobis similique est omnis ratione ducimus.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MeetingTranscript