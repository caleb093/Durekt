import Modal from "../primary/Modal"
import Input from "../primary/input"
import Button from "../primary/Button"
import { FC, useContext } from "react";
import ActivityIndicator from "../secondary/ActivityIndicator";
import { dataContext } from "../contexts/dataContext";
import { teamFormType as formType } from "../dashboard/manager/teams-manager";
import Xicon from "../../../public/svgs/x-icon.svg"
import useSearch from "../util/useSearch";

type modalType = "add-team" | "Edit"

interface props {
    modalOpen: boolean;
    modalType: modalType;
    closeModal: () => void;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleOnChangeEdit: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleCreateTeam: (e:React.FormEvent<HTMLFormElement>) => void;
    handleRemoveRole: (roleToRemove: number, edit?: boolean) => void;
    createTeamDetails: formType;
    loading: boolean;
    updateLoading: boolean;
    handleUpdateRolePosition: () => void;
    editDetails: {role: number[], position: string, userId: string}
}

const TeamsModal:FC<props> = ({modalOpen, modalType, updateLoading, handleOnChangeEdit, handleUpdateRolePosition, editDetails, loading, closeModal, handleRemoveRole, handleOnChange, handleCreateTeam, createTeamDetails}) => {
    const {teamRolesData} = useContext(dataContext)
    const {searchInput, handleSearchChange} = useSearch()

    const roleOptions = [] as {value: string | number, name: string}[]
    teamRolesData?.map(item => roleOptions.push({value: item.id, name: item.name}))

    return (
         <Modal
                isOpen={modalOpen}
                onClose={(loading || updateLoading) ? () => {} : closeModal}
            >
                {modalType === "add-team" && <form onSubmit={handleCreateTeam} className="pt-7 pb-12 px-6 sm:px-14">
                <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Create New Team</p>
                <Input 
                    className="mb-[8px]"
                    value={createTeamDetails.firstName}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">First Name</label>} 
                    placeholder="Enter name"
                    type="text"
                    name="firstName"
                />
                <Input 
                    className="mb-[8px]"
                    value={createTeamDetails.lastName}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Last Name</label>} 
                    placeholder="Enter name"
                    type="text"
                    name="lastName"
                />
                <Input 
                    className="mb-[8px]"
                    value={createTeamDetails.email}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Email</label>} 
                    placeholder="Enter email"
                    type="email"
                    name="email"
                />
                <Input 
                    className="mb-[8px]"
                    value={createTeamDetails.position}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Position</label>} 
                    placeholder="Enter team position e.g Project Manager"
                    type="text"
                    name="position"
                />
                <Input 
                    select
                    className="mb-[8px]"
                    value=""
                    // value={createTeamDetails.position}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    onChange={handleOnChange}
                    options={roleOptions}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Role</label>} 
                    placeholder="Enter Role"
                    type="text"
                    name="role"
                />
                <div className="flex gap-2 flex-wrap"> 
                    {createTeamDetails.role.map(itemValue => (
                        <p className="bg-[#C3278126] flex items-center gap-3 py-1 px-3 rounded-3xl text-[14px] text-[#333333]"><span className=" -translate-y-[1px]">{teamRolesData.find(item => item.id === Number(itemValue))?.name}</span> <Xicon onClick={() => handleRemoveRole(itemValue)} className="scale-[0.8]" /></p>
                    ))}
                </div>
                <Button 
                    disabled={loading || (!createTeamDetails.firstName || !createTeamDetails.lastName || !createTeamDetails.email || !createTeamDetails.position || createTeamDetails.role.length === 0 )} 
                    type="submit" 
                    className="disabled:bg-slate-600 mt-3 h-10"
                >
                    {loading ? <ActivityIndicator /> : "Save"}
                </Button>
            </form>}
            {modalType === "Edit" && 
                <div className="pt-7 pb-12 px-6 sm:px-14">
                    <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Edit Role and Permissions</p>
                    <Input 
                        className="mb-[8px]"
                        value={editDetails.position}
                        onChange={handleOnChangeEdit}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Position</label>} 
                        placeholder="Enter team position e.g Project Manager"
                        type="text"
                        name="position"
                    />
                    <Input 
                        select
                        className="mb-[8px]"
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        value=""
                        onChange={handleOnChangeEdit}
                        options={roleOptions}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Role</label>} 
                        placeholder="Select Role"
                        type="text"
                        name="role"
                    /> 
                    <div className="flex gap-2 flex-wrap">
                        {editDetails?.role?.map(itemValue => (
                            <p className="bg-[#C3278126] flex items-center gap-3 py-1 px-3 rounded-3xl text-[14px] text-[#333333]"><span className=" -translate-y-[1px]">{teamRolesData.find(item => item.id === Number(itemValue))?.name}</span> <Xicon onClick={() => handleRemoveRole(itemValue, true)} className="scale-[0.8]" /></p>
                        ))}
                    </div>
                    <Button onClick={handleUpdateRolePosition} disabled={updateLoading || !editDetails.position || editDetails.role.length <= 0} type="submit" className="mt-3 disabled:cursor-not-allowed disabled:bg-slate-600 h-10">
                        {updateLoading ? <ActivityIndicator /> : "Save"}
                    </Button>
                </div>
            }

        </Modal>
    )
}

export default TeamsModal