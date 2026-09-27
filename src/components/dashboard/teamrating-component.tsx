import { ChangeEvent, useRef, useState } from "react"
import { useGetTeamRatingQuery } from "../../../api-feature/apiSlice"
import { teamRatingType } from "../../../api-feature/manager-owner/team-rating/teamrating-type"
import { ApiType } from "../../../api-feature/types"
import Input from "../primary/input"
import Modal from "../primary/Modal"
import SkillsExcerpt from "../secondary/SkillsExcerpt"
import TeamDistribution from "../ui/dashboard/TeamDistribution"
import TopPerformance from "../ui/dashboard/TopPerformance"
import useModal from "../util/useModal"
import Button from "../primary/Button"
import { scrollToView } from "../util/helperFunctions"

interface teamratingApi extends ApiType {
    data: {data: teamRatingType[], success: boolean}
}

const TeamRatingComponent = () => {
    const [customDate, setCustomDate] = useState({
        startDate: "",
        endDate: ""
    })
    const [startDateSelected, setStartDateSelected] = useState(false)
    const {data, status, error, refetch} = useGetTeamRatingQuery<teamratingApi>({start: customDate.startDate, end: customDate.endDate})
    const {openModal, closeModal, modalOpen} = useModal()
    const startRef = useRef<HTMLInputElement | null>(null)
    const endRef = useRef<HTMLInputElement | null>(null)
    const skillsRef = useRef<HTMLDivElement>(null)

    const handleCloseModal = () => {
        setStartDateSelected(false)
        closeModal()
    }

    const handleFecthDate = () => {
        const startDate = startRef?.current?.value
        const endDate = endRef?.current?.value

        // @ts-ignore
        setCustomDate({ startDate: startDate, endDate: endDate})
        scrollToView(skillsRef)
        setStartDateSelected(false)
        closeModal()
    }

     const handleStartDateChange = () => {
        setStartDateSelected(true)
        const startDate = startRef?.current?.value;
        if (startDate && endRef.current) {
            endRef.current.min = startDate; // Set the min attribute for end date
        }
    }

    return (
        <div className="text-[#333333]">
            <Modal
                isOpen={modalOpen}
                onClose={handleCloseModal}
            >
                <div className="px-5 py-8 ">
                    <h1 className="font-[500] mb-3 text-center text-[24px]">Select Date Range</h1>
                    <div className="flex gap-4 mb-5">
                        <div className="flex w-full flex-col text-[#333333] gap-1 text-[14.5px]">
                            <label>From</label>
                            <input ref={startRef} type="date" className="border p-2 rounded-lg w-full" name="startDate" onChange={handleStartDateChange} />
                        </div>
                        <div className="flex flex-col w-full text-[#333333] gap-1 text-[14.5px]">
                            <label>To</label>
                            <input ref={endRef} disabled={!startDateSelected} type="date" className="border disabled:cursor-not-allowed p-2 rounded-lg w-full" name="endDate" />
                        </div>
                    </div>
                    <Button disabled={status === "pending"} className="disabled:bg-slate-600" onClick={handleFecthDate}>Submit</Button>
                </div>
            </Modal>
            <div className="flex justify-between">
                <p className="font-[600] text-[17px] ">Team Rating</p>
                {!customDate?.startDate ? 
                    <div onClick={openModal} className="text-[#5B5B5B] flex gap-3 hover:underline cursor-pointer">
                        <p className="font-[400] text-[16px]">Custom Date</p>
                    </div> 
                        : 
                    <div className="flex items-center text-[15px] gap-2 text-[#333333]">
                        <span>Period:</span>
                        <div onClick={openModal} className="border pl-2 pr-3 cursor-pointer py-1 rounded-lg text-[13.5px]">
                            <span>{customDate.startDate} - {customDate.endDate}</span>
                        </div>
                        <p onClick={() => setCustomDate({startDate: "", endDate: ""})} className=" underline font-[400] cursor-pointer active:scale-[0.95] transition-all">Reset</p>
                    </div>
                }
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-6">
                <div className="flex-[0.65] flex flex-col gap-4">
                    <TeamDistribution hideLabel />
                    <div>
                        <h1 className="text-[16px] text-[#333333] font-[500] mb-2">Top 3 Sales Rep Rating</h1>
                        <TopPerformance hideLabel />
                    </div>
                </div>
                <div ref={skillsRef} className=" flex flex-col flex-[1]">
                    <SkillsExcerpt teamRating data={data?.data} status={status} />
                </div>
            </div>
        </div>
    )
} 

export default TeamRatingComponent