import Button from "@/components/primary/Button";
import Modal from "@/components/primary/Modal"
import { Checkbox } from "@mui/material";
import { FC, useRef } from "react";
import CalenderIcon from "../../../../public/svgs/calendar-icon.svg"
import ArrowIcon from "../../../../public/svgs/arrow2-icon.svg"


interface props {
    modalOpen: boolean;
    closeModal: () => void;
    // success?: boolean;
    // handleChangeSection: (item: "connect" | "sync") => void
}

const SelectDataModal:FC<props> = ({modalOpen, closeModal}) => {
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    const handleLabelClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker(); // Open the date picker
        }
    };

    return (
        <Modal isOpen={modalOpen} onClose={closeModal} hideCloseIcon containerClassname="w-[30em] bg-white max-h-[90vh] overflow-auto">
            <div className="bg-[#F6F8FA] py-2"><p>Select Data to Sync</p></div>
            <div className="px-5 pt-4 pb-2 text-[14px]">
                <div className="flex gap-1 items-center">
                    <Checkbox />
                    <p>All Deals</p>
                </div>
                <div className="border rounded-xl overflow-hidden mb-3">
                    <div className="bg-[#F6F8FA] py-1 px-3 text-left">
                        <p>Sales Pipeline</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Lead Deneraton</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Negotiation</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Qualified Leads</p>
                    </div>
                </div>

                <div className="border rounded-xl overflow-hidden mb-3">
                    <div className="bg-[#F6F8FA] py-1 px-3 text-left">
                        <p>Marketing Pipeline</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Nutured Leads</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Marketing Qualified Leads(MQL)</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Sales Qualified Leads(SQL)</p>
                    </div>
                </div>

                <div className="border rounded-xl overflow-hidden mb-3">
                    <div className="bg-[#F6F8FA] py-1 px-3 text-left">
                        <p>Customer Success Pipeline</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Onboarding</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Adoption</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Expansion Opportunities</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Checkbox />
                        <p>Renewal</p>
                    </div>
                </div>

                <div className="flex items-center justify-between relative pb-3">
                    <label onClick={handleLabelClick} className=" cursor-pointer" htmlFor="crm-date">Deals within a specific Date Range</label>
                    <CalenderIcon className=" w-6" />
                    <input ref={dateInputRef} className="hidden ml-[10px]" type="date" name="crm-date" id="crm-date" />
                </div>

                <div className="flex items-center justify-between pb-3">
                    <p>Deals Stages</p>
                    <ArrowIcon className="text-[#999999] " />
                </div>

                <div className="flex items-center justify-between pb-3">
                    <p>Deals Owners</p>
                    <ArrowIcon className="text-[#999999] " />
                </div>
            </div>

            <hr />
            
            <div className="flex gap-10 px-4 py-3">
                <div className="w-[8em]">
                    <Button className="flex-1">Cancel</Button>
                </div>
                <div className="w-[15em] flex ml-auto">
                    <Button className="flex-[1.5]">Apply Filter</Button>
                    <Button className="bg-transparent flex-1"><span className="text-[#B3387F]">Clear</span></Button>
                </div>
            </div>

        </Modal>
    )
}

export default SelectDataModal