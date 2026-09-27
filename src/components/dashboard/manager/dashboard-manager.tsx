import OutlineIcon from "../../../../public/svgs/outline.svg"
import { GridRowsProp, GridColDef } from "@mui/x-data-grid"
import { Box } from "@mui/material"
import TeamDistribution from "@/components/ui/dashboard/TeamDistribution"
import TopPerformance from "@/components/ui/dashboard/TopPerformance"
import OverviewComponent from "@/components/ui/dashboard/overview"
import { useGetRecentCallsQuery } from "../../../../api-feature/apiSlice"
import { ApiType } from "../../../../api-feature/types"
import { recentCallsType } from "../../../../api-feature/manager-owner/overview/overview-type"
import Table from "@/components/secondary/Table"
import { useMemo } from "react"
import { getHighlightColor } from "@/components/util/helperFunctions"
import { skillSetData } from "@/testData"

interface callsApiType extends ApiType {
    data: {data: {meetings: recentCallsType[], skills: string[]}, success: boolean}
}

const ManagerDashboard = () => {
    const {data, status, error} = useGetRecentCallsQuery<callsApiType>()
    const meetingData = data?.data?.meetings
    const rows = meetingData?.slice(0, 4)

    const columns: GridColDef[] = useMemo(() => {
        
        const allGradeKeys = new Set<string>();

        meetingData?.forEach((row) => {
            if (row.grades) {
            Object.keys(row.grades).forEach((key) => allGradeKeys.add(key));
            }
        });

        const baseColumns:GridColDef[] = [
            {field: "meetingName", headerName: "Meeting Name", width: 200},
            {field: "date", headerName: "Date", cellClassName: "date-column--cell",
                renderCell: (params) => {
                    const {date} = params.row
                    const dateObject = new Date(date);

                    const getDate = dateObject.toLocaleDateString();

                    let time = dateObject.toLocaleTimeString();
                    time = time.split(':').slice(0, 2).join(':') + ' ' + time.split(' ')[1];  // "6:50 PM"

                    return (
                        <div className="flex flex-col">
                            <p className="leading-3 mt-2">{getDate}</p>
                            <p className="leading-6 ">{time}</p>
                        </div>
                    )
                },
            },
            {field: "status", headerName: "Status",
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
                        <p className={`w-16 h-[30px] rounded-2xl text-white text-[13px] font-[500] flex justify-center items-center ${params.value !== "Graded" ? "bg-[#E1335D33]" : "bg-[#32ea2833]"}`}>{params.value}</p>
                    </Box>
                )
            },
            {field: "overallGrade", headerName: "Overall", renderCell: (params) => (<span className={`${getHighlightColor(Number(params?.row?.overallGrade))} p-[4px] rounded-full`}>{params?.row?.overallGrade}</span>)},
        ]

        const gradeColumns: GridColDef[] = Array.from(allGradeKeys).map((gradeKey) => {
            const skillData = skillSetData?.find((item) => item.short === gradeKey); // Match with the short key

            return {
                field: `grades.${gradeKey}`,
                headerName: gradeKey,
                description: skillData
                    ? `(${skillData.name}) - ${skillData.description}` // Combine name and description if a match is found
                    : "No description available", // Fallback description
                // flex: isLargeScreen ? 0.5 : undefined,
                // width: isLargeScreen ? undefined : 100,
                renderCell: (params) => {
                    return <span className={`${getHighlightColor(Number(params?.row?.grades[gradeKey]))} p-[4px] rounded-full`}>{params?.row?.grades[gradeKey]}</span>; // Accessing the skill value
                },
            }
        });

        return [...baseColumns, ...gradeColumns];
    },[rows]) 
    
    
    return (
        <div> 
            <div className="flex items-center gap-1">
                <h1 className="text-[1.5em] font-[600] text-[#333333]">Overview</h1>
                <OutlineIcon className=" scale-[0.85] translate-y-[1px]" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-3 mt-4">
                <OverviewComponent />
                <TopPerformance />
            </div>

            <div className="flex flex-col mdx2:flex-row mt-12 gap-4">
                <div className=" flex-[2] bg-white p-0 rounded-lg mdx2:w-[100px]">
                    {/* <div className="flex justify-between px-3 pt-3 ">
                        <p className="text-[16px] text-[#333333] font-[600]">Recent call Analysis</p>
                    </div> */}
                    <div>
                    <Table 
                        filteredRows={rows}
                        columns={columns}
                        getRowIdField="date"
                        hideHelpers
                        hideFooter
                        // hideHeader
                        title={<p className="text-[15px] mb-[-10px]">Recent call Analysis</p>}
                        loading={status === "pending"}
                        searchInput=""
                        handleSearchChange={() => {}}
                        rowHeight={64}
                        columnHeaderHeight={60}
                    />
                    </div>
                </div>
                <TeamDistribution />
            </div>
        </div>
    )
}

export default ManagerDashboard