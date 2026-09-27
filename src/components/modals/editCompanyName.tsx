import { FC, useContext, useState } from "react";
import Input from "../primary/input";
import Modal from "../primary/Modal";
import useLoading from "../util/useLoading";
import Button from "../primary/Button";
import ActivityIndicator from "../secondary/ActivityIndicator";
import toast from "react-hot-toast";
import { usePostEditCompaniesNameMutation } from "../../../api-feature/apiSlice";
import { appContext } from "../contexts/appContext";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
    companyName: string;
    companyId: number
}

const EditCompanyName:FC<props> = ({modalOpen, closeModal, companyName, companyId}) => {
    const {loading, startLoading, stopLoading} = useLoading()
    const [name, setName] = useState(companyName)
    const {setUserProfile} = useContext(appContext)
    const [updateName] = usePostEditCompaniesNameMutation()

    const handleSubmit = async () => {
        try {
            startLoading()

            await updateName({name: name, id: Number(companyId)}).unwrap()
                .then(fulfilled => {
                    toast.success("Company updated")
                    setUserProfile(prev => ({...prev, company: {...prev.company, name: name}}))
                    closeModal()
                })
                .catch(rejected => {
                    toast.error(rejected?.data?.message ?? "error occured")
                })
        } catch(error) {
            toast.error("error occured")
        } finally {
            stopLoading()
        }
    }

    return (
        <Modal
            isOpen={modalOpen} 
            onClose={loading ? () => {} : closeModal} 
            className={"py-12 px-5"}
        >
            <Input
                label={<p>Company name</p>}
                placeholder="company name"
                // disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="companyName"
                type="text"
            />
            <Button disabled={loading} onClick={handleSubmit}>
                {loading ? <ActivityIndicator /> : "Update"}
            </Button>
        </Modal>
    )
}

export default EditCompanyName