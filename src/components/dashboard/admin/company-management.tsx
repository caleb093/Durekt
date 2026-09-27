import Button from "@/components/primary/Button"
import Table from "@/components/secondary/Table"
import { useRouter } from "next/router"
import { companiesData } from "@/testData"
import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { MenuItem } from "@mui/material"
import Modal from "@/components/primary/Modal"
import useModal from "@/components/util/useModal"
import Input from "@/components/primary/input"

const CompanyManagementComponent = () => {
    const router = useRouter()
    const rows = companiesData
    const [searchInput, setSearchInput] = useState("")
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);
    const [companyDetails, setCompanyDetails] = useState({
        name: "",
        email: "",
        role: ""
    })
    const {openModal, modalOpen, closeModal} = useModal()

    useLayoutEffect(() => {
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
                cellClassName: "center-cell-text",
                renderCell: (params) => {
                    const sub = params.row.subscription
                    const status = params.row.status
                    return (
                        <div className="flex flex-col">
                            <p className="leading-3 mt-5">{sub}</p>
                            <p className={`${status === "Active" ? "text-[#3C891A]" : "text-[#E08416]"} leading-6 text-[12px] `}>{status}</p>
                        </div>
                    )
                },
                headerClassName: " font-[700] ", renderHeader: () => (<p className="">Subscription</p>)
            },
            {
                field: 'actions',
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                headerClassName: " font-[700] ",
                renderCell: (params) => (
                    <TableActionsMenu  options={[
                        <MenuItem sx={{fontSize: 14}} onClick={() => {router.push(`/dashboard/company-management/${params.id}`)}}>View Team Members</MenuItem>,
                        <MenuItem sx={{fontSize: 14}} onClick={() => {router.push("/dashboard/company-management/activitylogs")}}>View Activity Logs</MenuItem>,
                        <MenuItem sx={{fontSize: 14}} onClick={() => {router.push(`/dashboard/subscriptions/${params.id}`)}}>View Subscription</MenuItem>,
                        <MenuItem sx={{fontSize: 14}} onClick={() => {}}>Suspend Company</MenuItem>,
                        <MenuItem sx={{color: "red", fontSize: 14}} onClick={() => {}}>Delete Company</MenuItem>
                    ]} data={params} />
                ),
                // width: 10,
                sortable: false,
                filterable: false,
                renderHeader: () => (<p>Action</p>)
            },
        ]
    },[isLargeScreen]) 

    const handleCreateCompany = () => {

    }

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name
        const value = e.target.value
        
        setCompanyDetails(prev => ({...prev, [key]: value})) 
    },[])

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
            >
                <form onSubmit={handleCreateCompany} className="pt-7 pb-12 px-6 sm:px-14">
                    <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Company</p>
                    <Input 
                        className="mb-[8px]"
                        value={companyDetails.name}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Name</label>} 
                        placeholder="Enter Company name"
                        type="text"
                        name="name"
                    />
                    <Input 
                        className="mb-[8px]"
                        value={companyDetails.email}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Email</label>} 
                        placeholder="Enter email"
                        type="text"
                        name="email"
                    />
                    <Input 
                        className="mb-[8px]"
                        value={companyDetails.role}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Owner Role (optional)</label>} 
                        placeholder="Enter team role e.g Product Manager"
                        type="text"
                        name="role"
                    />
                    <Button type="submit" className="mt-3">
                        Save
                    </Button>
                </form>
            </Modal>       
            <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-[600] text-[#333333]">All Companies</h1>
                <div className="w-[140px]">
                    <Button onClick={openModal} className="py-[6px] text-[13px]">Add New Company</Button>
                </div>
            </div>
            <br />
            <Table 
                admin
                loading={false}
                getRowIdField="id"
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
    )
}

export default CompanyManagementComponent