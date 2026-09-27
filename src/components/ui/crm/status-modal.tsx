import Modal from "@/components/primary/Modal"
import { FC, useState } from "react";
import Errorsvg from "../../../../public/svgs/Error.svg"
import Button from "@/components/primary/Button";
import { useRouter } from "next/router";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
    success?: boolean;
    handleChangeSection: (item: "connect" | "sync") => void
    platform?: "Calendly" | "Hubspot" | "Salesforce"
}

const StatusModal:FC<props> = ({modalOpen, closeModal, platform, success, handleChangeSection}) => {
    const [goToSync, setGoToSync] = useState(false)
    const router = useRouter()

    if (success === undefined) {
        return (
            <Modal isOpen={modalOpen} onClose={closeModal} hideCloseIcon containerClassname="w-[30em] bg-white rounded-lg">
                <div className="flex flex-col text-center items-center px-10 py-8"></div>         
            </Modal> 
        )
    }
    
    return (
        <Modal closeOnClickOutside={false} isOpen={modalOpen} onClose={closeModal} hideCloseIcon containerClassname="w-[30em] bg-white rounded-lg">
            <div className="flex flex-col text-center items-center px-10 py-8">
                {!goToSync && success && 
                    <>
                        <div className="w-[8em] h-[8em] bg-white border border-[#32CD32] rounded-full"></div>
                        <p className="mt-6 w-[80%]">Your Durekt account is now connected to {platform}</p>
                        <Button onClick={() => setGoToSync(true)} className="mt-4">Continue Sync</Button>
                        {/* <Button onClick={() => platform ? router.back() : setGoToSync(true)} className="mt-4">{platform ? "Continue" : "Continue Sync"}</Button> */}
                    </>
                }
                {!goToSync && !success && 
                    <>
                        <Errorsvg />
                        <p className="mt-0 w-[80%] text-[#BE0101]">The connection to {platform} failed!</p>
                        <p className="text-[#82858D] ">Please try again or contact support.</p>
                        <div className="flex w-full mt-5 gap-5">
                            <Button>Retry authentication</Button>
                            <Button className="border border-[#B3387F]" color="#ffffff"><span className="text-[#B3387F]">Skip for now</span></Button>
                        </div>
                    </>
                }
                {goToSync && 
                    <>
                        <p className="text-[#82858D] ">Sync your CRM data into Durekt</p>
                        <div className="flex w-full mt-5 gap-5">
                            <Button onClick={() => handleChangeSection("sync")}>Start Sync</Button>
                            <Button className="border border-[#B3387F]" color="#ffffff"><span className="text-[#B3387F]">Skip for now</span></Button>
                        </div>
                    </>
                }
            </div>
        </Modal>
    )
}

export default StatusModal