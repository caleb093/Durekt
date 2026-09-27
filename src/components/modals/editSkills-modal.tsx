import Modal from "../primary/Modal"
import Button from "../primary/Button"
import { Checkbox } from "@mui/material";
import { SkillsType, topSkillType } from "../../../api-feature/types";
import { FC, SetStateAction, useState } from "react";
import ActivityIndicator from "../secondary/ActivityIndicator";
import toast from "react-hot-toast";
import { usePostMarkAsFavouriteMutation } from "../../../api-feature/apiSlice";
import useLoading from "../util/useLoading";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
    availableSkills: topSkillType[]
    topSkills: {skillId: number}[]
    setTopSkills: React.Dispatch<SetStateAction<{skillId: number;}[]>>
}

const EditSkillsModal:FC<props> = ({modalOpen, closeModal, availableSkills, topSkills, setTopSkills}) => {
    const {loading, startLoading, stopLoading} = useLoading()
    const [markFavouriteSkills] = usePostMarkAsFavouriteMutation()

    const handleUpdateSkills = (skill: topSkillType) => {
        console.log(skill);
        // Check if the skill is already in the skills array
        const isSkillIncluded = topSkills.some(item => item.skillId === skill.skillId);

        if (!isSkillIncluded) {
            // If the skill is not included, add it
            // if (topSkills.length >= 5) {
            //     toast.error("can't select more than 5 skills")
            //     return
            // }

            setTopSkills(prev => ([
                ...prev, {skillId: skill.skillId}
            ]));

        } else {
            // If the skill is included, remove it
            setTopSkills(prev => ([
                ...prev.filter(item => item.skillId !== skill.skillId)
            ]));
        }
    }

    console.log(topSkills)

    const handleUpdate = async () => {
        const ids: number[] = []
        topSkills.map(item => ids.push(item.skillId))

        try {
            startLoading()
            await markFavouriteSkills({skillIds: ids, isFavourite: true}).unwrap()
                .then(fulfilled => {
                    toast.success("Updated")
                    closeModal()
                })
                .catch(rejected => {
                    console.error(rejected)
                    toast.error(rejected?.data?.error ?? "Error occured")
                })
        } catch(error) {
            console.error(error)
            toast.error("Error occured")
        } finally {
            stopLoading()
        }
    }

    return (
        <Modal 
            isOpen={modalOpen} 
            onClose={loading ? () => {} : closeModal} 
            containerClassname="w-[90%] md:w-[45em] h-[70vh] overflow-auto bg-white "
        >
            <div className="relative flex flex-col">
                <div className="bg-white border-b w-full h-12 sticky top-0 z-[2] flex justify-between items-center px-5">
                    <p className="text-[18px] text-[#333333] font-[600]">Select Favourite Skills</p>
                    <p onClick={closeModal} className="bg-slate-400 rounded-full px-[7px] text-slate-100 cursor-pointer"><p className="scale-[0.8]">x</p></p>
                </div>
                <div className="flex">
                    <div className="grid grid-cols-2 gap-x-4">
                        {availableSkills?.map((item, index) => (
                            <div key={index} onClick={() => handleUpdateSkills(item)} className=" cursor-pointer hover:bg-slate-100 flex items-center border-b py-3">
                                <Checkbox sx={{
                                    '&.Mui-checked': {
                                        color: "#B3387F"
                                    }
                                    }} 
                                    checked={topSkills.some(skill => skill.skillId === item.skillId)} onChange={() => console.log(item)} 
                                />
                                <p className="font-[500] pr-5">{item.symbol} = {item.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* <div>
                        {availableSkills.slice(13, 25).map(item => (
                            <div onClick={() => handleUpdateSkills(item)} className=" cursor-pointer hover:bg-slate-100 flex items-center border-b py-3">
                                <Checkbox sx={{
                                    '&.Mui-checked': {
                                        color: "#B3387F"
                                    }
                                    }} 
                                    checked={topSkills.some(skill => skill.skillId === item.skillId)} onChange={() => console.log(item)}
                                />
                                <p className="font-[500] pr-5">{item.symbol} = {item.name}</p>
                            </div>
                        ))}
                    </div> */}
                </div>
                    
                <div className="mx-8 mt-8 mb-4">
                    <Button disabled={loading} onClick={handleUpdate} className="h-[2.88em]">{loading ? <ActivityIndicator /> : "Update"}</Button>
                </div>
            </div>
        </Modal>

    )
}

export default EditSkillsModal