import AttachmentIcon from "../../../../public/svgs/attach-icon.svg"
import SendIcon from "../../../../public/svgs/send-icon.svg"
import MoreIcon from "../../../../public/svgs/more-icon.svg"
import { FC, LegacyRef, useContext, useRef, useState } from "react"
import { useDeleteNoteMutation, usePostCreateNoteMutation, usePostEditNoteMutation } from "../../../../api-feature/apiSlice"
import toast from "react-hot-toast"
import { APISTATUS } from "../../../../api-feature/types"
import Loading from "@/components/secondary/LoadingSpinner"
import { notesType } from "../../../../api-feature/manager-owner/deals/deal-type"
import { formatDateAndTime } from "@/components/util/helperFunctions"
import Dropdown from "@/components/secondary/Dropdown"
import DropdownItem from "@/components/secondary/DropdownItem"
import { appContext } from "@/components/contexts/appContext"

interface props {
    notesData: notesType[];
    dealId: number;
    loading: boolean;
    error: boolean;
}

const DealNotes:FC<props> = ({notesData, dealId, loading: getLoading, error}) => {
    const [note, setNote] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { userProfile } = useContext(appContext)
    const [createNote] = usePostCreateNoteMutation()
    const [editNote] = usePostEditNoteMutation()
    const [deleteNote] = useDeleteNoteMutation()
    const [openDropdown, setOpenDropdown] = useState(null)
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState<{isEditing: boolean, note: string, id?: number}>({
        isEditing: false,
        note: "",
        id: undefined
    })

    console.log(userProfile)

    const dateAndTime = (dateString: string) => {
        const {time, date} = formatDateAndTime(dateString)
        return `${time} ${date}`
    }

    const closeDropDown = () => {
        setOpenDropdown(null)
    }

    const handleDropDown = (id: number) => {
        // @ts-ignore
        setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown for clicked item
    };

    const handleSubmitNote = async () => {
        const toastId = toast.loading("loading")
        
        try {
            setLoading(true)

            await createNote({message: note, id: dealId}).unwrap()
                .then(fulfilled => {
                    setNote("")
                    toast.success("Note Updated")
                })
                .catch(rejected => {
                    toast.error("Error occured")
                })
        } catch(error) {
            toast.error("Error occured")
        } finally {
            toast.dismiss(toastId)
            setLoading(false)
        }
    }

    const handleUpdateNote = async () => {
        const toastId = toast.loading("updating")
        console.log(editing)
        try {
            setLoading(true)

            await editNote({message: editing.note, dealId: dealId, noteId: Number(editing?.id)}).unwrap()
                .then(fulfilled => {
                    setNote("")
                    toast.success("Note Edited")
                    setEditing({isEditing: false, note: "", id: undefined})
                })
                .catch(rejected => {
                    toast.error("Error occured")
                })
        } catch(error) {
            toast.error("Error occured")
        } finally {
            toast.dismiss(toastId)
            setLoading(false)
        }
    }

    const handleDeleteNote = async (id: number) => {
        const toastId = toast.loading("deleting")
        try {
            setLoading(true)

            await deleteNote({dealId: dealId, noteId: id}).unwrap()
                .then(fulfilled => {
                    setNote("")
                    toast.success("Note Deleted")
                })
                .catch(rejected => {
                    toast.error("Error occured")
                })
        } catch(error) {
            toast.error("Error occured")
        } finally {
            toast.dismiss(toastId)
            setLoading(false)
        }
    }

    const handleStartEditing = (id: number, note: string) => {
        setEditing({isEditing: true, note: note, id: id})        
        inputRef?.current?.focus()
    }
     
    return (
        <div className="bg-white flex flex-col border pt-6 h-[70vh] sm:h-[75vh] relative">
            {editing.isEditing && 
                <p 
                    onClick={() => {setEditing({isEditing: false, note: "", id: undefined})}} 
                    className="absolute cursor-pointer top-2 right-4 z-[2] text-[12px] bg-red-600 text-white px-2 py-[3px] rounded-xl flex items-center"
                >
                    <p className="bg-red-400 px-[6px] origin-left rounded-full scale-[0.7]">x</p> 
                    Stop Editing
                </p>
            }

            <div className="flex flex-col gap-4 p-3 overflow-auto h-full">
                {getLoading && <Loading />}
                {error && <p className="text-red-500 italic text-center">An Error Occured</p>}
                {(!loading && !error && !getLoading) && notesData.length <= 0 && <p>No notes Available</p>}
                {(!getLoading && !error) && notesData?.map((item, i) => (
                    <div className="flex w-full rounded-lg flex-shrink-0 bg-[#6FA9E21A] px-2 pt-2 pb-4 gap-3 relative">
                        {userProfile?.id === item?.user?.id && <div onClick={() => handleDropDown(i)} className=" absolute right-4 rotate-[90deg] scale-[0.8] py-2 cursor-pointer">
                            <MoreIcon  />
                        </div>}
                        <div className="bg-slate-600 flex-shrink-0 h-8 w-8 rounded-full"></div>
                        <div>
                            <div className="flex flex-col sm:flex-row sm:gap-8 mb-2 items-start sm:items-center ">
                                <p className=" text-[#333333] text-[18px] font-[500]">{item?.user?.firstName} {item?.user?.lastName}</p>
                                <p className="text-[#6D6D6D] text-[13.5px] font-[500]">{dateAndTime(item?.updatedAt)}</p>
                            </div>
                            <p className="text-[#6D6D6D] font-[400] text-[15px] w-[95%]">{item?.message}</p>
                        </div>
                        <Dropdown className="right-0 ml-auto mt-1 z-[2]" isOpen={openDropdown === i}>
                            <DropdownItem onClick={() => (handleStartEditing(item?.id, item.message), closeDropDown())} text="Edit" />
                            <DropdownItem onClick={() => (closeDropDown(), handleDeleteNote(item?.id))} text="Delete" />
                        </Dropdown>
                    </div>
                ))}
            </div>
            <div className="bg-white flex items-center gap-3 border-t mt-auto p-3">
                <AttachmentIcon />
                <div className="flex w-full relative">
                    <button
                        disabled={loading} 
                        onClick={editing.isEditing ? handleUpdateNote : handleSubmitNote} 
                        className=" disabled:cursor-not-allowed"
                    >
                        <SendIcon className="absolute right-4 bottom-2 cursor-pointer text-[#0073E6]"/>
                    </button>
                    <input 
                        ref={inputRef}
                        className="bg-[#F8F9FD] w-full px-4 py-2 rounded-3xl" 
                        type="text" 
                        value={editing.isEditing ? editing.note : note}
                        onChange={(e) => editing.isEditing ? setEditing(prev => ({...prev, note: e.target.value})) : setNote(e.target.value)}
                        placeholder="Type your message here..." 
                    />
                </div>
            </div>
        </div>  
    )
}

export default DealNotes