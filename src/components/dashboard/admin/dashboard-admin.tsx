import OutlineIcon from "../../../../public/svgs/outline.svg"
import AnalyticsIcon from "../../../../public/svgs/analytics-icon.svg"
import Table from "@/components/secondary/Table"
import { companiesData } from "@/testData"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { MenuItem } from "@mui/material"
import { LineChart } from "@mui/x-charts"
import { BarChart } from "@mui/x-charts"
import CalenderIcon from "../../../../public/svgs/calendar-icon.svg"
// import { BarChart } from "@mui/x-charts/BarChart";


const revenueData = [
  { day: "monday", price: 120 },
  { day: "tuesday", price: 800 },
  { day: "wednesday", price: 500 },
  { day: "thursday", price: 1000 },
  { day: "friday", price: 400 },
  { day: "saturday", price: 200 },
  { day: "sunday", price: 300 }, // Example for Sunday
];

const companyRegistered = [
  { day: "monday", number: 15 },
  { day: "tuesday", number: 8 },
  { day: "wednesday", number: 5 },
  { day: "thursday", number: 3 },
  { day: "friday", number: 10 },
  { day: "saturday", number: 2 },
  { day: "sunday", number: 3 },
];


const dayLabels = {
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "THU",
  friday: "FRI",
  saturday: "SAT",
  sunday: "SUN",
};


