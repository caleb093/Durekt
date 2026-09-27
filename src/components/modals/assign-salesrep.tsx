import { FC } from "react";
import Modal from "../primary/Modal"
import Xicon from "../../../public/svgs/x-icon.svg"
import Input from "../primary/input";
import Button from "../primary/Button";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
}

const AssignSalesrepModal:FC<props> = ({modalOpen, closeModal}) => {
    const salesRep = [{name: "fri", value: 2}]
    return (
        <Modal isOpen={modalOpen} onClose={closeModal} hideCloseIcon>
            <div className="px-4 py-6">
                <h1 className="text-[1.25em] font-[500]">Sales Reps</h1>
                <div className="flex flex-col gap-4 w-full mt-5 mb-3">
                    {[0,2,2].map((item, i) => (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <p className="w-2">{i+1}</p>
                                <div className="w-12 h-12 bg-slate-600 rounded-lg" />
                                <div>
                                    <p>Elizabeth Parker</p>
                                    <p className="underline" >Elizabethparker@gmail.com</p>
                                </div>
                            </div>
                            <Xicon />
                        </div>
                    ))}
                </div>
                {/* <p>Add Sales Rep</p> */}
                <Input 
                    className="mb-[8px]"
                    value=""
                    onChange={() => {}}
                    select
                    options={salesRep}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Add sales rep</label>} 
                    placeholder="Select sales rep"
                    type="text"
                    name="saleReps"
                />
                <div className="flex gap-2 flex-wrap mb-5">
                    {[0,2].map(itemValue => {
                        return (<p className="bg-[#C3278126] flex items-center gap-3 py-1 px-3 rounded-3xl text-[14px] text-[#333333]"><span className=" -translate-y-[1px]">{salesRep.find(item => item.value === Number(itemValue))?.name}</span> <Xicon onClick={() => {}} className="scale-[0.8]" /></p>)
                    })}
                </div>
                <Button>Save</Button>
            </div>
        </Modal>
    )
}

export default AssignSalesrepModal