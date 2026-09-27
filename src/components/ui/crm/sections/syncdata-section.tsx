import Button from "@/components/primary/Button"
import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react"
import { syncTestData } from "@/testData"
import Table from "@/components/secondary/Table"
import { GridColDef } from "@mui/x-data-grid"
import SearchIcon from "../../../../../public/svgs/search-icon.svg"
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { MenuItem } from "@mui/material"
import Input from "@/components/primary/input"
import Modal from "@/components/primary/Modal"
import SelectDataModal from "../selectData-modal"
import useModal from "@/components/util/useModal"
import { useGetImportDealsQuery, usePostSyncDealsMutation } from "../../../../../api-feature/apiSlice"
import useLoading from "@/components/util/useLoading"
import toast from "react-hot-toast"
import SyncDataModal from "../sync-modal"
import { useRouter } from "next/router"
import { ApiType } from "../../../../../api-feature/types"
import { crmDealsType } from "../../../../../api-feature/crm/hubspot/hubspot-type"
import { crmconnectedtype } from "../crm-setup"

interface props {
    handleChangeStep: (step: 1 | 2 | 3) => void;
    handleSkip: () => void;
    hubspotId?: number;
    salesforceId?: number;
    connected: crmconnectedtype
}

interface importDealsApiType extends ApiType {
    data: {data: crmDealsType[], success: boolean}
}

