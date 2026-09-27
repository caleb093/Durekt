import Button from "@/components/primary/Button"
import { useRouter } from "next/router"
import AnalyticsIcon from "../../../../public/svgs/analytics-icon.svg"
import MoreIcon from "../../../../public/svgs/more-icon.svg"
import { SetStateAction, useRef, useState } from "react"
import Dropdown from "@/components/secondary/Dropdown"
import DropdownItem from "@/components/secondary/DropdownItem"
import Modal from "@/components/primary/Modal"
import Input from "@/components/primary/input"
import Image from "next/image"
import ImageUpload from "@/components/secondary/imageUpload"
import useImageUpload from "@/components/util/useImageUpload"

const AdminTraining = () => {
    const router = useRouter()
    const {selectedImage, handleSelectImage, fileIsTooLarge, imageFile} = useImageUpload()
    const [openDropdown, setOpenDropdown] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [moduleDetails, setModuleDetails] = useState({
        name: "",
        description: "",
        thumbnail: ""
    })

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const handleModulesDropDown = (id: number) => {
        // @ts-ignore
        setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown for clicked item
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name
        const value = e.target.value

        setModuleDetails(prev => ({...prev, [key]: value}))
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                containerClassname="bg-white rounded-lg shadow-lg w-[90%] md:w-[45em]"
            >
                <div className="">
                    <div className="px-4 border-b w-full flex justify-between items-center py-3">
                        <p className="text-center text-[18px] text-[#2B3674] font-[600]">Module Details</p>
                        {/* <p>x</p> */}
                    </div>

                    <div className="px-4 py-4 flex flex-col">
                        <Input 
                            className="mb-[20px]"
                            value={moduleDetails.name}
                            onChange={handleOnChange}
                            label={<label className="text-[#333333] font-medium text-[0.9em]">Module Name</label>} 
                            placeholder="Write here..."
                            type="text"
                            name="name"
                        />
                        <Input 
                            className="mb-[20px]"
                            value={moduleDetails.description}
                            onChange={handleOnChange}
                            label={<label className="text-[#333333] font-medium text-[0.9em]">Description</label>} 
                            placeholder="Write here..."
                            type="textarea"
                            name="description"
                        />
                        <div>
                            <h1 className="text-[14px] font-[600]">Thumbnail</h1>
                            <p className="text-[11px] text-[#333333]">Set a thumbnail by uploading a photo</p>

                            <ImageUpload selectedImage={selectedImage} handleSelectImage={handleSelectImage} fileIsTooLarge={fileIsTooLarge}>
                                <div className="py-10">
                                    <p className="text-[14px] font-[500]">Click to upload</p>
                                    <p className="text-[12px] font-[500]">(PNG, JPEG, JPG)</p>
                                </div> 
                            </ImageUpload>
                        </div>
                        
                        <div className="w-[100px] ml-auto">
                            <Button disabled={!(moduleDetails.name && moduleDetails.description)} className="disabled:cursor-not-allowed disabled:opacity-[0.5] bg-white border border-[#B3387F]"><p className="text-[#B3387F]">Save</p></Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h1 className="text-[20px] font-[600] text-[#333333]">Training Management</h1>
                <div className="w-[200px] ml-auto">
                    <Button onClick={openModal} className="py-[6px] text-[13px]">Create New Module</Button>
                </div>
            </div>

            <div className="mt-5 grid mdx4:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-white p-4 rounded-2xl flex gap-5 flex-1">
                    <AnalyticsIcon className="flex-shrink-0 scale-[0.9]" />
                    <div>
                        <p className="text-[#A3AED0] text-[14px]">Total Training</p>
                        <p className="text-[#2B3674] text-[20px] font-[700]">20</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl flex gap-5 flex-1">
                    <AnalyticsIcon className="flex-shrink-0 scale-[0.9]" />
                    <div>
                        <p className="text-[#A3AED0] text-[14px]">Top Ranking</p>
                        <p className="text-[#2B3674] text-[20px] font-[700]">Module Name</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl flex gap-5 flex-1">
                    <AnalyticsIcon className="flex-shrink-0 scale-[0.9]" />
                    <div>
                        <p className="text-[#A3AED0] text-[14px]">No. Enrolled</p>
                        <p className="text-[#2B3674] text-[20px] font-[700]">250</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h1 className="text-[18px] font-[600] text-[#333333]">Modules</h1>

                <div style={{boxShadow: "0px 0px 8px 1px rgba(187, 185, 185, 0.25)"}} className="bg-white grid sm:grid-cols-2 mdx2:grid-cols-3 gap-10 px-5 py-8 rounded-lg mt-6">
                    {[0,2,2,1,4,5,6,2].map((item, index) => (
                        <div className="">
                            <div className="bg-slate-400 w-full h-[135px] rounded-xl" />
                            <p className="text-[#4318FF] bg-[#4318FF1A] w-[60%] text-[12px] my-3 pl-2 py-1 rounded-xl font-[600]">Module Name</p>
                            <p className="font-[600]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quo maxime, soluta aliquid repellat iure quidem tempore</p>
                            <div className="flex relative justify-between items-center mt-2">
                                <div className="flex items-center gap-2 text-[11px]">
                                    <p className="text-[#4318FF] font-[600]">50 Enrolled</p>
                                    <p className="text-[#4318FF80]">2 weeks ago</p>
                                </div>
                                <div onClick={() => handleModulesDropDown(index)} className="bg-[#F5F6FA] cursor-pointer active:scale-[0.85] rotate-[90deg] py-2 rounded-full">
                                    <MoreIcon className="scale-[0.7]" />
                                </div>
                                <Dropdown className="z-[3] top-[-80px] ml-auto right-0 rounded-xl overflow-hidden" isOpen={openDropdown === index}>
                                    <DropdownItem onClick={() => {router.push("/dashboard/training-management/34djdj")}} className="text-[12px] border-b px-2 py-2 font-[500]" text="View Training" />
                                    <DropdownItem onClick={() => {}} className="text-[12px] px-2 py-2 font-[500]" text="Delete Training" />
                                </Dropdown>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminTraining