import Modal from "../primary/Modal"
import Input from "../primary/input"
import Button from "../primary/Button"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopTimePicker, TimePicker } from "@mui/x-date-pickers"
import React, { FC, useCallback, useContext, useMemo, useState } from "react";
import { dataContext } from "../contexts/dataContext";
import { useGetTimezonesQuery, usePostScheduleMeetingMutation } from "../../../api-feature/apiSlice";
import toast from "react-hot-toast";
import ActivityIndicator from "../secondary/ActivityIndicator";
import dayjs, {Dayjs} from "dayjs";
import { isValidEmail } from "../util/helperFunctions";
import gsap from "gsap";
import { ApiType } from "../../../api-feature/types";
import useSearch from "../util/useSearch";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
    dealId: string;
}

interface formType {
    name: string,
    date: string,
    startTime: string,
    endTime: string,
    platform?: number,
    timezone: string,
    clientEmails: string[]
}

interface timezoneApi extends ApiType {
    data: {data: {alt: string, name: string}[], success: boolean}
}

const ScheduleMeetingModal:FC<props> = React.memo(({modalOpen, closeModal, dealId}) => {
    const [scheduleMeeting] = usePostScheduleMeetingMutation()
    const {data: timezoneData, status: timezoneStatus, error} = useGetTimezonesQuery<timezoneApi>()
    const [loading, setLoading] = useState(false)
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [startPickerOpen, setStartPickerOpen] = useState(false);
    const [endPickerOpen, setEndPickerOpen] = useState(false);
    const {platformData, platformStatus} = useContext(dataContext)
    const [meetingDetails, setMeetingDetails] = useState<formType>({
        name: "",
        platform: undefined,
        date: "",   
        startTime: "",
        endTime: "",
        timezone: "",
        clientEmails: [""]
    })
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);

    const {searchInput, handleSearchChange} = useSearch()

    const today = dayjs();

    const emailInputAni = () => {
        gsap.timeline({defaults: {duration: 0.3, ease: "power2"}})
            .from(".active-emailInput", {height: 0})
            .to(".active-emailInput", {height: 40})
    }

    const handleScheduleMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        for (let i = 0; i < meetingDetails?.clientEmails?.length; i++) {
            if (!isValidEmail(meetingDetails.clientEmails[i])) {
                toast.error("Invalid Email")
                return
            }
        }

        try {
            setLoading(true)
            const platform = platformData.find(item => item.id == meetingDetails.platform)?.name
            await scheduleMeeting(
                { id: dealId, body:{
                    title: meetingDetails.name, 
                    // @ts-ignore
                    platform: platform, 
                    scheduledTime: `${meetingDetails?.date} ${meetingDetails?.startTime}`, 
                    endTime: `${meetingDetails?.date} ${meetingDetails.endTime}`, 
                    timezone: meetingDetails.timezone, 
                    invite_mails: meetingDetails.clientEmails}
                }).unwrap()
                .then(fulfilled => {
                    toast.success("Meeting scheduled")
                    closeModal()
                    setMeetingDetails({
                        name: "",
                        platform: undefined,
                        date: "",   
                        startTime: "",
                        endTime: "",
                        timezone: "",
                        clientEmails: []
                    })
                })
                .catch(rejected => {
                    console.error(rejected)
                    toast.error(rejected?.data?.message ?? "Error occured")
                })
        } catch(error) {
            console.error(error)
            toast.error("Error occured")
        } finally {
            setLoading(false)
        }
    }

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name as keyof formType
        const value = e.target.value

        setMeetingDetails(prev => ({...prev, [key]: value}))
    }, [])

    const handleUpdateEmails = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { value } = e.target;

        // Update the features array immutably
        const updatedEmails = meetingDetails?.clientEmails.map((feature, ind) =>
            ind === index ? value : feature
        );

        // Update the state with the new features array
        setMeetingDetails((prev) => ({
            ...prev,
            clientEmails: updatedEmails,
        }));
    };

    const handleDeleteEmail = (index: number) => {
        setMeetingDetails(prev => ({...prev, clientEmails: prev.clientEmails.filter((item, ind) => ind !== index)}))
    }

    // For double digits
    const padWithZero = (value: number) => String(value).padStart(2, '0');

    const timezoneOptions = useMemo(() => {
        return timezoneData?.data?.map((item) => ({ value: item.name, name: item.name })) || [];
    }, [timezoneData]);

    const timezoneLabel = useMemo(() => (
        <label 
            className="text-[#333333] font-medium text-[1em] flex gap-3"
        >
            Timezone 
            {timezoneStatus === "pending" && <div className="scale-[0.6] origin-left"><ActivityIndicator color="black" /></div>}
            {timezoneStatus === "rejected" && <span className="text-[12px] text-red-600 italic">error occured</span>}
        </label>
    ),[timezoneStatus])

    const meetingNameLabel = useMemo(() => (
        <label className="text-[#333333] font-medium text-[0.9em]">Meeting Name</label>
    ), []);


    const platformLabel = useMemo(() => (
        <label className="text-[#333333] font-medium text-[1em] flex gap-3">
            Platform 
            {platformStatus === "pending" && <div className="scale-[0.6] origin-left"><ActivityIndicator color="black" /></div>}
            {platformStatus === "rejected" && <span className="text-[12px] text-red-600 italic">error occured</span>}
        </label>
    ), [platformStatus]);

    
    const platformOptions = useMemo(() => {
        return platformData?.map((item) => ({ value: item.id, name: item.name })) || [];
    }, [platformData]);

    return (
        <Modal
            isOpen={modalOpen}
            onClose={(loading ? () => {} : closeModal)}
            closeOnClickOutside={false}
            className={"overflow-y-scroll max-h-[80vh]"}
        >
            <form onSubmit={handleScheduleMeeting} className="pt-7 pb-12 px-6 sm:px-14">
                <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Schedule Meeting</p>
                <Input 
                    className="mb-[15px]"
                    value={meetingDetails.name}
                    onChange={handleOnChange}
                    inputClassname="p-4"
                    label={meetingNameLabel} 
                    placeholder="Enter name"
                    type="text"
                    name="name"
                />
                <Input 
                    select
                    options={platformOptions}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    className="mb-0 text-[#333333] text-[14px]"
                    inputClassname="p-4"
                    // @ts-ignore
                    value={meetingDetails?.platform}
                    onChange={handleOnChange}
                    label={platformLabel} 
                    placeholder="Select Platform"
                    type="text"
                    name="platform"
                />
                <Input 
                    select
                    options={timezoneOptions}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    className="mb-0 text-[#333333] text-[14px]"
                    inputClassname="p-4"
                    // @ts-ignore
                    value={meetingDetails?.timezone}
                    onChange={handleOnChange}
                    label={timezoneLabel} 
                    placeholder="Select Timezone"
                    type="text"
                    name="timezone"
                />
                <div className="mt-[-0.4em]">
                    <label className="text-[#333333] font-medium text-[0.9em]">Date</label>
                    <div onClick={() => setDatePickerOpen(prev => !prev)}>
                        <DatePicker
                            sx={{ padding: 0, width: '100%', marginTop: '3px' }}
                            minDate={today} 
                            open={datePickerOpen}
                            onChange={(val) => {
                                // @ts-ignore
                                const year = val?.$y;
                                // @ts-ignore
                                const month = padWithZero(val?.$M + 1); // $M is zero-indexed, so we add 1
                                // @ts-ignore
                                const day = padWithZero(val?.$D);
                                setMeetingDetails((prev) => ({
                                ...prev,
                                date: `${year}-${month}-${day}`,
                                }));
                            }}
                        />
                    </div>
                </div> 

                <div className="flex gap-2">
                    <div className="mt-4 flex-[1]">
                        {/* <label className="text-[#333333] font-medium text-[0.9em]">Start Time</label> */}
                        <div>
                            <DesktopTimePicker
                                sx={{ padding: 0, width: '100%', marginTop: '3px' }}
                                label="Start Time"
                                value={startTime}
                                onChange={(val) => {
                                    setStartTime(val);
                                    // @ts-ignore
                                    const hours = padWithZero(val?.$H);
                                    // @ts-ignore
                                    const minutes = padWithZero(val?.$m);
                                    setMeetingDetails((prev) => ({
                                        ...prev,
                                        startTime: `${hours}:${minutes}`,
                                    }));
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex-[1]">
                    {/* <label className="text-[#333333] font-medium text-[0.9em]">End Time</label> */}
                    <div >
                        <DesktopTimePicker
                            sx={{ padding: 0, width: "100%", marginTop: "3px" }}
                            label="End Time"
                            value={endTime}
                            onError={(err, value) => console.log(err)}
                            disabled={!startTime} // Disable until start startTime is selected
                            minTime={startTime || undefined} // Prevent selecting a startTime before start startTime
                            onChange={(val) => {
                                setEndTime(val)
                                // @ts-ignore
                                const hours = padWithZero(val?.$H);
                                // @ts-ignore
                                const minutes = padWithZero(val?.$m);
                                setMeetingDetails((prev) => ({
                                    ...prev,
                                    endTime: `${hours}:${minutes}`,
                                }));
                            }}
                            closeOnSelect={false}
                        />
                    </div>
                </div>

                <div className="mt-4 flex-[1]">
                    <label className="text-[#333333] font-medium text-[0.9em] flex items-center gap-1">Client Emails <span className="text-red-600">*</span></label>
                    {meetingDetails?.clientEmails?.map((item, i) => (
                        <div className="relative">
                            <Input 
                                className={`mb-[5px] emailInput ${(i+1) === meetingDetails.clientEmails.length  && "active-emailInput"}`}
                                value={item}
                                onChange={(e) => handleUpdateEmails(e, i)}
                                label={<></>}
                                placeholder={`Email ${i + 1}`}
                                type="email"
                                name="email"
                            />
                            <p onClick={() => handleDeleteEmail(i)} className="cursor-pointer absolute z-[2] top-[16px] right-3 text-[12.5px] italic text-red-500">Delete</p>
                            <p className="text-[11px] text-red-600 italic">{isValidEmail(item) ? "" : "Invalid Email"}</p>
                        </div>
                    ))}
                    <p onClick={() => (emailInputAni(), setMeetingDetails(prev => ({...prev, clientEmails: [...prev.clientEmails, ""]})))} className="cursor-pointer text-white bg-[#B3387F] px-[6.5px] ml-auto mt-5 w-max rounded-full"><p className="scale-[1.4] ">+</p></p>
                </div>

                <Button disabled={!meetingDetails.date || !meetingDetails.name || !meetingDetails.startTime || !meetingDetails.endTime || !meetingDetails?.clientEmails[0] || loading} type="submit" className="mt-5 h-[2.68em] disabled:bg-slate-600" >
                    {loading ? <ActivityIndicator /> : "Save"}
                </Button>
            </form>
        </Modal>
    )
})

export default ScheduleMeetingModal