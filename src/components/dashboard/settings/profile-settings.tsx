import Button from "@/components/primary/Button"
import Input from "@/components/primary/input"
import { ReactEventHandler, useState, useContext, FC, useRef } from "react"
import { isStrongPassword } from "@/components/util/helperFunctions"
import { appContext } from "@/components/contexts/appContext"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"
import { profileType } from "../../../../api-feature/types"
import toast from "react-hot-toast"
import UserIcon from "../../../../public/svgs/user-icon.svg"
import EditIcon from "../../../../public/svgs/edit-icon.svg"
import { usePostUpdateProfileMutation, usePostUpdateProfileImageMutation, globalState, BASE_URL, useChangePasswordMutation } from "../../../../api-feature/apiSlice"
import Modal from "@/components/primary/Modal"
import useModal from "@/components/util/useModal"
import useImageUpload from "@/components/util/useImageUpload"
import useLoading from "@/components/util/useLoading"
import Image from "next/image"
import axios from "axios"
import { dataContext } from "@/components/contexts/dataContext"

interface props {
    data: profileType
}

const ProfileSettings:FC<props> = ({data}) => {
    const {getProfileData} = useContext(dataContext)
    const [changePassword] = useChangePasswordMutation()
    const CURRENTDETAILS = {firstName: data?.firstName, lastName: data?.lastName}
    const inputRef = useRef(null)
    const {modalOpen, closeModal, openModal} = useModal()
    const {loading: imageLoading, startLoading, stopLoading} = useLoading()
    const {selectedImage, handleSelectImage, imageFile, fileIsTooLarge} = useImageUpload()
    const [updateDetails] = usePostUpdateProfileMutation()
    const [updadeProfileImage] = usePostUpdateProfileImageMutation()
    const [requestStatus, setRequestStatus] = useState("idle" as "idle" | "pending");
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [otherSettings, setOtherSettings] = useState({language: "", notification: "on"})
    const [passwordsMatch, setPassWordsMatch] = useState(true)
    const [details, setDetails] = useState({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        // phone: data?.phone
    })
    const [passwordsDetails, setPasswordDetails] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleUpdateDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {value, name} = e.target
        setDetails(prev => ({...prev, [name]: value}))
    }

    const updatePasswordDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {value, name} = e.target
        setPasswordDetails(prev => ({...prev, [name]: value}))
    }

    const handleUpdateImage = async () => {
        if (requestStatus === "idle") {
            try {
                startLoading()
                setRequestStatus("pending")
                await updadeProfileImage({profilePicture: imageFile}).unwrap()
                    .then(fulfilled => {
                        toast.success("Image Uploaded")
                        getProfileData()
                        closeModal()
                    })
                    .catch(rejected => {
                        toast.error("Error occured")
                    })
            } catch(error) {
                toast.error("Error occured")
            } finally {
                setRequestStatus("idle")
                stopLoading()
            }
        }
    }

    const submitUpdateDetails = async () => {
        if (requestStatus === "idle") {
            try {
                setRequestStatus("pending")
                setDetailsLoading(true)
                await updateDetails({first_name: details.firstName, last_name: details.lastName}).unwrap()
                    .then(fulfilled => {
                        toast.success("Details Updated")
                        getProfileData()
                    })
                    .catch(rejected => {
                        toast.error("Error occured")
                    })
            } catch(error) {
                toast.error("Error occured")
            } finally {
                setRequestStatus("idle")
                setDetailsLoading(false)
            }
        }
    }

    const handleSubmitPassword = async () => {
        if (passwordsDetails.newPassword !== passwordsDetails.confirmPassword) {
            setPassWordsMatch(false)
            return
        } else {
            setPassWordsMatch(true)
        }

        if (!isStrongPassword(passwordsDetails.newPassword)) {
            toast.error("Password must be at least 6 characters long and contain a capital letter, number and a special character", {duration: 5000})
            return
        }

        if (requestStatus === "idle") {
            try {
                setRequestStatus("pending")
                setPasswordLoading(true)
                await changePassword({currentPassword: passwordsDetails.currentPassword, newPassword: passwordsDetails.newPassword}).unwrap()
                    .then(fulfilled => {
                        setPasswordDetails({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                        })
                        toast.success("Password Updated")
                    })
                    .catch(rejected => {
                        console.error(rejected)
                        toast.error(rejected?.data?.message ? rejected?.data?.message : "Error Occured")
                    })
            } catch(error) {
                console.error(error)
                toast.error("endpoint unavailable")
            } finally {
                setRequestStatus("idle")
                setPasswordLoading(false)
            }
        }

    }

    return (
        <div>
            <Modal isOpen={modalOpen} onClose={imageLoading ? () => {} : closeModal}>
                <div className="py-14 px-5 flex flex-col gap-5 items-center justify-center">
                    <input 
                        ref={inputRef}
                        type="file" 
                        className="hidden "
                        accept="image/*"
                        onChange={handleSelectImage}
                    />
                    {selectedImage ?
                        // @ts-ignore
                        <div className="relative" onClick={() => inputRef.current?.click()}>
                            <Image
                                width={5000}
                                height={5000}
                                src={selectedImage}
                                alt="selected apartment"
                                className={" w-[250px] h-[250px] z-[5] contain"}
                            />
                        </div> :
                        // @ts-ignore
                        <div onClick={() => inputRef.current?.click()} className="border-dashed border-black border w-full h-[250px] items-center justify-center flex">
                            <p>Select Image</p>
                        </div>
                    }
                    {fileIsTooLarge && (
                        <p className="text-[12px] text-red-700 text-center ">
                            ❗File is too large
                        </p>
                    )}

                    <Button className="h-[2.64em]" onClick={handleUpdateImage}>{imageLoading ? <ActivityIndicator /> : "Upload Image"}</Button>
                </div>
            </Modal>
            <div style={{boxShadow: "0px 0px 8px 1px rgba(187, 185, 185, 0.25)"}} className="bg-white px-5 sm:px-7 py-6 mb-6 rounded-md text-left ">
                <div className="w-[100px] h-[100px] relative mx-auto">
                    <div className="rounded-full overflow-hidden border w-full h-full" onClick={openModal}>
                        {/* @ts-ignore */}
                        {data?.url ? <Image src={data?.url} alt="profile img" height={5000} width={5000} /> : <UserIcon className="scale-[1.17]" />}
                    </div>
                    <EditIcon className="absolute right-0 z-[2] bottom-0 bg-slate-200 rounded-xl" />
                </div>

                <div className="mt-5 text-[14px]">
                    <div className="flex flex-col mdx2:flex-row justify-between gap-1 mdx2:gap-5 mdx5:gap-10">
                        <Input 
                            disabled={detailsLoading}
                            label={<p className="text-[#8A8A8A]">First name</p>} 
                            value={details.firstName} onChange={handleUpdateDetails} 
                            placeholder="first name" 
                            type="text" 
                            name="firstName"  
                        />
                        <Input 
                            disabled={detailsLoading}
                            label={<p className="text-[#8A8A8A]">Last name</p>} 
                            value={details.lastName} 
                            onChange={handleUpdateDetails} 
                            placeholder="last name" 
                            type="text" 
                            name="lastName"  
                        />
                    </div>
                    <div className="flex flex-col mdx2:flex-row justify-between gap-1 mdx2:gap-5 mdx5:gap-10">
                        <Input 
                            label={<p className="text-[#8A8A8A]">Email</p>} 
                            className="disabled: text-slate-400" 
                            disabled 
                            value={details.email} 
                            onChange={() => {}} 
                            placeholder="Email" 
                            type="email" 
                            name="email"  
                        />
                        {/* <Input 
                            label={<p className="text-[#8A8A8A]">Phone</p>} 
                            className="disabled: text-slate-400" 
                            disabled 
                            value={details.phone ?? "null"} 
                            onChange={() => {}} 
                            placeholder="Phone Number" 
                            name="phone"  
                        /> */}
                    </div>
                    <div className="w-[170px]">
                        <Button 
                            onClick={submitUpdateDetails} 
                            disabled={(CURRENTDETAILS.firstName === details.firstName && CURRENTDETAILS.lastName === details.lastName) || requestStatus !== "idle"} 
                            className="text-[15px] rounded-md h-[2.64em]"
                        >
                            {detailsLoading ? <ActivityIndicator /> : "Save"}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-white px-5 sm:px-7 py-6 mb-6 rounded-md text-left ">
                <h2 className="text-[#333333] text-[18px] ">Change Password</h2>
                <p className="text-[#333333] mt-1">Minimum 8 Characters, Including one Number, One Special Characters </p>

                <div className="text-[14px] mt-3">
                    <div className="flex flex-col mdx2:flex-row justify-between gap-1 mdx2:gap-5 mdx5:gap-10">
                        <Input 
                            label={<p className="text-[#8A8A8A]">Current password</p>} 
                            value={passwordsDetails.currentPassword} 
                            onChange={updatePasswordDetails} 
                            placeholder="Enter current password" 
                            type="password" 
                            name="currentPassword"  
                        />
                        <Input 
                            label={<p className="text-[#8A8A8A]">New password</p>} 
                            value={passwordsDetails.newPassword} 
                            onChange={updatePasswordDetails} 
                            placeholder="Enter new password" 
                            type="password" 
                            name="newPassword"  
                        />
                    </div>
                    <div className="flex flex-col mdx2:flex-row justify-between gap-1 mdx2:gap-5 mdx5:gap-10">
                        <Input 
                            className="flex-1" 
                            label={<p className="text-[#8A8A8A]">Confirm password</p>} 
                            value={passwordsDetails.confirmPassword} 
                            onChange={updatePasswordDetails} 
                            placeholder="Confirm password" 
                            type="password" 
                            name="confirmPassword"  
                        />
                        <div className="flex-1"></div>
                    </div>
                    {!passwordsMatch && <p className="mr-auto mb-2 text-[0.9em] italic text-red-600">Passwords don't match</p>}

                    <div className="w-[170px]">
                        <Button 
                            onClick={handleSubmitPassword} 
                            disabled={(!passwordsDetails.currentPassword || !passwordsDetails.confirmPassword) || requestStatus !== "idle"} 
                            className="text-[15px] rounded-md disabled:bg-slate-600 h-[2.60em]"
                        >
                            {passwordLoading ? <ActivityIndicator /> : "Confirm and change"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* <div className="bg-white px-5 sm:px-7 py-6 mb-6 rounded-md text-left ">
                <h2 className="text-[#333333] text-[18px]">Other Settings</h2>

                <div className="text-[14px] mt-3">
                    <div className="flex flex-col mdx2:flex-row justify-between gap-1 mdx2:gap-5 mdx5:gap-10">
                        <Input 
                            select 
                            options={[{value: 1, name:"English"}, {value: 2, name: "French"}, {value: 3, name: "spanish"}]} 
                            label={<p className="text-[#8A8A8A]">Language</p>} 
                            value={otherSettings.language}
                            onChange={(e) => setOtherSettings(prev => ({...prev, language: e.target.value}))} 
                            placeholder="Select language" 
                            name="language"  
                        />
                        <Input 
                            select 
                            options={[{value: 1, name: "on"}, {value: 2, name: "off"}]} 
                            label={<p className="text-[#8A8A8A]">Notifications</p>} 
                            value={otherSettings.notification} 
                            onChange={(e) => (setOtherSettings(prev => ({...prev, notification: e.target.value})))} 
                            placeholder="choose notification" 
                            name="notifications"  
                        />
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default ProfileSettings