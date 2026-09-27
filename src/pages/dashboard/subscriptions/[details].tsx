import DashboardLayout from "@/components/layouts/DashboardLayout"
import ArrorwIcon from "../../../../public/svgs/arrow2-icon.svg"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ChangeEvent, useCallback, useEffect, useLayoutEffect, useMemo, Suspense, useState } from "react"
import gsap from "gsap"
import { billingHistoryData, subscriptionsData } from "@/testData"
import { GridColDef } from "@mui/x-data-grid"
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { MenuItem } from "@mui/material"
import PauseIcon from "../../../../public/svgs/pause-icon.svg"
import CancelIcon from "../../../../public/svgs/cancel-icon.svg"
import ExchangeIcon from "../../../../public/svgs/exchange-icon.svg"
import DownloadIcon from "../../../../public/svgs/download2-icon.svg"

const LazyTable = React.lazy(() => import("@/components/secondary/Table"))

// Dynamic route: get ID of company selected
const SubscriptionHistory = () => {
    const router = useRouter()
    const id = router.query.details
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

    const [searchInput, setSearchInput] = useState("")
    // @ts-ignore
    const subscriptionRow = subscriptionsData.filter(item => item.id == id)

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);

    const filteredBillingRows = useMemo(() => {
        return billingHistoryData.filter(row =>
            row.number.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [billingHistoryData, searchInput]);
    
    const subscriptionColumns: GridColDef[] = useMemo(() => {
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
                        <MenuItem sx={{fontSize: 13, display: "flex", alignItems: "center", gap: 1}} onClick={() => {}}><ExchangeIcon /> Change Subscription</MenuItem>,
                        <MenuItem sx={{fontSize: 13, display: "flex", alignItems: "center", gap: 1}} onClick={() => {}}><PauseIcon /> Pause Subscription</MenuItem>,
                        <MenuItem sx={{fontSize: 13, display: "flex", alignItems: "center", gap: 1}} onClick={() => {}}><CancelIcon /> Cancel Subscription</MenuItem>
                    ]} data={params} />
                ),
                // width: 10,
                sortable: false,
                filterable: false,
                renderHeader: () => (<p>Action</p>)
            },
        ]
    },[isLargeScreen]) 

    const billingColumns: GridColDef[] = useMemo(() => {
        return [
            {field: "number" , 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                headerClassName: "font-[700]", renderHeader: () => (<p>Invoice number</p>),
            },
            {field: "plan", 
                flex: isLargeScreen ? 0.7 : undefined, 
                width: isLargeScreen ? undefined : 150, 
                headerClassName: "font-[700]", renderHeader: () => (<p>Plan</p>)
            },
            {field: "amount",
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 130,
                renderHeader: () => (<p>Amount</p>), headerClassName: " font-[700] "},
            {field: "date", 
                flex: isLargeScreen ? 0.8 : undefined, 
                width: isLargeScreen ? undefined : 150,
                // filterOperators: [statusFilterOperator], 
                renderHeader: () => (<p>Date</p>), headerClassName: " font-[700] ",
            },
            {field: "expires", 
                flex: isLargeScreen ? 0.8 : undefined, 
                width: isLargeScreen ? undefined : 150,
                //  filterOperators: getGridNumericOperators() , 
                cellClassName: "center-cell-text",
                headerClassName: " font-[700] ", renderHeader: () => (<p className="">Expires</p>)
            },
            {field: "status", 
                flex: isLargeScreen ? 0.4 : undefined, 
                width: isLargeScreen ? undefined : 120,
                //  filterOperators: getGridNumericOperators() , 
                cellClassName: "center-cell-text",
                headerClassName: " font-[700] ", renderHeader: () => (<p className="">Status</p>)
            },
            {
                field: 'actions',
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                headerClassName: " font-[700] ",
                renderCell: (params) => (
                    <div className="mt-6 flex">
                        <DownloadIcon className="mx-auto cursor-pointer active:scale-[0.9] transition-all" />
                    </div>
                ),
                // width: 10,
                sortable: false,
                filterable: false,
                renderHeader: () => (<p>Action</p>)
            },
        ]
    },[isLargeScreen]) 

        
    useLayoutEffect(() => {
        setIsLargeScreen(window.innerWidth > 940);
    })

    useEffect(() => {
        gsap.timeline()
            .to(".trainings-txt", {color: "#5B5B5B", fontSize: "13.2px", fontWeight: "400", textDecoration: "underline"})
            .to(".topic-txt", {x: 0, opacity: 1})
    },[])

    return (
        <DashboardLayout>
            <div className="flex items-center gap-0 text-[15px]">
                <Link className="trainings-txt text-[20px] font-[600] text-[#333333] " href={"/dashboard/subscriptions"}><p>Subscriptions</p></Link>
                {/* <Link className=" cursor-pointer underline text-[#5B5B5B]" href={"/dashboard/trainings"}><p >Trainings</p></Link> */}
                <div className="topic-txt flex items-center -translate-x-16 opacity-0">
                    <ArrorwIcon className="scale-[0.8]" />
                    <p className=" text-[#333333] font-[500] ">Subscription History</p>
                </div>
            </div>

            <div className="mt-6">
                <Suspense fallback={<div>Loading Table...</div>}>
                    <LazyTable 
                        admin
                        loading={false}
                        getRowIdField="id"
                        hideHeader
                        hideHelpers
                        hideFooter
                        disableRowSelectionOnClick
                        // columnHeaderHeight={10}
                        filteredRows={subscriptionRow}
                        columns={subscriptionColumns}
                        searchInput={""}
                        handleSearchChange={() => {}}                    
                    />
                </Suspense>
            </div>

            <div className="mt-[4em]">
                <Suspense fallback={<div>Loading Table...</div>}>
                    <LazyTable 
                        admin
                        loading={false}
                        getRowIdField="id"
                        csv
                        title={<h1 className="text-[#2B3674] font-[700] text-[20px]">Billing History</h1>}
                        // disableRowSelectionOnClick
                        // columnHeaderHeight={10}
                        filteredRows={filteredBillingRows}
                        columns={billingColumns}
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                    />
                </Suspense>
            </div>
        </DashboardLayout>
    )
}

export default SubscriptionHistory