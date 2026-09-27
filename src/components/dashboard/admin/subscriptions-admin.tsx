import Table from "@/components/secondary/Table"
import TableActionsMenu from "@/components/secondary/TableActionsMenu";
import { subscriptionsData } from "@/testData";
import { MenuItem } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const SubscriptionsComponent = () => {
    const router = useRouter()
    const rows = subscriptionsData
    const [searchInput, setSearchInput] = useState("")
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);

    useLayoutEffect(() => {
        setIsLargeScreen(window.innerWidth > 940);
    })

    const handleNavigate = (data: {id: string}) => {
        router.push(`/dashboard/subscriptions/${data.id}`)
    }

    const columns: GridColDef[] = useMemo(() => {
        return [
            {field: "company", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                headerClassName: "font-[700]", renderHeader: () => (<p>Company</p>),
                renderCell: (params) => {
                    const name = params.row.company
                    const email = params.row.company
                    return (
                        <div className="flex flex-col">
                            <p className="leading-3 mt-5">{name}</p>
                            <p className={"leading-6 text-[12px]"}>{email}@gmail.com</p>
                        </div>
                    )
                },
            },
            {field: "plan", 
                flex: isLargeScreen ? 0.7 : undefined, 
                width: isLargeScreen ? undefined : 150, 
                headerClassName: "font-[700]", renderHeader: () => (<p>Subscription     Plan</p>)
            },
            {field: "date",
                flex: isLargeScreen ? 0.8 : undefined, 
                width: isLargeScreen ? undefined : 150,
                renderHeader: () => (<p>Date</p>), headerClassName: " font-[700] "},
            {field: "expires", 
                flex: isLargeScreen ? 0.8 : undefined, 
                width: isLargeScreen ? undefined : 150,
                // filterOperators: [statusFilterOperator], 
                renderHeader: () => (<p>Expires</p>), headerClassName: " font-[700] ",
            },
            {field: "status", 
                flex: isLargeScreen ? 0.4 : undefined, 
                width: isLargeScreen ? undefined : 120,
                //  filterOperators: getGridNumericOperators() , 
                cellClassName: "center-cell-text",
                headerClassName: " font-[700] ", renderHeader: () => (<p className="">Status</p>),
                renderCell: (params) => {
                    const data = params.row.status
                    console.log(data)
                    return (
                        <p className={`${data === "Active" ? "text-[#3C891A]" : "text-[#E08416]"}`}>{data}</p>
                    )
                }
            },
            {
                field: 'actions',
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                headerClassName: " font-[700] ",
                renderCell: (params) => (
                    <TableActionsMenu  options={[
                        <MenuItem sx={{fontSize: 14}} onClick={() => {handleNavigate(params.row)}}>History</MenuItem>,
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
                <h1 className="text-[20px] font-[600] text-[#333333]">Subscriptions</h1>
            </div>

            <div className="mt-6">
                <Table 
                    admin
                    loading={false}
                    getRowIdField="id"
                    checkbox
                    title=" "
                    hideHeader
                    csv
                    disableRowSelectionOnClick
                    // columnHeaderHeight={10}
                    filteredRows={rows}
                    columns={columns}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                />
            </div>
        </div>
    )
}

export default SubscriptionsComponent