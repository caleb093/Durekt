import DashboardLayout from "@/components/layouts/DashboardLayout"
import Search from "@/components/secondary/Search"
import Infoicon from "../../../public/svgs/info-icon.svg"
import { Checkbox } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { dataContext } from "@/components/contexts/dataContext"
import Loading from "@/components/secondary/LoadingSpinner"
import { useDeleteNotificationMutation, useGetMarkAllNotificationsQuery, usePatchMarkNotificationMutation, usePostDeleteManyNotificationMutation } from "../../../api-feature/apiSlice"
import toast from "react-hot-toast"
import Trashicon from "../../../public/svgs/trash-icon.svg"
import { ApiType, notificationsType } from "../../../api-feature/types"

interface markAllNotApiType extends ApiType {
    data: {data: {message: string}}
}

const Notifications = () => {
    const {notificationStatus, notificationsData} = useContext(dataContext)
    // const [data, setData] = useState(notificationsData)
    const [selected, setSelected] = useState<notificationsType[]>([])
    const [triggerFetch, setTriggerFetch] = useState(false);
    const {data, status, error, refetch} = useGetMarkAllNotificationsQuery<markAllNotApiType>(undefined, {skip: !triggerFetch})
    const [delelNotification] = usePostDeleteManyNotificationMutation()
    const [markNotification] = usePatchMarkNotificationMutation()
    const [searchText, setSearchText] = useState("")

    const filteredData = notificationsData?.filter(item => 
        (item?.title.toLowerCase().includes(searchText.toLocaleLowerCase()) || 
        item?.message?.toLowerCase().includes(searchText.toLocaleLowerCase()))
    )

    useEffect(() => {
        let toastId;
        if (status === "pending") {
            toastId = toast.loading("loading..")
        } 
        if (status === "fulfilled") {
            toast.dismiss(toastId)
            toast.success("Marked", {duration: 3000})
        }
        if (status === "rejected") {
            toast.dismiss(toastId)
            toast.error("Error occured")
        }
 
    },[status])

    const handleMarkAllRead = () => {
        !triggerFetch ? setTriggerFetch(true) : refetch()
    };

    const handleDeleteNotification = async () => {
        const Ids = [] as string[]

        selected.map(item => Ids.push(item.id))

        const toastId = toast.loading("Deleting..")
        try {
            await delelNotification({notificationIds: [...Ids]}).unwrap()
                .then(fulfilled => {
                    console.log(fulfilled)
                    toast.success("Deleted")
                })
                .catch(rejected => {
                    toast.error("Error occured")
                    console.error(rejected)
                })
        } catch (error) {
            toast.error("Error occured")
            console.error(error)
        } finally {
            toast.dismiss(toastId)
        }
    }

    const handleSelectNotification = (notification: notificationsType) => {
        console.log(notification);
        // Check if the notification is already in the skills array
        const isNotificationIncluded = selected?.some(item => item?.id === notification?.id);

        if (!isNotificationIncluded) {
            setSelected(prev => ([
                ...prev,
                notification
            ]));
        } else {
            // If the notification is included, remove it
            setSelected(prev => (prev?.filter(item => item?.id !== notification?.id)))
        }
    };
    
    const handleMarkNotification = async (id: string) => {
        try {
            await markNotification({id: id}).unwrap()
                .then(fulfilled => {
                    console.log(fulfilled)
                })
                .catch(rejected => {
                    console.error(rejected)
                })
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <DashboardLayout>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-[20px] font-[600] text-[#333333]">Notifications</h1>
                </div>

                <div className="mt-4 bg-white rounded-lg border px-4 py-5">
                    <div className="flex flex-col gap-3 mdx3:flex-row justify-between">
                        <Search className="bg-transparent w-full py-1 " containerClassName="round bg-[#F5F6FA]" placeholder="Seach Notification"  value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <div className="flex gap-2 ml-auto items-center">
                            <div className="flex bg-[#FAFBFD] border rounded-md border-[#D4D4D4] items-center">
                                {/* <Infoicon className="px-2 h-[34px] w-[34px] " /> */}
                                <button disabled={selected.length <= 0} onClick={handleDeleteNotification} className={`${selected.length <= 0 ? "text-black" : "text-red-600"} disabled:cursor-not-allowed cursor-pointer`}>
                                    <Trashicon className="px-2 h-[30px] w-[30px]  " />
                                </button>
                            </div>
                            <button onClick={handleMarkAllRead} className="px-3 py-1 border-[2px] border-[#667085] rounded-md text-[#667085] text-[11px]">Mark all as read</button>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col">
                        {notificationStatus === "fulfilled" && filteredData?.map(item => (
                            <div onClick={() => handleMarkNotification(item?.id)} className="flex flex-col mdx5:flex-row gap-1 mdx5:gap-5 items-start mdx5:items-center text-[14px] text-[#202224] border-b border-b-[#E0E0E0] py-2">
                                <div className="flex items-center">
                                    <Checkbox checked={selected.some(noti => noti?.id === item?.id)} onClick={() => handleSelectNotification(item)} />
                                    {!item?.read ? <div className="ml-3 h-[8px] w-[8px] rounded-full bg-blue-700" /> : <div className="ml-3 h-[8px] w-[8px] rounded-full bg-slate-500" />}
                                    <p className="font-[700] ml-4 ">{item?.title}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row flex-1 w-full justify-between">
                                    <p className="font-[400]">{item?.message}</p>
                                    {/* <p className="font-[600] ml-auto ">8:38 AM</p> */}
                                </div>
                            </div>
                        ))}
                        {(notificationStatus === "fulfilled" && filteredData?.length <= 0 ) && <p>No notifications Present</p>}
                        {notificationStatus === "pending" && <Loading />}
                        {notificationStatus === "rejected" && <p className="text-red-500 text-center">Error occured</p>}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Notifications