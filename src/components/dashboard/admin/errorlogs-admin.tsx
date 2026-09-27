import Table from "@/components/secondary/Table"
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { errorLogsData } from "@/testData"
import { MenuItem } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import { useRouter } from "next/router"
import { ChangeEvent, useCallback, useLayoutEffect, useMemo, useState } from "react"
import CalenderIcon from "../../../../public/svgs/calendar-icon.svg"
import MoreIcon from "../../../../public/svgs/more-icon.svg"

const ErrorLogsComponent = () => {
    const router = useRouter()
    const rows = errorLogsData
    const [searchInput, setSearchInput] = useState("")
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);

    useLayoutEffect(() => {
        setIsLargeScreen(window.innerWidth > 940);
    })

    // const filteredRows = useMemo(() => {
    //     return rows.filter(row =>
    //         row.name.toLowerCase().includes(searchInput.toLowerCase())
    //     );
    // }, [rows, searchInput]);

    const columns: GridColDef[] = useMemo(() => {
        return [
            {field: "timestamp", 
                flex: isLargeScreen ? 0.8 : undefined, 
                width: isLargeScreen ? undefined : 180,
                headerClassName: "font-[700]", renderHeader: () => (<p>Timestamp</p>)},
            {field: "errorCode", 
                flex: isLargeScreen ? 0.7 : undefined, 
                width: isLargeScreen ? undefined : 150, 
                headerClassName: "font-[700]", renderHeader: () => (<p>Error code</p>)
            },
            {field: "description",
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                renderHeader: () => (<p>Error Description</p>), headerClassName: " font-[700] "},
            {field: "severity", 
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                // filterOperators: [statusFilterOperator], 
                renderHeader: () => (<p>Severity</p>), headerClassName: " font-[700] ",
            },
            {field: "component", 
                flex: isLargeScreen ? 0.75 : undefined, 
                width: isLargeScreen ? undefined : 180,
                // filterOperators: [statusFilterOperator], 
                renderHeader: () => (<p>Component</p>), headerClassName: " font-[700] ",
            },
            {field: "status", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                //  filterOperators: getGridNumericOperators() , 
                cellClassName: "center-cell-text",
                headerClassName: " font-[700] ", renderHeader: () => (<p className="">Resolution Status</p>)
            },
            {
                field: 'actions',
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                headerClassName: " font-[700] ",
                renderCell: (params) => (
                    <TableActionsMenu  options={[
                        <MenuItem sx={{fontSize: 14}} onClick={() => {}}>Action 1</MenuItem>,
                        <MenuItem sx={{fontSize: 14}} onClick={() => {}}>Action 2</MenuItem>,
                        <MenuItem sx={{fontSize: 14}} onClick={() => {}}>Action 3</MenuItem>,
                    ]} data={params} />
                ),
                // width: 10,
                sortable: false,
                filterable: false,
                renderHeader: () => (<p>Action</p>)
            },
        ]
    },[isLargeScreen]) 


    return (
        <div>
             <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-[600] text-[#333333]">Error Logs</h1>
            </div>

            <div className="mt-5">
                <Table
                    admin
                    loading={false}
                    getRowIdField="id"
                    checkbox
                    title=" "
                    hideHeader
                    hideHelpers
                    disableRowSelectionOnClick
                    // columnHeaderHeight={10}
                    filteredRows={rows}
                    columns={columns}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mt-6">
                <div className="bg-white rounded-xl p-4 flex-[0.6] flex-shrink-0">
                    <div className="flex justify-between">
                        <p className="text-[#333333] text-[18px] font-[700]">Error Trends</p>
                        <div className="flex text-[13px] gap-3 items-center bg-[#F4F7FE] text-[#A3AED0] px-3 rounded-lg">
                            <CalenderIcon />
                            <p>This week</p>
                        </div>
                    </div>

                    
                </div>
                <div className="bg-white rounded-xl p-4 flex-1 flex-shrink-0">
                    <div className="flex justify-between">
                        <p className="text-[#333333] text-[18px] font-[700]">Error Resolution</p>
                        <div className="flex text-[13px] gap-3 items-center bg-[#F4F7FE] text-[#A3AED0] px-1 rounded-lg">
                            <MoreIcon className="text-red-400 scale-[0.8]" />
                        </div>
                    </div>

                    <div className="mt-6 text-[12px] sm:text-[14px] ">
                        <div className="border-b border-b-[#E9EDF7] flex pb-2">
                            <p className="text-[#A3AED0] font-[500] flex-shrink-0 flex-1">Name</p>
                            <p className="text-[#A3AED0] font-[500] flex-shrink-0 flex-[0.55]">Status</p>
                            <p className="text-[#A3AED0] font-[500] flex-shrink-0 flex-[0.5]">Date</p>
                            <p className="text-[#A3AED0] font-[500] flex-shrink-0 flex-[0.8]">Progress</p>
                        </div>

                        {[0,1,2,3].map(item => (
                            <div className="flex py-4 gap-1">
                                <p className="text-[#2B3674] font-[700] flex-shrink-0 flex-1">Internal Server Error</p>
                                <p className="text-[#2B3674] font-[700] flex-shrink-0 flex-[0.55]">Resolved</p>
                                <p className="text-[#2B3674] font-[700] flex-shrink-0 flex-[0.5]">18 Apr 2021</p>
                                <div className="text-[#2B3674] font-[700] items-center flex flex-shrink-0 flex-[0.8]">
                                    <div className="w-[70%] overflow-hidden bg-[#EFF4FB] h-[8px] rounded-lg ">
                                        <div className="w-[40%] rounded-lg h-full bg-[#B3387F]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorLogsComponent