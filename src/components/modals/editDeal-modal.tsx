import { dealsDataType } from "@/testData";
import { FC, useCallback, useEffect, useState } from "react";
import Modal from "../primary/Modal";
import Input from "../primary/input";
import Button from "../primary/Button";
import ActivityIndicator from "../secondary/ActivityIndicator";
import toast from "react-hot-toast";
import { dealFormType } from "../dashboard/manager/deals-manager";
import Xicon from "../../../public/svgs/x-icon.svg"
import useLoading from "../util/useLoading";
import { usePostEditDealMutation } from "../../../api-feature/apiSlice";
import useSearch from "../util/useSearch";
import useSearchTeam from "../util/useSearchTeam";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
    dealOptions: {name: string, value: number}[];
    salesRep: {name: string, value: number}[]
    data: dealsDataType
}

const EditDealsModal:FC<props> = ({modalOpen, closeModal, salesRep, dealOptions, data}) => {
    const {searchTeamText, updateTeamText, filteredTeam, searching, clearSearch, loading: optionsLoading} = useSearchTeam()
    const filteredOptions = [] as {value: number | number, name: string}[]
    filteredTeam?.map(item => filteredOptions.push({value: item.userId, name: `${item.firstName} ${item.lastName}`}))

    // @ts-ignore
    const currentStage = dealOptions.find(item => item.name === data.stage?.name)
    const {searchInput, handleSearchChange} = useSearch()
    const [editDeal] = usePostEditDealMutation()
    const [edited, setEdited] = useState(false)
    const {startLoading, stopLoading, loading} = useLoading()
    const [dealDetails, setDealDetails] = useState<dealFormType>({
        name: "",
        client: "",
        stage: "",
        saleReps: []
    })
    
    useEffect(() => {
        // @ts-ignore
        const reformattedData = data?.salesReps?.map(item => item?.user?.id);

        setDealDetails({
            name: data.name || "",
            client: data.client || "",
            // @ts-ignore
            stage: currentStage?.value || "",  // Ensure stage is populated correctly
            saleReps: reformattedData || [],
        })

        // setEdited(false)
    },[data, dealOptions])

    const handleRemoveSalesRep = (salesRepToRemove: number) => {
        setDealDetails(prev => ({
            ...prev,
            saleReps: prev.saleReps.filter(member => member !== salesRepToRemove)
        }));
    }
    
    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name as keyof dealFormType
        const value = e.target.value
        !edited && setEdited(true)
        if (key === "saleReps") {
            console.log(e)
            console.log(key)
            console.log(value)
            setDealDetails((prev) => {
                // Check if the team member is already in the array
                if (!prev.saleReps.includes(Number(value))) {
                    return {
                        ...prev,
                        [key]: [...prev.saleReps, Number(value)], // Add team member if not present
                    };
                }

                // If the team member is already present, return the state as-is
                return prev;
            });
            return;
        }

        setDealDetails(prev => ({...prev, [key]: value}))
    }, [])

    const handleEditDeal = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startLoading()

        const stage = Number(dealDetails.stage)
        
        try {
            await editDeal({name: dealDetails.name, client: dealDetails.client, dealId: data.id, dealStageId: stage, salesReps: dealDetails.saleReps}).unwrap()
                .then(fulfilled => {
                    toast.success("Deal Updated")
                    closeModal()
                })
                .catch(rejected => {
                    toast.error(rejected?.data?.message ?? "Error occured")
                })
        } catch(error) {
            toast.error("Error occured")
        } finally {
            stopLoading()
        }
    }

    return (
         <Modal
            isOpen={modalOpen}
            onClose={loading ? () => {} : closeModal}
        >
            <form onSubmit={handleEditDeal} className="pt-7 pb-12 px-6 sm:px-14">
                <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Deal</p>
                <Input 
                    className="mb-[8px]"
                    value={dealDetails.name}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Name</label>} 
                    placeholder="Enter name"
                    type="text"
                    name="name"
                />
                <Input 
                    className="mb-[8px]"
                    value={dealDetails.client}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Client/Company</label>} 
                    placeholder="Enter company name"
                    type="text"
                    name="client"
                />
                <Input 
                    select
                    className="mb-[8px]"
                    value={dealDetails.stage}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    onChange={handleOnChange}
                    options={dealOptions}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Stage</label>} 
                    placeholder="Select Stage"
                    type="text"
                    name="stage"
                />
                <Input 
                    select
                    value=""
                    className="mb-[8px]"
                    searchInput={searchTeamText}
                    handleSearchChange={(e) => updateTeamText(e.target.value)}
                    optionsLoading={optionsLoading}
                    onChange={handleOnChange}
                    options={searching ? filteredOptions : salesRep}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Assigned sales rep</label>} 
                    placeholder="Select sales rep"
                    type="text"
                    name="saleReps"
                />
                {/* <Input 
                    className="mb-[8px]"
                    value=""
                    onChange={handleOnChange}
                    select
                    options={salesRep}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Assigned sales rep</label>} 
                    placeholder="Select sales rep"
                    type="text"
                    name="saleReps"
                /> */}
                <div className="flex gap-2 flex-wrap">
                    {dealDetails.saleReps.map(itemValue => {
                        return (<p className="bg-[#C3278126] flex items-center gap-3 py-1 px-3 rounded-3xl text-[14px] text-[#333333]"><span className=" -translate-y-[1px]">{salesRep.find(item => item.value === Number(itemValue))?.name}</span> <Xicon onClick={() => handleRemoveSalesRep(itemValue)} className="scale-[0.8]" /></p>)
                    })}
                </div>
                <Button disabled={loading || (!edited)} type="submit" className="mt-3 disabled:bg-slate-600 disabled:cursor-not-allowed h-[2.68em]">
                    {loading ? <ActivityIndicator /> : "Save"}
                </Button>
            </form>
        </Modal>
    )
}

export default EditDealsModal