const SyncDataSection:FC<props> = ({handleChangeStep, hubspotId, connected, salesforceId, handleSkip}) => {
    const {modalOpen, closeModal, openModal} = useModal()
    const router = useRouter()
    const [dealSynced, setDealSynced] = useState(false)
    const {loading, startLoading, stopLoading} = useLoading()
    // @ts-ignore
    const {data, status, error} = useGetImportDealsQuery<importDealsApiType>({platformId: connected == "hubspot" ? hubspotId : salesforceId})
    const [syncDeals] = usePostSyncDealsMutation() 
    const [selectedDeals, setSelectedDeals] = useState<string[]>([])
    const [searchInput, setSearchInput] = useState("")
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const dealsData = data?.data
    const rows = dealsData
    // const rows = syncTestData

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);

    const handleSelectData = (id: string) => {
        setSelectedDeals((prevSelectedDeals) => {
            if (prevSelectedDeals.includes(id)) {
                // Remove the id
                return prevSelectedDeals.filter(dealId => dealId !== id);
            } else {
                // Add the id
                return [...prevSelectedDeals, id];
            }
        });
    };

    const handleSyncData = async () => {
        try {
            startLoading()
            openModal()
            // @ts-ignore
            const response = await syncDeals({platformId: connected == "hubspot" ? hubspotId : salesforceId, dealIds: selectedDeals}).unwrap()
            console.log(response)
            setDealSynced(true)
            toast.success("Deals synced")
            setTimeout(() => {
                router.push("/dashboard")
            },1000)
        } catch(error) {
            console.error(error)
            closeModal()
            toast.error("Error syncing Deals")
        } finally {
            stopLoading()
        }
    }

    useEffect(() => {
        setIsLargeScreen(window.innerWidth > 940);
    })

    useEffect(() => {
        if (status === "fulfilled") {
            dealsData.length <= 0 && toast.success("No Deals Available")
        }

        if (status === "rejected") {
            toast.error("Error occured")
        }

    }, [status])

    const columns: GridColDef[] = useMemo(() => {
        return [
            {field: "name", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                headerName: "Name"},
            // {field: "client", 
            //     flex: isLargeScreen ? 1 : undefined, 
            //     width: isLargeScreen ? undefined : 200, 
            //     renderHeader: () => ( 
            //     <div className="flex items-center mdx2:flex-row flex-col">
            //         <p>Client/</p><p>Company</p>
            //     </div>
            //     )
            // },
            {field: "contact.name", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                // filterOperators: [stageFilterOperator] , 
                headerName: "Contact Names", 
                renderCell: (params) => (
                    <p>{params.row?.contacts?.firstname ?? "null"} {params.row?.contacts?.lastname ?? "null"}</p>
                )
            },
            {field: "email", 
                flex: isLargeScreen ? 0.5 : undefined,  
                width: isLargeScreen ? undefined : 100,
                // filterOperators: [statusFilterOperator],
                headerName: "Email",
                renderCell: (params) => (
                    <p>{params.row?.contacts?.email ?? "null@gmail.com"}</p>
                )
            },
            {field: "Phone", 
                flex: isLargeScreen ? 0.5 : undefined,
                width: isLargeScreen ? undefined : 100,
                // filterOperators: [statusFilterOperator],
                headerName: "Phone",
                renderCell: (params) => (
                    <p>{params.row?.contacts?.phone ?? "0000null"}</p>
                )
            },
            // {field: "owners", 
            //     flex: isLargeScreen ? 0.5 : undefined,  
            //     width: isLargeScreen ? undefined : 100,
            //     // filterOperators: [statusFilterOperator],
            //     headerName: "Owners"
            // },
            // {field: "Date", 
            //     flex: isLargeScreen ? 0.5 : undefined,  
            //     width: isLargeScreen ? undefined : 100,
            //     // filterOperators: [statusFilterOperator],
            //     headerName: "Date"
            // },
            // {field: "assignedSalesRep", 
            //     flex: isLargeScreen ? 1 : undefined, 
            //     width: isLargeScreen ? undefined : 200,
            //     // filterOperators: getGridNumericOperators() , 
            //     cellClassName: "center-cell-text", renderHeader: () =>  (<div className="flex gap-1 flex-col ml-[3em]"><p>Assigned <br />Sales Rep</p></div>),
            //     renderCell: (params) => (
            //         <p className="text-center">{params.row._count.salesReps}</p>
            //     )
            // },
            // {
            //     field: 'actions',
            //     flex: isLargeScreen ? 0.5 : undefined, 
            //     width: isLargeScreen ? undefined : 100,
            //     headerName: 'Actions',
            //     renderCell: (params) => (
            //         <TableActionsMenu options={[
            //             <MenuItem key={1} onClick={() => {}}>View More</MenuItem>,
            //             // (accountType === "manager" || accountType === "owner") && <MenuItem key={2} onClick={() => handleOpenEditModal(params as { id: string; row: dealsType; })}>Edit</MenuItem>,
            //             // (accountType === "manager" || accountType === "owner") && <MenuItem key={3} onClick={() => toast.error("endpoint unavailable")}><span className="text-red-500">Delete</span></MenuItem>
            //         ]} data={params} />
            //     ),
            //     sortable: false,
            //     filterable: false,
            // },
        ]
    },[isLargeScreen]) 

    return (
        <div className="overflow-auto pt-10">
            <SyncDataModal modalOpen={modalOpen} closeModal={closeModal} status={loading ? "loading" : dealSynced ? "successful" : undefined} />
            {/* <SelectDataModal modalOpen={modalOpen} closeModal={closeModal} /> */}
            <h1 className="text-[1.5em] sm:text-[30px] font-[500] mt-3 text-center">Sync your CRM data into Durekt</h1>
            <p className="text-[#333333]">Choose which data you would like to import from your Salesforce </p>

            <div className="w-[90%] mx-auto mt-10 pb-10">
                <Table 
                    // admin
                    // fetchMoreData={getMoreData}
                    checkbox
                    customHeader={
                        <div className="flex justify-between ">
                            <div className="w-[20em] relative h-[2.4em] overflow-hidden bg-[#F8F8FA] rounded-lg border ">
                                <SearchIcon className="absolute right-2 top-2" />  
                                <input placeholder="search" className="px-4 text-[#D4D4D4] w-full h-full" />
                            </div>
                            {/* <button onClick={openModal} className="border border-[#B3387F] text-[#B3387F] px-4 rounded-lg h-[2.4em] active:scale-[0.95] transition-all">Select Data to Sync</button> */}
                        </div>
                    }
                    // containerClassName="p-4 rounded-2xl pb-[25px] bg-white"
                    // @ts-ignore
                    handleSelectCell={(e) => {handleSelectData(e?.id)}}
                    loading={status === "pending"}
                    filteredRows={rows}
                    columns={columns}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    getRowIdField="id"
                />

                <div className="flex gap-5 mt-12 ml-auto justify-end items-center">
                    <p className="text-[#333333] font-[700]">Step 3 of 3</p>
                    <div className="flex gap-3 items-center">
                        {/* <div className="w-[100px]">
                            <Button onClick={() => handleChangeStep(2)} className="py-[5px] bg-transparent border border-[#B3387F]"><p className="text-[#B3387F]">Previous</p></Button>
                        </div> */}
                        <div className="w-[140px]">
                            <Button onClick={handleSkip} className="py-[5px] bg-transparent h-[33px] border border-[#B3387F]"><p className="text-[#B3387F]">Skip for now</p></Button>
                        </div>
                        {dealsData?.length > 0 && <div className="w-[100px]">
                            <Button disabled={selectedDeals?.length <= 0} onClick={handleSyncData} className="py-[5px] border border-[#B3387F]">Start Sync</Button>
                        </div>}
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default SyncDataSection