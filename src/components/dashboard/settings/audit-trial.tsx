import Button from "@/components/primary/Button"
import { Box, MenuItem, Select, useMediaQuery } from "@mui/material"
import { AuditLogData } from "@/testData"
import Table from "@/components/secondary/Table"
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { GridColDef, GridRowHeightParams } from "@mui/x-data-grid"
import CalenderIcon from "../../../../public/svgs/calendar-icon.svg"
import Modal from "@/components/primary/Modal"
import { usePostAuditLogsMutation } from "../../../../api-feature/apiSlice"
import { dataContext } from "@/components/contexts/dataContext"
import useModal from "@/components/util/useModal"
import Input from "@/components/primary/input"
import useLoading from "@/components/util/useLoading"
import toast from "react-hot-toast"
import { AuditLogType } from "../../../../api-feature/manager-owner/company/company-type"

const AuditTrail = () => {
    const {startLoading, stopLoading, loading} = useLoading()
    const {modalOpen, openModal, closeModal} = useModal()
    const [generateAudit] = usePostAuditLogsMutation()
    const {teamRolesData, teamData} = useContext(dataContext)
    const [searchInput, setSearchInput] = useState("")
    const startRef = useRef<HTMLInputElement | null>(null)
    const endRef = useRef<HTMLInputElement | null>(null)
    const [startDateSelected, setStartDateSelected] = useState(false)
    const [auditDetails, setAuditDetails] = useState({
        userId: "",
        start_date: "",
        end_date: "",
        roleId: 0
    })
    const [auditLogs, setAuditLogs] = useState<AuditLogType[]>([])
    const rows = auditLogs
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    
    const teamOptions = [{value: "", name: "All"}] as {value: string | number, name: string}[]
    teamData?.map(item => teamOptions.push({value: item.userId, name: `${item?.firstName} ${item?.lastName}`}))

    const roleOptions = [] as {value: string | number, name: string}[]
    teamRolesData?.map(item => roleOptions.push({value: item.id, name: item.name}))

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name 
        const value = e.target.value
        if (key === "role") {
            setAuditDetails(prev => ({...prev, [key]: Number(value)}))
            return
        }
        setAuditDetails(prev => ({...prev, [key]: value}))
      }, [])

    useEffect(() => {
        // Function to update screen size state
        const updateScreenSize = () => {
            setIsLargeScreen(window.innerWidth > 940);
        };
        // Initial check
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    
    const handleStartDateChange = () => {
        setStartDateSelected(true)
        const startDate = startRef?.current?.value;
        if (startDate && endRef.current) {
            endRef.current.min = startDate; // Set the min attribute for end date
        }
    }

    const handleCloseModal = () => {
        const startDate = startRef?.current?.value
        const endDate = endRef?.current?.value
        // @ts-ignore
        setAuditDetails((prev) => ({...prev, start_date: startDate, end_date: endDate}))
        setStartDateSelected(false)
        closeModal()
    }

    const handleClear = () => {
        setAuditDetails({
            userId: "",
            start_date: "",
            end_date: "",
            roleId: 0
        })
    }

    const filteredRows = useMemo(() => {
        return rows
        // return rows.filter(row =>
        //     row?.user?.toLowerCase().includes(searchInput.toLowerCase())
        // );
    }, [rows, searchInput]);

    
    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);

    const getRowHeight = (params: GridRowHeightParams) => {
        const activity = params?.model?.content;
        const charPerLine = 50; // Approximate number of characters per line, adjust as needed
        const numberOfLines = Math.ceil(activity?.length / charPerLine); // Estimate number of lines

        // Base height per line is around 24px (can adjust based on font size)
        const baseHeightPerLine = 33;

        return Math.max(75, numberOfLines * baseHeightPerLine); // Set minimum height to 75px
    };
        
    const columns: GridColDef[] = useMemo(() => {
        return [
            {field: "timestamp", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                renderHeader: () => (
                    <div className="font-[700]">
                        Timestamp
                    </div>
                ),  
                headerClassName: "text-[#333333]"
            },
            {field: "user", 
                flex: isLargeScreen ? 1 : undefined,
                width: isLargeScreen ? undefined : 150,
                renderHeader: () => (
                    <div className="font-[700]">
                        User
                    </div>
                ), 
                headerClassName: "text-[#333333]",
                renderCell: (params) => {
                    const {first_name, last_name, position} = params?.row
                    return (
                        <div className="flex flex-col">
                            <p className="leading-3 mt-5">{first_name} {last_name}</p>
                            <p className="leading-6 text-[12px]">{position}</p>
                        </div>
                    )
                },
            },
            {field: "content", 
                flex: isLargeScreen ? 1 : undefined,
                width: isLargeScreen ? undefined : 300,
                renderHeader: () => (
                    <div className="font-[700]">
                        Activity
                    </div>
                ), headerClassName: "text-[#333333]", cellClassName: "fullLength-column--cell",
                renderCell: (params) => (
                    <Box
                        sx={{
                            whiteSpace: "normal",   // Allows text to wrap
                            wordWrap: "break-word", // Breaks long words
                            lineHeight: "1.2",      // Adjusts the line height
                            maxHeight: "none",      // Ensure the cell can grow in height
                            display: "block",       // Display block to allow wrapping
                        }}
                    >
                        {params.value}
                    </Box>
                )
            },
        ]; 
    }, [isLargeScreen]) 

    const handleGenerateAudit = async () => {
        startLoading()
        const toastId = toast.loading("Loading")

        try {
            await generateAudit({...auditDetails}).unwrap()
                .then(fulfilled => {
                    setAuditLogs(fulfilled.data)
                })
                .catch(rejected => {
                    console.error(rejected)
                    toast.error(rejected?.data?.message ?? "Error occured")
                    // toast.error("Error occured")
                })
        } catch(error) {
            toast.error("Error occured")
        } finally {
            stopLoading()
            toast.dismiss(toastId);
        }
    }

    const allFieldsFilled = (details: {}) => {
        return Object.values(details).every(value => {
            // Check if value is not empty, null, or undefined
            if (typeof value === 'string') {
                return value.trim() !== ""; // For strings, check for non-empty trimmed value
            }
            return value !== null && value !== undefined && value !== 0; // For non-strings, check value
        });
    };

    return (
        <div className="flex-1 w-[100%] ">
            <Modal isOpen={modalOpen} onClose={() => (closeModal(), setStartDateSelected(false))}>
                <div className="p-4 pt-10 flex flex-col sm:flex-row gap-4"> 
                    <div className="w-full text-left flex flex-col gap-1">
                        <p className="font-[600]">Start</p>
                        <input ref={startRef} type="date" name="start" onChange={handleStartDateChange} className="border w-full px-2 py-1" />
                    </div>
                    <div className="w-full text-left flex flex-col gap-1">
                        <p className="font-[600]">End</p>
                        <input ref={endRef} disabled={!startDateSelected} type="date" name="end" className="border w-full px-2 py-1 disabled:cursor-not-allowed" />
                    </div>
                </div>
                <div className="px-4 pb-3 mt-2">
                    <Button onClick={handleCloseModal}>Ok</Button>
                </div>
            </Modal>
            <div className="border bg-white px-5 sm:px-7 py-6 mb-6 rounded-md text-left ">
                <div className="flex flex-col md:flex-row justify-between gap-5">
                    <Input 
                        className="mb-[8px]"
                        // @ts-ignore
                        value={auditDetails.roleId}
                        onChange={handleOnChange}
                        select
                        options={roleOptions}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">User type</label>} 
                        placeholder="Select Role"
                        type="text"
                        name="roleId"
                    /> 
                    <Input 
                        className="mb-[8px]"
                        value={auditDetails.userId}
                        onChange={handleOnChange}
                        select
                        options={teamOptions}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Specific User</label>} 
                        placeholder="All"
                        type="text"
                        name="userId"
                    /> 
                </div>

                <div className="flex flex-col lg:flex-row items-end justify-between gap-5 mt-5">
                    <div className="w-full">
                        <p  className=' text-[14px] font-[400] text-[#6B6C70]'>Period</p>
                        <div onClick={openModal} className=" cursor-pointer border p-2 rounded-lg mt-1 relative">
                            <span>{auditDetails?.start_date || "Start"} to {auditDetails?.end_date || "End"}</span>
                            <CalenderIcon className="absolute right-3 top-[27%]" />
                        </div>
                    </div>
                    <div className="w-full flex gap-4  ">
                        <div className="flex justify-between lg:pl-10 w-full gap-3">
                            <Button onClick={handleClear} className="bg-transparent border border-[#B3387F] "><p className="text-[#B3387F]">Clear all</p></Button>
                            <Button disabled={!auditDetails.end_date || !auditDetails.start_date || !auditDetails.roleId || loading} onClick={handleGenerateAudit} >Generate</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full"> 
                <div className=" text-left overflow-auto "> 
                    <Table 
                        title="Audit Log"
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        filteredRows={filteredRows}
                        columns={columns}
                        csv
                        admin
                        columnHeaderHeight={37}
                        // className=" border-none"
                        getRowHeight={getRowHeight}
                        getRowIdField="timestamp"
                        loading={loading}
                        // handleSelectCell={handleSelectSalesRep as GridEventListener<"cellClick">}
                    />
                </div>
            </div>
        </div>
    )
}

export default AuditTrail