const AdminDashboard = () => {
    const rows = companiesData
    const [searchInput, setSearchInput] = useState("")
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);

    useEffect(() => {
        setIsLargeScreen(window.innerWidth > 940);
    })


    const filteredRows = useMemo(() => {
        return rows.filter(row =>
            row.name.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [rows, searchInput]);

     const columns: GridColDef[] = useMemo(() => {
        return [
            {field: "name", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                headerName: "Name", headerClassName: "font-[700]", renderHeader: () => (<p>Name</p>)},
            {field: "email", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200, 
                headerClassName: "font-[700]", renderHeader: () => (<p>Email</p>)
            },
            {field: "dateAdded",
                flex: isLargeScreen ? 0.6 : undefined, 
                width: isLargeScreen ? undefined : 120,
                renderHeader: () => (<p>Date Added</p>), headerClassName: " font-[700] "},
            {field: "status", 
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                // filterOperators: [statusFilterOperator], 
                renderHeader: () => (<p>Status</p>), headerClassName: " font-[700] ",
                renderCell: (params) => {
                    const data = params.row.status
                    console.log(data)
                    return (
                        <p className={`${data === "Active" ? "text-[#3C891A]" : "text-[#E08416]"}`}>{data}</p>
                    )
                }
            },
            {field: "subscription", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200,
                //  filterOperators: getGridNumericOperators() , 
                // cellClassName: "center-cell-text", 
                headerClassName: " font-[700] ", renderHeader: () => (<p>Subscription</p>)
            },
            {
                field: 'actions',
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                headerClassName: " font-[700] ",
                renderCell: (params) => (
                    <TableActionsMenu options={[
                        <MenuItem onClick={() => {}}>Action 1</MenuItem>,
                        <MenuItem onClick={() => {}}>Action 2</MenuItem>,
                        <MenuItem onClick={() => {}}>Action 3</MenuItem>
                    ]} data={params} />
                ),
                // width: 10,
                sortable: false,
                filterable: false,
                renderHeader: () => (<p>Actions</p>)
            },
        ]
    },[isLargeScreen]) 

    return (
        <div>
            <div className="flex items-center gap-1">
                <h1 className="text-[1.5em] font-[600] text-[#333333]">Overview</h1>
                <OutlineIcon className=" scale-[0.85] translate-y-[1px]" />
            </div>

            <div className="grid grid-cols-2 lg:flex gap-4 sm:gap-7 mt-5">
                <div className="bg-white p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-5 flex-1">
                    <AnalyticsIcon className="flex-shrink-0 scale-[0.9]" />
                    <div>
                        <p className="text-[#A3AED0] text-[14px]">Active Users</p>
                        <p className="text-[#2B3674] text-[20px] font-[700]">12,000</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl flex gap-5 flex-1 justify-center sm:justify-start items-center">
                    <div>
                        <p className="text-[#A3AED0] text-[14px]">Total Call Analyzed</p>
                        <p className="text-[#2B3674] text-[20px] font-[700]">25k+</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl flex gap-5 flex-1 justify-center sm:justify-start items-center">
                    <div>
                        <p className="text-[#A3AED0] text-[14px]">Training Enrolled</p>
                        <p className="text-[#2B3674] text-[20px] font-[700]">250</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl flex gap-5 flex-col sm:flex-row items-center flex-1 ">
                    <AnalyticsIcon className="flex-shrink-0 scale-[0.9]" />
                    <div>
                        <p className="text-[#A3AED0] text-[14px]">Active Users</p>
                        <p className="text-[#2B3674] text-[20px] font-[700]">12,00</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-8">
                <div className="bg-white rounded-2xl px-4 py-5 flex-1 flex-shrink-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[#2B3674] font-[700] text-[24px]">$7.5K</p>
                            <p className="text-[#A3AED0] text-[14px]">Total Revenue</p>
                        </div>
                        <div className="border flex  gap-1 border-[#D9D9D9] text-[#6D6D6D] text-[12px] px-3 py-1 rounded-lg">
                            <CalenderIcon />
                            <p>This week</p>
                        </div>
                    </div>
                     <LineChart
                        // width={500}
                        height={300}
                        dataset={revenueData}
                        xAxis={[
                            {
                            dataKey: "day",
                            // @ts-ignore
                            valueFormatter: (value) => dayLabels[value], // Format day labels
                            scaleType: "band", // Evenly space out the days
                            },
                        ]}
                        series={[
                            {
                            dataKey: "price", // Refers to the price field in revenueData
                            label: "Price ($)", // Label for the line
                            color: "#B3387F", // You can change the color of the line
                            
                            },
                        ]}
                        yAxis={[
                            {   
                            valueFormatter: (value) => `$${value}`,
                            // label: "Price ($)", // Label for the y-axis
                            scaleType: "linear", // Automatically scale based on data
                            },
                        ]}
                    />
                </div>
                <div className="bg-white rounded-2xl px-4 py-5 flex-1 flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[#333333] font-[600]">Company Registered</p>
                        </div>
                        <div className="border flex gap-1 border-[#D9D9D9] text-[#6D6D6D] text-[12px] px-3 py-1 rounded-lg">
                            <CalenderIcon />
                            <p>This week</p>
                        </div>
                    </div>
                    <BarChart
                        // width={500}
                        height={360}
                        dataset={companyRegistered}
                        xAxis={[
                            {
                            dataKey: "day",
                            // @ts-ignore
                            valueFormatter: (value) => dayLabels[value],
                            scaleType: "band", // For categorical data on the x-axis
                            },
                        ]}
                        yAxis={[
                            {
                            // label: "Companies Registered",
                            scaleType: "linear",
                            valueFormatter: (value) => `${value}`, // Number formatting for y-axis
                            },
                        ]}
                        // loading={true}
                        borderRadius={100}
                        series={[
                            {
                            dataKey: "number", // Maps to the `number` field in `companyRegistered`
                            // label: "Number of Companies",
                            color: "#D9D9D9", // Custom color for the bars (green)
                            },
                        ]}
                    />
                </div>
            </div>

            <div className="mt-8">
                <Table 
                    admin
                    loading={false}
                    getRowIdField="id"
                    hideFooter
                    checkbox
                    title={<div className="w-full flex justify-between items-center"><h1 className="text-[#2B3674] font-[700]">Recent Company</h1> <p className="text-[12px] text-[#A3AED0]">See all</p></div>}
                    hideHelpers
                    // columnHeaderHeight={10}
                    filteredRows={filteredRows}
                    columns={columns}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    className=" border-none"
        
                />
            </div>
        </div>
    )
}

export default AdminDashboard