import { FC, useState } from "react";
import Modal from "../primary/Modal"
import Input from "../primary/input"
import { Checkbox } from "@mui/material"
import Button from "../primary/Button";
import Xicon from "../../../public/svgs/x-icon.svg"
import { trainingModuleType, trainingTopicType } from "../../../api-feature/manager-owner/training/trainings-type";
import { usePostAssignTopicMutation } from "../../../api-feature/apiSlice";
import ActivityIndicator from "../secondary/ActivityIndicator";
import toast from "react-hot-toast";
import { useContext } from "react";
import { dataContext } from "../contexts/dataContext";

type modalType = "assign-topic" | "assign-training"

interface props {
    modalOpen: boolean;
    modalType: modalType;
    closeModal: () => void;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleRemoveTeamMember: (memberToRemove: number) => void;
    handleSelectTopic: (item: trainingTopicType, checked: boolean) => void;
    selectedTopic: {module: string; topic: string; id: number}[]
    assignTopicDetails: {
        module: string,
        topics: string,
        teamMembers: number[]
    }
    teamMembers: {name: string, value: number}[];
    selectedModule: trainingModuleType
}

const AssignTrainingModal:FC<props> = ({selectedModule, teamMembers, modalOpen, modalType, closeModal, handleSelectTopic, handleRemoveTeamMember, handleOnChange, selectedTopic, assignTopicDetails}) => {
    const {teamData} = useContext(dataContext)
    const [loading, setLoading] = useState(false)
    const [assignTopic] = usePostAssignTopicMutation()

    const handleAssignTopic = async () => {
        setLoading(true)

        const topicIds: number[] = []
        selectedTopic.map(item => topicIds.push(item?.id))

        try {
            await assignTopic({userIds: assignTopicDetails.teamMembers, trainingTopicIds: topicIds, trainingId: selectedModule.id}).unwrap()
                .then(fulfilled => {
                    toast.success("Topic Assigned")
                    closeModal()
                })
                .catch(rejected => {
                    toast.error("Error occured")
                    console.error(rejected)
                })
        } catch (error) {
            toast.error("Error occured")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (   
        <Modal
            isOpen={modalOpen}
            onClose={loading ? () => {} : closeModal}
        >
            {modalType === "assign-topic" ? 
                <div className="pt-7 pb-12 px-6 sm:px-14">
                    <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Assign Topic</p>
                    <Input 
                        disabled
                        className="mb-[8px]"
                        value={selectedTopic[0]?.module}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Module</label>} 
                        placeholder="Sample module Name"
                        type="text"
                        name="module"
                    />
                    <Input 
                        disabled
                        className="mb-[8px]"
                        value={selectedTopic[0]?.topic}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Topics</label>} 
                        placeholder="Sample Topics Name"
                        type="text"
                        name="topics"
                    />
                    <Input 
                        className="mb-[8px]"
                        value=""
                        onChange={handleOnChange}
                        select
                        options={teamMembers}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Team Members</label>} 
                        placeholder="Select Team members"
                        type="text"
                        name="teamMembers"
                    />
                    <div className="flex gap-2 flex-wrap"> 
                        {assignTopicDetails.teamMembers.map(item => (
                            <p className="bg-[#C3278126] flex items-center gap-3 py-1 px-3 rounded-3xl text-[14px] text-[#333333]"><span className=" -translate-y-[1px]">{teamData.find(teamItem => teamItem.userId === Number(item))?.firstName}</span> <Xicon onClick={() => handleRemoveTeamMember(item)} className="scale-[0.8]" /></p>
                        ))}
                    </div>
                    <Button onClick={handleAssignTopic} disabled={loading} className="mt-3 h-[2.68em] disabled:cursor-not-allowed disabled:bg-slate-600">
                        {loading ? <ActivityIndicator /> : "Save"}
                    </Button>
                </div>
                : 
                <div className="pt-7 pb-12 px-6 sm:px-14">
                    <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Assign Training</p>
                    <Input 
                        disabled
                        className="mb-[8px]"
                        value={selectedModule.title}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Modules</label>} 
                        placeholder="Sample Module Name"
                        type="text"
                        name="topics"
                    />
                    <div className="my-5">
                        <p className="text-[#333333] font-medium text-[0.9em]">Topics</p>
                        <div key={1} className="grid grid-cols-2 w-[20em] ">
                            {selectedModule?.TrainingTopic?.map(item => (
                                <div key={item.id} className="flex text-[14px] items-center gap-0 ">
                                    {/* @ts-ignore */}
                                    <Checkbox onClick={(e) => handleSelectTopic(item, e?.target?.checked)} className="h-6" />
                                    <p>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <Input 
                        className="mb-[8px]"
                        value=""
                        onChange={handleOnChange}
                        select
                        options={teamMembers}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Team Members</label>} 
                        placeholder="Select Team members"
                        type="text"
                        name="teamMembers"
                    />
                    <div className="flex gap-2 flex-wrap"> 
                        {assignTopicDetails.teamMembers.map(item => (
                            <p className="bg-[#C3278126] flex items-center gap-3 py-1 px-3 rounded-3xl text-[14px] text-[#333333]"><span className=" -translate-y-[1px]">{teamData.find(teamItem => teamItem.userId === Number(item))?.firstName}</span> <Xicon onClick={() => handleRemoveTeamMember(item)} className="scale-[0.8]" /></p>
                        ))}
                    </div>

                    <Button onClick={handleAssignTopic} disabled={loading || assignTopicDetails.teamMembers.length <= 0 || selectedTopic.length <= 0} className="mt-3 disabled:cursor-not-allowed disabled:bg-slate-600 h-[2.68em]">
                        {loading ? <ActivityIndicator /> : "Save"}
                    </Button>
                </div>
            }
        </Modal>
    )
}

export default AssignTrainingModal