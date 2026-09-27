import { ChangeEvent, useCallback, useEffect, useMemo, useState, useContext, useLayoutEffect } from "react"
import Button from "@/components/primary/Button"
import Table from "@/components/secondary/Table"
import { GridColDef } from "@mui/x-data-grid"
import TableActionsMenu from "@/components/secondary/TableActionsMenu"
import { MenuItem } from "@mui/material"
import { useGetTeamQuery, usePostInviteTeamMutation, useUpdateRoleMutation } from "../../../../api-feature/apiSlice"
import toast from "react-hot-toast"
import { dataContext } from "@/components/contexts/dataContext"
import { teamType } from "../../../../api-feature/manager-owner/team/team-type"
import TeamsModal from "@/components/modals/team-modal"
import useModal from "@/components/util/useModal"
import { ApiType } from "../../../../api-feature/types"
import { appContext } from "@/components/contexts/appContext"

export type teamFormType = {
    firstName: string;
    lastName: string;
    email: string;
    role: number[];
    position: string
}

type modalType = "add-team" | "Edit"

interface getTeamsApi extends ApiType {
    data: {data: {data: teamType[], page: number, totalPage: number, totalUser: number}, success: boolean}
}

const TeamsManager = () => {
    const {teamRolesData, teamRolesDataStatus, teamData, teamDataStatus, getMoreTeamData, getProfileData} = useContext(dataContext)
    const {accountType} = useContext(appContext)
    const [searching, setSearching] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const skip = !searching
    const {data: teamSearchData, status: teamSearchStatus, error: teamDataError, refetch} = useGetTeamQuery<getTeamsApi>({search: searchInput}, {skip: skip})
    const [updateLoading, setUpdateLoading] = useState(false)
    const [updateRole] = useUpdateRoleMutation()
    const [loading, setLoading] = useState(false)
    const [createTeam] = usePostInviteTeamMutation()
    const rows = teamData
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const {modalOpen, closeModal: handleCloseModal, openModal: handleOpenModal} = useModal()
    const [modalType, setModalType] = useState("" as modalType)
    const [editDetails, setEditDetails] = useState<{role: number[], position: string, userId: string}>({
        userId: "",
        role: [],
        position: ""
    })
    const [createTeamDetails, setCreateTeamDetails] = useState<teamFormType>({
        firstName: "",
        lastName: "",
        email: "",
        role: [],
        position: ""
    })
    const roleOptions = [] as {value: string | number, name: string}[]
    teamRolesData?.map(item => roleOptions.push({value: item.id, name: item.name}))

    useEffect(() => {
        teamDataStatus === "rejected" && toast.error("Error occured Fetching data")
    },[teamDataStatus])

    useLayoutEffect(() => {
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


    const closeModal = () => {
        handleCloseModal()
        setCreateTeamDetails({
            firstName: "",
            lastName: "",
            email: "",
            role: [],
            position: ""
        })
    };

    const openModal = (string: modalType) => {
        handleOpenModal()
        setModalType(string)
    };
    
    const filteredRows = useMemo(() => {
        return rows?.filter(row =>
            row.firstName.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [rows, searchInput]);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        event.target.value === "" ? setSearching(false) : setSearching(true)
    },[]);
    
    const handleSetEditdetails = (data: teamType) => {
        // Create a new array of ids based on matching names
        const idArray = data.roles.map(str => {
            // @ts-ignore
            const foundObject = teamRolesData.find(obj => obj.name === str);
            return foundObject ? foundObject.id : null;
        }).filter(id => id !== null);  // Remove null values if no match was found
        // @ts-ignore
        setEditDetails({role: idArray, position: data.position, userId: data.userId})
    }

    const columns: GridColDef[] = useMemo(() => {
         const baseColumns: GridColDef[] = [
            {
                field: "name",
                flex: isLargeScreen ? 1 : undefined,
                width: isLargeScreen ? undefined : 200,
                headerName: "Name",
                renderCell: (params) => {
                    const { firstName, lastName } = params.row;
                    return <p>{firstName} {lastName}</p>;
                },
            },
            {
                field: "position",
                flex: isLargeScreen ? 1 : undefined,
                width: isLargeScreen ? undefined : 200,
                headerName: "Position",
            },
            {field: "role", 
                flex: isLargeScreen ? 1 : undefined, 
                width: isLargeScreen ? undefined : 200, 
                headerName: "Role",
                renderCell: (params) => {
                    const {roles} = params.row
                    return (
                        <div className="flex flex-col">
                            {roles?.map((item: string, i:number) => (
                                <div key={i} className=" my-auto h-4">
                                   <p className={`leading-3 ${roles.length === 1 ? "mt-8" : "mt-5"}`}>{item}</p>
                                </div>
                            ))}
                        </div>
                    )
                },

            },
        ];
        
        const shouldShowActions = (accountType === "manager" || accountType === "owner");

        if (shouldShowActions) {
            baseColumns.push({
                field: 'actions',
                headerName: 'Actions',
                renderCell: (params) => (
                    <div>
                        <TableActionsMenu options={[
                            <MenuItem onClick={() => (openModal("Edit"), handleSetEditdetails(params.row))} >Edit</MenuItem>,
                        ]} data={params} />
                    </div>

                    // <TableActionsMenu
                    //     options={[
                    //         <MenuItem
                    //             onClick={() => {
                    //                 openModal("Edit");
                    //                 console.log(params.row)
                    //                 handleSetEditdetails(params.row);
                    //             }}
                    //         >
                    //             Edit
                    //         </MenuItem>,
                    //     ]}
                    //     data={params}
                    // />
                ),
                flex: isLargeScreen ? 0.3 : undefined,
                width: isLargeScreen ? undefined : 120,
                sortable: false,
                filterable: false,
            });
        }
        return baseColumns;
    },[isLargeScreen]) 

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name as keyof teamFormType
        const value = e.target.value

        if (key === "role") {
            setCreateTeamDetails((prev) => {
                if (!prev.role.includes(Number(value))) {
                    return {
                        ...prev,
                        [key]: [...prev.role, Number(value)],
                    };
                }
                return prev;
            });
            return;
        }

        setCreateTeamDetails(prev => ({...prev, [key]: value}))
    }, [])

    const handleOnChangeEdit = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name
        const value = e.target.value

        if (key === "role") {
            setEditDetails((prev) => {
                if (!prev.role.includes(Number(value))) {
                    return {
                        ...prev,
                        [key]: [...prev.role, Number(value)],
                    };
                }
                return prev;
            });
            return;
        }

        setEditDetails(prev => ({...prev, [key]: value}))
    }, [])

    const handleRemoveRole = (roleToRemove: number, edit?: boolean) => {
        edit ?
            setEditDetails(prev => ({
                ...prev,
                role: prev.role.filter(role => role !== roleToRemove)
            }))
        : 
            setCreateTeamDetails(prev => ({
                ...prev,
                role: prev.role.filter(role => role !== roleToRemove)
            }));
    }

    const handleCreateTeam = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const {role, ...rest} = createTeamDetails        
        createTeam({...rest, roleIds: createTeamDetails.role}).unwrap()
            .then(fulfilled => {
                setLoading(false)
                toast.success("Invite Sent")
                closeModal()
            })
            .catch(rejected => {
                toast.error("Error occured")
                setLoading(false)
            })
    }

    
    const handleUpdateRolePosition = () => {
        const {role, ...rest} = editDetails
        setUpdateLoading(true)

        updateRole({...rest, roleIds: role}).unwrap()
            .then(fulfilled => {
                setUpdateLoading(false)
                toast.success("Updated")
                getProfileData()
                closeModal()
            })
            .catch(rejected => {
                setUpdateLoading(false)
                toast.error(rejected?.data?.message ?? "Error occured")
            })
    }  

    return (
        <div>
            <TeamsModal 
                modalOpen={modalOpen}
                modalType={modalType}
                closeModal={closeModal}
                loading={loading}
                updateLoading={updateLoading}
                handleCreateTeam={handleCreateTeam}
                handleOnChange={handleOnChange}
                handleOnChangeEdit={handleOnChangeEdit}
                handleRemoveRole={handleRemoveRole}
                handleUpdateRolePosition={handleUpdateRolePosition}
                editDetails={editDetails}
                createTeamDetails={createTeamDetails}
            />

            <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-[600] text-[#333333]">Team Management</h1>
                <div className="w-[140px]">
                    <Button onClick={() => openModal("add-team")} className="py-[6px] text-[13px]">Add New Team</Button>
                </div>
            </div>

            <br />

            <Table 
                loading={searching ? teamSearchStatus === "pending" : teamDataStatus === "pending"}
                getRowIdField="userId"
                fetchMoreData={getMoreTeamData}
                filteredRows={searching ? teamSearchData?.data?.data : rows}
                columns={columns}
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
            />
        </div>
    )
}

export default TeamsManager