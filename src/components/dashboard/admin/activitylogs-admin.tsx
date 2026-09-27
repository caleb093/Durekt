import { ChangeEvent, useCallback, useLayoutEffect, useMemo, useState } from "react"
import ArrorwIcon from "../../../../public/svgs/arrow2-icon.svg"
import Table from "@/components/secondary/Table"
import { activityData } from "@/testData"
import { GridColDef } from "@mui/x-data-grid"
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { MenuItem } from "@mui/material"

const ActivityLogsComponent = () => {
    const [selectedCompany, setSelectedCompany] = useState(null) 
    const [openDropDown, setOpenDropDown] = useState(false)
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const rows = activityData
    const [searchInput, setSearchInput] = useState("")
    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);

    const filteredRows = useMemo(() => {
        return rows.filter(row =>
            row.name.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [rows, searchInput]);


    const companiesData = [
        {
            name: "john donald",
            id: 1
        },
        {
            name: "michael purr",
            id: 2
        },
        {
            name: "Giveon john",
            id: 3
        },
        {
            name: "victor akpan",
            id: 4
        },
        {
            name: "aquila akpan",
            id: 5
        },
                {
            name: "john donald",
            id: 6
        },
        {
            name: "michael purr",
            id: 7
        },
        {
            name: "Giveon john",
            id: 8
        },
        {
            name: "victor akpan",
            id: 9
        },
        {
            name: "aquila akpan",
            id: 10
        },
    ]

    const handleDropDown = () => {
        setOpenDropDown(prev => !prev)
    }

    useLayoutEffect(() => {
        setIsLargeScreen(window.innerWidth > 940);
    },[])

    const columns: GridColDef[] = useMemo(() => {
        return [
            {field: "name", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                headerName: "Name", headerClassName: "font-[700]", renderHeader: () => (<p>Name/Email</p>),
                renderCell: (params) => {
                    const {name, email} = params.row
                    //.log(params)
                    return (
                        <div className="flex flex-col">
                            <p className="leading-3 mt-5">{name}</p>
                            <p className="leading-6 text-[12px]">{email}</p>
                        </div>
                    )
                },
            },
            {field: "description", 
                flex: isLargeScreen ? 1.5 : undefined, 
                width: isLargeScreen ? undefined : 250, 
                headerClassName: "font-[700]", renderHeader: () => (<p>Activity Description</p>)
            },
            {field: "timestamp",
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 150,
                renderHeader: () => (<p>Timestamp</p>), headerClassName: " font-[700] "},
            {field: "status", 
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                // filterOperators: [statusFilterOperator], 
                renderHeader: () => (<p>Status</p>), headerClassName: " font-[700] ",
                // renderCell: (params) => {
                //     const data = params.row.status
                //     return (
                //         <div className=""><p className={`px-4 h-7 mt-5 flex justify-center items-center rounded-lg ${data === "Active" ? "text-[#3C891A] bg-[#3C891A1A]" : "text-[#E08416] bg-[#E189331A]"} `}>{data}</p></div>
                //     )
                // }
            },
            {
                field: 'actions',
                flex: isLargeScreen ? 0.3 : undefined, 
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h1 className="text-[20px] font-[600] text-[#333333]">Activity Logs</h1>
                <div className="flex items-center gap-2 relative ml-auto">
                    <p className="font-[500] text-[15px] ">Company:</p>
                    <div onClick={handleDropDown} className="border bg-white cursor-pointer border-[#D4D4D4] font-[500] text-[13px] rounded-lg flex justify-between items-center gap-10 pl-2">
                        {/* @ts-ignore */}
                        <p>{selectedCompany ? selectedCompany.name : "Select company"}</p>
                        <ArrorwIcon className="scale-[0.9]" />
                    </div>

                    <div className={`${openDropDown ? "max-h-[50vh] opacity-1" : "max-h-0 opacity-[0.4]"} bg-white text-[13px] z-[2] transition-all text-[#333333] font-[500] absolute w-full overflow-auto top-0 mt-9`}>
                        {companiesData.map(item => (
                            // @ts-ignore
                            <p onClick={() => {handleDropDown(), setSelectedCompany(item)}} className="py-2 border-b pl-2 hover:bg-slate-100 cursor-pointer">{item.name}</p>
                        ))}
                    </div>  
                </div>
            </div>

            <div className="mt-4">
                <Table 
                    loading={false}
                    getRowIdField="id"
                    admin
                    checkbox
                    title=" "
                    csv
                    disableRowSelectionOnClick
                    // columnHeaderHeight={10}
                    filteredRows={filteredRows}
                    columns={columns}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                />
            </div>
        </div>
    )
}

export default ActivityLogsComponent