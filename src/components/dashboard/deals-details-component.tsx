import Button from "@/components/primary/Button"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import Table from "@/components/secondary/Table"
import { dealsData, dealsDataType, skillSetData } from "@/testData"
import { GridColDef, GridEventListener } from "@mui/x-data-grid"
import MenuItem from '@mui/material/MenuItem';
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { useRouter } from "next/router"
import Link from "next/link"
import ArrorwIcon from "../../../public/svgs/arrow2-icon.svg"
import { useGetDealNotesQuery, useGetDealOverviewQuery, useGetDealSalesrepPerformanceQuery, useGetMeetingsQuery } from "../../../api-feature/apiSlice"
import { ApiType } from "../../../api-feature/types"
import { dealMeetingsDataType, dealSalesrepPerformanceType, dealsOverviewType, notesType } from "../../../api-feature/manager-owner/deals/deal-type"
import useModal from "../util/useModal"
import { DealOverview, DealReport, DealNotes } from "../ui/deals"
import ScheduleMeetingModal from "../modals/schedulemeeting-modal."
import toast from "react-hot-toast"
import { getHighlightColor } from "../util/helperFunctions"
import ArrowIcon from "../../../public/svgs/arrow2-icon.svg"
import Dropdown from "../secondary/Dropdown"
import DropdownItem from "../secondary/DropdownItem"
import useClickOutside from "../util/useClickOutside";
import { SalesrepQueryParams } from "./manager/salesrep-manager"
import { Box } from "@mui/material"
import Walkthrough from "../secondary/Walkthrough"

type sectionsType = "overview" | "meetings" | "notes"
 
interface overviewApi extends ApiType {
    data: {success: boolean, data: dealsOverviewType}
}

interface performanceApi extends ApiType {
    data: {success: boolean, data: dealSalesrepPerformanceType[]}
}

interface meetingApi extends ApiType {
    data: {success: boolean, data: {meetings: dealMeetingsDataType[]}}
}

interface notesApi extends ApiType {
    data: {success: boolean, data: notesType[]}
}

const steps = [
    {
        target: '#schedule-meeting-btn',
        content: 'Schedule a meeting here, either manually or through a crm',
    },
    {
        target: '#view-meetings-btn',
        content: 'Click here, to view upcoming and previous meetings',
    },
    {
        target: '#meeting-notes-btn',
        content: 'Click here, to add and view notes',
    },
    {
        target: '#deal-performance',
        content: "View Team members Performance Ratings on meetings so far",
    },
]

const DealdetailsComponent = () => {
    const router = useRouter()
    const {dealID} = router.query
    // @ts-ignore
    const {data: overviewData, status: overviewStatus, error: overviewError} = useGetDealOverviewQuery<overviewApi>(dealID)
    // @ts-ignore
    const {data: performanceData, status: performanceStatus, error: performanceError} = useGetDealSalesrepPerformanceQuery<performanceApi>(dealID)
    // @ts-ignore
    const {data: meetingsData, status: meetingStatus, error: meetingsError} = useGetMeetingsQuery<meetingApi>(dealID)
    // @ts-ignore
    const {data: notesData, status: noteStatus, error: notesError} = useGetDealNotesQuery<notesApi>(dealID)

    const dealPerformanceRows = performanceData?.data
    const meetingRows = meetingsData?.data?.meetings

    const [dropDownOpen, setDropdownOpen] = useState(false)    
    const dropdownRef = useClickOutside<HTMLDivElement>(() => setDropdownOpen(false));
    const [section, setSection] = useState<sectionsType>("overview")
    const [dealsSearchInput, setDealsSearchInput] = useState("")
    const [meetingSearchInput, setMeetingSearchInput] = useState("")
    const {modalOpen, closeModal, openModal} = useModal()
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const [openTableDropdown, setOpenTableDropdown] = useState<boolean>(false)

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

    const filteredDealsRow = useMemo(() => {
        return dealPerformanceRows?.filter(row => {
            const firstName = row?.user?.firstName.toLowerCase();
            const lastName = row?.user?.lastName.toLowerCase();
            const searchValue = dealsSearchInput.toLowerCase();

            return (
                firstName.includes(searchValue) || lastName.includes(searchValue)
            );
        });
    }, [dealPerformanceRows, dealsSearchInput]);

    const filteredMeetingsRow = useMemo(() => {
        return meetingRows?.filter(row =>
            row?.meetingName.toLowerCase().includes(meetingSearchInput.toLowerCase())
        );
    }, [meetingRows, meetingSearchInput]);

    const handleDealsSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setDealsSearchInput(event.target.value);
    },[]);

    const handleMeetingsSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setMeetingSearchInput(event.target.value);
    },[]);

    const handleChangeSection = (newSection: sectionsType) => {
        setSection(newSection)
    }
    
    const meetingsColumns: GridColDef[] = useMemo(() => {
        return [
            {
                field: "meetingName",
                // flex: 1,
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                headerName: "Meeting Name",
            },
            {
                field: "date",
                // flex: 1,
                flex: isLargeScreen ? 1 : undefined,
                width: isLargeScreen ? undefined : 150,
                cellClassName: "date-column--cell",
                headerName: "Date",
                renderCell: (params) => {
                    const {date, timezone} = params.row
                    const dateObject = new Date(date);

                    // const getDate = dateObject.toLocaleDateString();
                    const getDate = dateObject.toLocaleDateString("en-GB", { 
                        day: "2-digit", 
                        month: "2-digit", 
                        year: "numeric" 
                    });

                    // let time = dateObject.toLocaleTimeString();
                    let time = dateObject.toLocaleTimeString("en-US", { 
                        hour: "2-digit", 
                        minute: "2-digit", 
                        hour12: true 
                    });
                    // time = time.split(':').slice(0, 2).join(':') + ' ' + time.split(' ')[1];  // "6:50 PM"

                    return (
                        <div className="flex flex-col">
                            <p className="leading-3 mt-2">{getDate}</p>
                            <p className="leading-6 ">{time} {timezone ?? "UTC"}</p>
                        </div>
                    )
                },
            },
            {
                field: "status",
                // flex: 1,
                flex: isLargeScreen ? 1 : undefined,
                width: isLargeScreen ? undefined : 130,
                headerName: "Status",
                renderCell: (params) => (
                    <Box
                        sx={{
                            color: 'white',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: '4px',
                            textAlign: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <p className={`w-20 h-[30px] rounded-2xl text-[13px] font-[500] flex justify-center items-center mr-auto ${params.value == "Upcoming" ? "text-[#7e7ef8] bg-[#6e6ed536]" : params.value !== "Graded" ? "bg-[#E1335D33] text-[#E1335D]" : "bg-[#32ea2833] text-green-300"}`}>{params.value}</p>
                    </Box>
                )
            },
            {
                field: 'actions',
                headerName: 'Actions',
                renderCell: (params) => {
                    // Sample date string from backend
                    const backendDate = params?.row?.date;

                    // Convert the string to a Date object
                    const eventDate = new Date(backendDate);

                    // Get the current date and time
                    const currentDate = new Date();

                    // Compare the dates
                    // if (eventDate.getTime() < currentDate.getTime()) {
                    //     return (<div>
                    //         <TableActionsMenu options={[
                    //             <Link target="__blank__" href={params?.row?.url} ><MenuItem>Ended</MenuItem></Link>,
                    //         ]} data={params} />
                    //     </div>)
                    // } else {
                    //     return (<div>
                    //         <TableActionsMenu options={[
                    //             <Link target="__blank__" href={params?.row?.url} ><MenuItem>Join</MenuItem></Link>,
                    //         ]} data={params} />
                    //     </div>)
                    // }
                    return (<div>
                        <TableActionsMenu options={[
                            (params.row.status !== "Graded" ? <Link key={1} target="__blank__" href={params?.row?.url} ><MenuItem><span className="text-[13px]">Join Meeting</span></MenuItem></Link> : <MenuItem className="text-red-500">Ended</MenuItem>),
                            <MenuItem key={2} onClick={() => router.push({pathname: `/dashboard/sales-rep`, query: {goToSection: "transcript", meetingId: "1192-3030-lldo"} as SalesrepQueryParams})}><span className="text-[13px]">View Meeting Transcript</span></MenuItem>,
                                <>
                                    <MenuItem className="flex h-[2em] items-center" key={2} onClick={(e) => (e.stopPropagation(), setOpenTableDropdown(prev => !prev))}><span className="text-[13px]">View Sales Rep Insights</span> <ArrorwIcon className={`scale-[0.8] ml-auto transition-all ${openTableDropdown ? "rotate-[90deg]" : "rotate-0"}`}  /></MenuItem>
                                    <Dropdown isOpen={openTableDropdown} className={`${!openTableDropdown && "h-0 pointer-events-none"} right-10 bg-red-600 w-[90%] sticky ml-4 max-h-[7em] overflow-auto border-x-0 border-b-0`}>
                                        <DropdownItem onClick={() => {setOpenTableDropdown(false),  router.push({pathname: `/dashboard/sales-rep`, query: {goToSection: "meeting-report", meetingId: "3", salesrepId: "4"} as SalesrepQueryParams})}} text={<div className="flex items-center gap-2"><div className="w-7 h-7 bg-slate-300 rounded-lg" /> <p>Elizabeth parker wand will smith</p></div>} />
                                        <DropdownItem onClick={() => {setOpenTableDropdown(false)}} text={<div className="flex items-center gap-2"><div className="w-7 h-7 bg-slate-300 rounded-lg" /> <p>John Parker</p></div>}  />
                                        <DropdownItem onClick={() => {setOpenTableDropdown(false)}} text={<div className="flex items-center gap-2"><div className="w-7 h-7 bg-slate-300 rounded-lg" /> <p>Mike Adenuga</p></div>} />
                                    </Dropdown>
                                </>,
                        ]} data={params} />
                    </div>)
                },
                flex: isLargeScreen ? 0.3 : undefined, 
                width: isLargeScreen ? undefined : 120,
                sortable: false,
                filterable: false,
            },

        ];
    }, [isLargeScreen, meetingRows, openTableDropdown]);

    const dealPerformanceColumns: GridColDef[] = useMemo(() => {

        const allSkillKeys = new Set<string>();

        performanceData?.data?.forEach((row) => {
            if (row.skills) {
            Object.keys(row.skills).forEach((key) => allSkillKeys.add(key));
            }
        });
        
        const baseColumns: GridColDef[] = [
            {
                field: "user",
                // flex: 1,
                // flex: isLargeScreen ? 2 : undefined, 
                // width: isLargeScreen ? undefined : 200,
                width: 150,
                headerName: "Name",
                renderCell: (params) => {
                    const {firstName, lastName} = params?.row?.user
                    return (
                        <div className="flex flex-col">
                            <p className="leading-3 mt-5">{firstName} {lastName}</p>
                            <p className="leading-6 text-[12px]">{params?.row?.role}</p>
                        </div>
                    )
                },
            },
            {
                field: "overall",
                // flex: 1,
                // flex: isLargeScreen ? 1 : undefined,
                // width: isLargeScreen ? undefined : 150,
                width: isLargeScreen ? 80 : 100,
                headerName: "Overall",
                renderCell: (params) => (<span className={`${getHighlightColor(Number(params?.row?.overall))} p-[4px] rounded-full`}>{params?.row?.overall}</span>)
            }
        ];

        const skillColumns: GridColDef[] = Array.from(allSkillKeys).map((skillKey) => {
            const skillData = skillSetData?.find((item) => item.short === skillKey); // Match with the short key

            return {
                field: `skills.${skillKey}`,
                headerName: skillKey,
                description: skillData
                    ? `(${skillData.name}) - ${skillData.description}` // Combine name and description if a match is found
                    : "No description available", // Fallback description
                disableColumnMenu: true,
                sortable: false,
                width: 75,
                // flex: isLargeScreen ? 0.5 : undefined,
                // width: isLargeScreen ? undefined : 100,
                renderCell: (params) => {
                return <span className={`${getHighlightColor(Number(params?.row?.skills[skillKey]))} p-[4px] rounded-full`} >{params.row.skills[skillKey]}</span>; // Accessing the skill value
            },
        }});

        return [...baseColumns, ...skillColumns];
    }, [isLargeScreen, dealPerformanceRows]);

    return (
        <>
            <Walkthrough steps={steps} />
            <div className="flex flex-col">
                <ScheduleMeetingModal 
                    // @ts-ignore
                    dealId={dealID}
                    modalOpen={modalOpen}
                    closeModal={closeModal}
                />

                <div className="flex flex-col mdx4:flex-row justify-between mdx4:items-center">
                    <div className="flex items-center gap-0 text-[15px]">
                        <Link className=" cursor-pointer underline text-[#5B5B5B]" href={"/dashboard/deals"}><p >Deals</p></Link>
                        <ArrorwIcon className="scale-[0.8]" />
                        <p className=" text-[#333333] font-[500] ">Deal details</p>
                    </div>
                    <div className="flex flex-col sm:flex-row ml-auto gap-3 relative">
                        {/* <div style={{width: "10em"}}>
                            <Button onClick={() => toast.error("Work in progress")} className=" py-[6px] text-[13px]">Upload Meeting</Button>
                        </div> */}
                        {/* <div style={{width: "10em"}}>
                            <Button onClick={() => toast.error("Work in progress")} className=" py-[6px] text-[13px]">Joi Meeting</Button>
                        </div> */}
                        <div style={{width: "11em"}}>
                            <Button id="schedule-meeting-btn" onClick={() => setDropdownOpen(prev => !prev)} className="h-[2.3em] py-[6px] text-[13px] flex gap-1 items-center justify-center ">Schedule Meeting <ArrorwIcon className=" rotate-[90deg] relative top-[-3px] w-6" /></Button>
                        </div> 
                        <Dropdown ref={dropdownRef} className="left-0 mt-1 z-[10]" isOpen={dropDownOpen}>
                            <DropdownItem onClick={() => (openModal(), setDropdownOpen(false))} text="Manually" />
                            <DropdownItem onClick={() => {router.push("/calendly-integration")}} text="Calendly" />
                        </Dropdown>
                    </div>
                </div>

                <div className="bg-white flex w-[20em] translate-y-[1px] mt-4 z-[2]  pb-0 text-[14px] border ">
                    <p onClick={() => handleChangeSection("overview")} className={` ${section === "overview" ? "bg-gradient-to-r font-[700] from-[#6FA9E2] to-[#B3387F] text-white" : "bg-none"} flex-1 py-2 text-[#333333] text-center cursor-pointer`}>Overview</p>
                    <p id="view-meetings-btn" onClick={() => handleChangeSection("meetings")} className={` ${section === "meetings" ? "bg-gradient-to-r font-[700] from-[#6FA9E2] to-[#B3387F] text-white" : "bg-none"} flex-1 py-2 text-[#333333] text-center cursor-pointer`}>Meetings</p>
                    <p id="meeting-notes-btn" onClick={() => handleChangeSection("notes")} className={` ${section === "notes" ? "bg-gradient-to-r font-[700] from-[#6FA9E2] to-[#B3387F] text-white" : "bg-none"} flex-1 py-2 text-[#333333] text-center cursor-pointer`}>Notes</p>
                </div>
                {section === "overview" && 
                    <>
                        <div className="flex flex-col mdx2:flex-row justify-between gap-4">
                            <DealOverview loading={overviewStatus === "pending"} error={overviewStatus === "rejected"} data={overviewData?.data} />
                            <DealReport loading={overviewStatus === "pending"} error={overviewStatus === "rejected"} data={overviewData?.data}  />
                        </div>
                        <div id="deal-performance" className="mt-8 border rounded-md overflow-hidden">
                            <Table 
                                loading={performanceStatus === "pending"}
                                filteredRows={filteredDealsRow}
                                columns={dealPerformanceColumns}
                                searchInput={dealsSearchInput}
                                handleSearchChange={handleDealsSearch}
                                csv
                                title="Deal Performance Rating"
                                getRowIdField="user.id"
                            />
                        </div>                    
                    </>
                }
                {section === "meetings" && 
                    <>
                        <div className="mt-4 overflow-hidden relative">
                            <Table 
                                loading={meetingStatus === "pending"}
                                filteredRows={filteredMeetingsRow}
                                columns={meetingsColumns}
                                searchInput={meetingSearchInput}
                                handleSearchChange={handleMeetingsSearch}
                                getRowIdField="meetingName"
                            />
                        </div>    
                    </>
                }
                {section === "notes" && 
                    <>
                        {/* @ts-ignore */}
                        <DealNotes notesData={notesData?.data} dealId={dealID} loading={noteStatus === "pending"} error={noteStatus === "rejected"} />  
                    </>
                }
            </div>
        </>
    )
}

export default DealdetailsComponent