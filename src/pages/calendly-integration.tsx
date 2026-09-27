import Button from "@/components/primary/Button"
import StatusModal from "@/components/ui/crm/status-modal"
import useModal from "@/components/util/useModal"
import CalendlyIcon from "../../public/svgs/calendly_icon.svg"

const CalendlyIntegation = () => {
    const {modalOpen, closeModal, openModal} = useModal()

    return (
        <main className="bg-[#F8F8FA] min-h-screen sm:h-screen pt-[5em]">
            {/* <StatusModal calendly modalOpen={modalOpen} closeModal={closeModal} success handleChangeSection={() => {}} /> */}
            <div className="text-center flex flex-col items-center w-[93%] sm:w-[75%] m-auto ">
                <h1 className="text-[1.5em] sm:text-[30px] font-[500] mt-3 text-center">Connect Calendly</h1>
                <p className="text-[#333333]">Choose your preferred CRM platform to integrate with Durekt for seamless data management.</p>

                <div className="flex gap-12 mt-20 w-[27em]">
                    <div className="bg-white border py-10 px-5 flex flex-col flex-1 gap-5 items-center rounded-2xl shadow-lg">
                        <div className="py-8">
                            <CalendlyIcon />
                        </div>
                        <p>Integrate with Calendly with Durekt to schedule your meetings</p>
                        <Button onClick={openModal}>Continue to Calendly</Button>
                    </div>
                    {/* <div className="bg-white py-10 px-5 flex flex-col flex-1 gap-5 items-center rounded-2xl shadow-lg">
                        <Hubspot />
                        <p>Sync your Hubspot with Durekt to auto-populate your deals</p>
                        <Button onClick={openModal}>Continue to HubSpot</Button>
                    </div> */}
                </div>
                
            </div>
        </main>
    )
}

export default CalendlyIntegation