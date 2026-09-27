import DashboardLayout from "@/components/layouts/DashboardLayout"
import { useRouter } from "next/router"
import ArrorwIcon from "../../../../public/svgs/arrow2-icon.svg"
import Link from "next/link"
import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
import gsap from "gsap"
import Table from "@/components/secondary/Table"
import { companyTeamMember } from "@/testData"
import { GridColDef } from "@mui/x-data-grid"
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { MenuItem } from "@mui/material"
import Button from "@/components/primary/Button"
import Modal from "@/components/primary/Modal"
import useModal from "@/components/util/useModal"
import Input from "@/components/primary/input"
import Xicon from "../../../../public/svgs/x-icon.svg"

type modalType = "createTeam" | "editRole"

const CompanyDetails = () => {
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const router = useRouter()
    const rows = companyTeamMember
    const [searchInput, setSearchInput] = useState("")
    const [modalType, setModalType] = useState("" as modalType)
    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    },[]);
    const [editDetails, setEditDetails] = useState({
        role: "",
        permission: ""
    })
    const {openModal, modalOpen, closeModal} = useModal()
    const [newTeamDetails, setNewTeamDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        permission: []
    })

    const filteredRows = useMemo(() => {
        return rows.filter(row =>
            row.name.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [rows, searchInput]);

    useEffect(() => {
        gsap.timeline()
            .to(".trainings-txt", {color: "#5B5B5B", fontSize: "13.2px", fontWeight: "400", textDecoration: "underline"})
            .to(".topic-txt", {x: 0, opacity: 1})
    },[])

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
            {field: "role", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200, 
                headerClassName: "font-[700]", renderHeader: () => (<p>Role</p>)
            },
            {field: "permission",
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 150,
                renderHeader: () => (<p>Permission</p>), headerClassName: " font-[700] "},
            {field: "status", 
                flex: isLargeScreen ? 0.5 : undefined, 
                width: isLargeScreen ? undefined : 100,
                // filterOperators: [statusFilterOperator], 
                renderHeader: () => (<p>Status</p>), headerClassName: " font-[700] ",
                renderCell: (params) => {
                    const data = params.row.status
                    return (
                        <div className=""><p className={`px-4 h-7 mt-5 flex justify-center items-center rounded-lg ${data === "Active" ? "text-[#3C891A] bg-[#3C891A1A]" : "text-[#E08416] bg-[#E189331A]"} `}>{data}</p></div>
                    )
                }
            },
            {
                field: 'actions',
                flex: isLargeScreen ? 0.3 : undefined, 
                width: isLargeScreen ? undefined : 100,
                headerClassName: " font-[700] ",
                renderCell: (params) => (
                    <TableActionsMenu  options={[
                        <MenuItem sx={{fontSize: 14}} onClick={() => {}}>Edit User</MenuItem>,
                        <MenuItem sx={{fontSize: 14}} onClick={() => (openModal(), setModalType("editRole"), setEditDetails({role: params.row.role, permission: params.row.permission}))}>Update Role & Permission</MenuItem>,
                        <MenuItem sx={{fontSize: 14}} onClick={() => {}}>Remove User</MenuItem>,
                        <MenuItem sx={{fontSize: 14}} onClick={() => {}}>Suspend User</MenuItem>
                    ]} data={params} />
                ),
                // width: 10,
                sortable: false,
                filterable: false,
                renderHeader: () => (<p>Action</p>)
            },
        ]
    },[isLargeScreen]) 

    const handleAddTeam = () => {

    }

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name
        const value = e.target.value
        
        if (key === "permission") {
            // @ts-ignore
            setNewTeamDetails((prev) => {
                // @ts-ignore
                if (!prev.permission.includes(value)) {
                    return {
                        ...prev,
                        [key]: [...prev.permission, value],
                    };
                }
                return prev;
            });
            return;
        }

        setNewTeamDetails(prev => ({...prev, [key]: value}))
    }, [])

     const handleRemovePermission = (permissionToRemove: string) => {
        setNewTeamDetails(prev => ({
            ...prev,
            permission: prev.permission.filter(permission => permission !== permissionToRemove)
        }));
    }

    return (
        <DashboardLayout>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
            >
                {modalType === "createTeam" && <form onSubmit={handleAddTeam} className="pt-7 pb-12 px-14">
                    <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Team</p>
                    <Input 
                        className="mb-[8px]"
                        value={newTeamDetails.firstName}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">First Name</label>} 
                        placeholder="Enter Company name"
                        type="text"
                        name="name"
                    />
                    <Input 
                        className="mb-[8px]"
                        value={newTeamDetails.lastName}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Last Name</label>} 
                        placeholder="Enter email"
                        type="text"
                        name="email"
                    />
                    <Input 
                        className="mb-[8px]"
                        value={newTeamDetails.email}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Email</label>} 
                        placeholder="Enter team role e.g Product Manager"
                        type="text"
                        name="role"
                    />
                    <Input 
                        className="mb-[8px]"
                        value={newTeamDetails.role}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Role</label>} 
                        placeholder="Enter team role e.g Product Manager"
                        type="text"
                        name="role"
                    />
                    <Input 
                        className="mb-[8px]"
                        value=""
                        // value={newTeamDetails.permission}
                        onChange={handleOnChange}
                        select
                        // @ts-ignore
                        options={["Sales rep", "Manager"]}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Select Permission</label>} 
                        placeholder="Enter Permission"
                        type="text"
                        name="permission"
                    />
                    <div className="flex gap-2 flex-wrap"> 
                        {newTeamDetails.permission.map(item => (
                            <p className="bg-[#C3278126] flex items-center gap-3 py-1 px-3 rounded-3xl text-[14px] text-[#333333]"><span className=" -translate-y-[1px]">{item}</span> <Xicon onClick={() => handleRemovePermission(item)} className="scale-[0.8]" /></p>
                        ))}
                    </div>

                    <Button type="submit" className="mt-3">
                        Save
                    </Button>
                </form>}
                {modalType === "editRole" && 
                    <div className="pt-7 pb-12 px-14">
                        <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Edit Role and Permissions</p>
                        <Input 
                            className="mb-[8px]"
                            value={editDetails.role}
                            onChange={handleOnChange}
                            label={<label className="text-[#333333] font-medium text-[0.9em]">Role</label>} 
                            placeholder="Enter team role e.g Project Manager"
                            type="text"
                            name="role"
                        />
                        <Input 
                            className="mb-[8px]"
                            value=""
                            onChange={handleOnChange}
                            select
                            // @ts-ignore
                            options={["Sales rep", "Manager"]}
                            label={<label className="text-[#333333] font-medium text-[0.9em]">Permission</label>} 
                            placeholder="Enter Permission"
                            type="text"
                            name="permission"
                        />
                        <Button type="submit" className="mt-3">
                            Save
                        </Button>
                    </div>
                }
            </Modal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center gap-0 text-[15px]">
                    <Link className="trainings-txt text-[20px] font-[600] text-[#333333] " href={"/dashboard/company-management"}><p >All Companies</p></Link>
                    {/* <Link className=" cursor-pointer underline text-[#5B5B5B]" href={"/dashboard/trainings"}><p >Trainings</p></Link> */}
                    <div className="topic-txt flex items-center -translate-x-16 opacity-0">
                        <ArrorwIcon className="scale-[0.8]" />
                        <p className=" text-[#333333] font-[500] ">company name</p>
                    </div>
                </div>

                <div className="w-[140px] ml-auto">
                    <Button onClick={() => (openModal(), setModalType("createTeam"))} className="py-[6px] text-[13px]">Add New Team</Button>
                </div>
            </div>

            <div className="mt-8">
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
        </DashboardLayout>
    )
}

export default CompanyDetails