import Modal from "@/components/primary/Modal"
import { FC, useEffect, useState } from "react";
import Errorsvg from "../../../../public/svgs/Error.svg"
import Syncsvg from "../../../../public/svgs/sync-file.svg"
import Button from "@/components/primary/Button";
import { useRouter } from "next/router";
import gsap from "gsap";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
    // handleChangeSection: (item: "connect" | "sync") => void
    calendly?: boolean
    status?: "loading" | "successful"
}

const SyncDataModal:FC<props> = ({modalOpen, closeModal, calendly, status}) => {
    // const [goToSync, setGoToSync] = useState(false)
    const router = useRouter()

    useEffect(() => {
        gsap.fromTo(".sync-file", {rotate: 0}, {rotate: 360, repeat: -1, ease: "linear", duration: 1.2})
    },[])

    return (
        <Modal isOpen={modalOpen} onClose={closeModal} hideCloseIcon containerClassname="w-[30em] bg-white rounded-lg">
            <div className="flex flex-col text-center items-center px-10 py-8">
                {status === "loading" &&
                    <>
                        <Syncsvg className="sync-file" />
                        {/* <div className="w-[8em] h-[8em] bg-white border border-[#32CD32] rounded-full"></div> */}
                        <p className="mt-4 mb-1 text-[1.15em] w-[80%] text-[#2B3674] font-[700]">Syncing your deals</p>
                        <p className="text-[#82858D] text-[0.85em]">importing deals from CRM...</p>
                        {/* <Button onClick={() => calendly ? router.back() : setGoToSync(true)} className="mt-4">{calendly ? "Continue" : "Continue Sync"}</Button> */}
                    </>
                }
                {status === "successful" && 
                    <>
                        <div className="w-[8em] h-[8em] bg-white border border-[#32CD32] rounded-full"></div>
                        <p className="mt-4 mb-1 text-[1.15em] w-[80%] text-[#2B3674] font-[700]">Syncing Complete!</p>
                        <p className="text-[#82858D] font-[600] text-[0.85em]">Your deals have been succesfully imported into Durekt!</p>
                    </>
                }
            </div>
        </Modal>
    )
}

export default SyncDataModal