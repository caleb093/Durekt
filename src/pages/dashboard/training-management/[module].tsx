import DashboardLayout from "@/components/layouts/DashboardLayout"
import ArrorwIcon from "../../../../public/svgs/arrow2-icon.svg"
import Link from "next/link"
import { useEffect, useState } from "react"
import gsap from "gsap"
import Button from "@/components/primary/Button"
import Modal from "@/components/primary/Modal"
import Input from "@/components/primary/input"
import ImageUpload from "@/components/secondary/imageUpload"
import useImageUpload from "@/components/util/useImageUpload"

const ViewTraining = () => {
    const {selectedImage, handleSelectImage, fileIsTooLarge, imageFile} = useImageUpload()
    const [modalOpen, setModalOpen] = useState(false)
    const [modalSection, setModalSection] = useState(1)
    const [showConfrimation, setShowConfirmation] = useState(true)
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

    useEffect(() => {
        gsap.timeline()
            .to(".trainings-txt", {color: "#5B5B5B", fontSize: "14px", fontWeight: "400", textDecoration: "underline"})
            .to(".topic-txt", {x: 0, opacity: 1})
    },[])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name
        const value = e.target.value

        setModuleDetails(prev => ({...prev, [key]: value}))
    }

    return (
        <DashboardLayout>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                containerClassname="bg-white rounded-lg shadow-lg w-[90%] md:w-[45em]"
            >
                <div className="max-h-[70vh] overflow-auto">
                    {showConfrimation ?
                        <div className="pt-16 pb-5 px-12">
                            <p className="text-[#333333] text-[15px] text-center">Would you like to Add a Topic to this Module?</p>

                            <div className="flex w-[250px] mx-auto gap-3 mt-8 mb-4 ">
                                <Button onClick={closeModal} className="bg-transparent "><p className="text-[#B3387F] font-[600]">No, Cancel</p></Button>
                                <Button onClick={() => setShowConfirmation(false)}>Continue</Button>
                            </div>
                        </div> :
                        <>
                            {modalSection === 1 ? 
                                <div className="">
                                    <div className="px-4 border-b w-full flex items-center py-3 gap-4">
                                        <p className="text-center text-[18px] text-[#2B3674] font-[600]">Topic Details</p>
                                        <p className="text-[#333333]">(Step 1 of 2)</p>
                                    </div>

                                    <div className="px-4 pt-4 pb-5 flex flex-col">
                                        <Input
                                            className="mb-[20px]"
                                            value={moduleDetails.name}
                                            onChange={handleOnChange}
                                            label={<label className="text-[#333333] font-medium text-[0.9em]">Topic Name</label>} 
                                            placeholder="Write here..."
                                            type="text"
                                            name="name"
                                        />
                                        <Input
                                            className="mb-[20px]"
                                            value={moduleDetails.name}
                                            onChange={handleOnChange}
                                            label={<label className="text-[#333333] font-medium text-[0.9em]">Description (optional)</label>} 
                                            placeholder="Write here..."
                                            type="text"
                                            name="name"
                                        />
                                        <div className="w-[140px] ml-auto mt-6">
                                            <Button onClick={() => setModalSection(2)}>Continue</Button>
                                        </div>
                                    </div>
                                </div> 
                                    : modalSection === 2 ?                            
                                <div>
                                    <div className="px-4 w-full flex items-center py-3 gap-4">
                                        <p className="text-center text-[18px] text-[#2B3674] font-[600]">Upload File</p>
                                        <p className="text-[#333333]">(Step 2 of 2)</p>
                                    </div>

                                    <ImageUpload selectedImage={selectedImage} handleSelectImage={handleSelectImage} fileIsTooLarge={fileIsTooLarge} className="w-[90%] h-[15em] mt-12 mb-24 mx-auto border border-black border-dashed">
                                        <div className="py-10 text-center">
                                            <p className="text-[20px] font-[700] text-[#B3387F]">Drag and drop or click to upload</p>
                                            <p className="text-[12px] font-[500] text-[#6B6B6B]">MP4, PDF and DOC files are allowed (20mb max)</p>
                                        </div> 
                                    </ImageUpload>
                                </div> : 
                                <div>
                                    <p>Successful</p>
                                </div>
                            }
                        </>
                    }
                </div>
            </Modal>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-0 text-[15px]">
                    <Link className="trainings-txt text-[20px] font-[600] text-[#333333] " href={"/dashboard/training-management"}><p>Training Management</p></Link>
                    <div className="topic-txt flex items-center -translate-x-16 opacity-0">
                        <ArrorwIcon className="scale-[0.8]" />
                        <p className=" text-[#333333] font-[500] text-[16px] ">Module name</p>
                    </div>
                </div>

                <div className="flex gap-3 w-[350px]">
                    <Button onClick={openModal} className=" bg-transparent border border-[#B3387F]"><p className="text-[#B3387F] flex items-center justify-center gap-3"><p className="font-[500] scale-[1.5]">+</p> Add New Topic</p></Button>
                    <Button>Publish</Button>
                </div>
            </div>

            <div className="bg-white w-[30em] rounded-2xl p-2 mt-5 flex gap-4">
                <div className="flex-[0.5] bg-slate-400 rounded-xl"></div>
                <div className="flex-1">
                    <p className="text-[#4318FF] bg-[#4318FF1A] w-[60%] text-[12px] pl-2 py-1 rounded-xl font-[600]">Module Name</p>
                    <p className="font-[500] text-[#333333] text-[12px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quo maxime, soluta aliquid repellat iure quidem tempore</p>
                    <div className="flex relative justify-between items-center mt-2">
                        <div className="flex items-center gap-2 text-[11px]">
                            <p className="text-[#4318FF] font-[600]">50 Enrolled</p>
                            <p className="text-[#4318FF80]">2 weeks ago</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-[12px] text-[#404040] w-[80%] font-[600] mt-2">
                        <p>Edit Moudle</p>
                        <p>Delete Module</p>
                    </div>
                </div>
            </div>
            
        </DashboardLayout>
    )
}

export default ViewTraining