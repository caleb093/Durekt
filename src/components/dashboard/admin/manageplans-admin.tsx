import OutlineIcon from "../../../../public/svgs/outline.svg"
import Button from "@/components/primary/Button"
import CheckIcon from "../../../../public/svgs/check-icon.svg"
import InfoIcon from "../../../../public/svgs/outline.svg"
import { useCallback, useState } from "react"
import Modal from "@/components/primary/Modal"
import Input from "@/components/primary/input"

const PLAN = [
    {
        title: "personal",
        price: 19,
        description: "All the basic features to boost your freelance career",
        features: [
            "Full Access to landing portfolio",
            "half part of landing portfolio", 
            "Half Access to landing portfolio",
            "Mini Detials tp lorem ipsum",
            "Lorem ipsum dolor init maxi maini"
        ]
    },
    {
        title: "Enterprise",
        price: 25,
        description: "Get more things out of the box and more",
        features: [
            "Ipsum dolowr init maxi maisik",
            "Get full acces  to all details ", 
            "Half Access to landing portfolio",
            "Mini Detials tp lorem ipsum",
            "Lorem ipsum dolor init maxi maini"
        ]
    },
    {
        title: "professional",
        price: 45,
        description: "Get the best of this product with all fetures avaiable",
        features: [
            "Lorem ipsum dolor init maxi",
            "Mini Detials tp lorem ipsum",
            "half part of landing portfolio",
            "Lorem ipsum dolor init maxi maini",
            "Half Access to landing portfolio"
        ]
    }
]

const ManageplansComponent = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState({} as {title: string, price: number, description: string, features: string[]})
    const [modalSection, setModalSection] = useState(1)
    
    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name 
        const value = e.target.value

        setSelectedPlan(prev => ({...prev, [key]: value}))
    },[])

    const handleUpdateFeatures = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { value } = e.target;

        // Update the features array immutably
        const updatedFeatures = selectedPlan.features.map((feature, ind) =>
            ind === index ? value : feature
        );

        // Update the state with the new features array
        // @ts-ignore
        setSelectedPlan((prev) => ({
            ...prev,
            features: updatedFeatures,
        }));
    };

    const handleDeleteFeature = (index: number) => {
        setSelectedPlan(prev => ({...prev, features: prev.features.filter((item, ind) => ind !== index)}))
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
            >
                <div className="pt-10 pb-5 px-12 max-h-[70vh] overflow-auto">
                    <p className="text-center text-[22px] text-[#333333] font-[500] pb-10">Edit Subscription Plan?</p>
                    {modalSection === 1 ?
                        <>
                            <p className="text-[#333333] text-[15px] text-center">This plan will be altered if edited. Click continue to proceed.</p>

                            <div className="flex w-[250px] ml-auto gap-3 mt-14 mb-4 ">
                                <Button onClick={closeModal} className="bg-transparent "><p className="text-[#B3387F] font-[600]">Cancel</p></Button>
                                <Button onClick={() => setModalSection(2)}>Continue</Button>
                            </div>
                        </> :
                        <>
                            <Input 
                                className="mb-[8px]"
                                value={selectedPlan.title}
                                onChange={handleOnChange}
                                label={<label className="text-[#333333] font-medium text-[0.9em]">Plan Title</label>} 
                                placeholder="Personal"
                                type="text"
                                name="title"
                            />
                            <Input 
                                className="mb-[8px]"
                                value={selectedPlan.description}
                                onChange={handleOnChange}
                                label={<label className="text-[#333333] font-medium text-[0.9em]">Description</label>} 
                                placeholder="All the basic features to boost your freelance career"
                                type="text"
                                name="description"
                            />
                            <Input 
                                className="mb-[8px]"
                                // @ts-ignore
                                value={selectedPlan.price}
                                onChange={handleOnChange}
                                label={<label className="text-[#333333] font-medium text-[0.9em]">Price/month ($)</label>} 
                                placeholder="20"
                                type="text"
                                name="price"
                            />
                            <label className="text-[#333333] font-medium text-[0.9em]">Features</label>
                            {
                                selectedPlan.features.map((item, index) => (
                                    <div className="relative">
                                        <Input 
                                            className="mb-[5px]"
                                            value={item}
                                            onChange={(e) => handleUpdateFeatures(e, index)}
                                            label={<></>} 
                                            placeholder="Personal"
                                            type="text"
                                            name="title"
                                        />
                                        <p onClick={() => handleDeleteFeature(index)} className="cursor-pointer bg-white absolute z-[2] top-[16px] right-3 text-[12.5px] italic text-red-500">Delete</p>
                                    </div>
                                ))
                            }
                            <p onClick={() => setSelectedPlan(prev => ({...prev, features: [...prev.features, ""]}))} className="cursor-pointer text-white bg-[#B3387F] px-[6.5px] ml-auto mt-5 w-max rounded-full"><p className="scale-[1.4] ">+</p></p>

                            <Button className="mt-5">Update Subscription Plan</Button>
                        </> 
                    }
                </div>
            </Modal>
            <div className="flex items-center gap-1">
                <h1 className="text-[1.5em] font-[600] text-[#333333]">Manage Plans</h1>
                <OutlineIcon className=" scale-[0.85] translate-y-[1px]" />
            </div>

            <div className="text-white grid mdx3:grid-cols-2 mdx5:flex gap-[1em] sm:gap-[2%] mt-[2em]">
                {PLAN.map((item, index) => (
                <div
                    className="p-[1.5px] flex-1 rounded-md"
                    style={index + 1 == 2 ? {
                        background: 'linear-gradient(to right, #48D0FF, #C32782)',
                        transform: 'rotate(0deg)',
                        transition: 'all 0.5s ease-in-out',
                    } : {

                    }}
                >
                    <div className="bg-[#161529] flex flex-col h-full rounded-md text-left pt-8 pb-10 px-5">
                        <div className="w-[80%]">
                            <h2 className="text-[18px]">{item.title}</h2>
                            <h1><span className="text-[50px]">${item.price}</span><span className="text-[#71717A] pl-2">/month</span></h1>
                            <p className="text-[#A1A1AA] pt-2">{item.description}</p>
                        </div>
                        <div className="h-[1px] bg-[#27272A] my-7" />
                        <div className="flex flex-col gap-5 mb-4">
                            {item.features.map((item, index) => ( 
                                <div className="flex text-[13px] sm:text-[14px] items-center gap-2">
                                    <CheckIcon className="flex-shrink-0" />
                                    <p className="text-slate-300">{item}</p>
                                    <InfoIcon className="ml-auto" />
                                </div>
                            ))}
                        </div>
                        <Button onClick={() => (openModal(), setSelectedPlan(item) )} className={`${index + 1 == 2 ? "bg-[#B3387F]" : "bg-transparent border rounded-md border-gradient "} mt-auto py-3 rounded-sm`}>Edit</Button>
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default ManageplansComponent