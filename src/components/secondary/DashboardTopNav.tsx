import HelpIcon from "../../../public/svgs/help-icon.svg"
import NotificationIcon from "../../../public/svgs/Notification 2.svg"
import DropdownIcon from "../../../public/svgs/dropdown-icon.svg"
import Search from "./Search"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import gsap from "gsap"
import Dropdown from "./Dropdown"
import Modal from "../primary/Modal"
import Logo from "../primary/Logo"
import FaqUI from "./FaqUI"
import Input from "../primary/input"
import Button from "../primary/Button"
import SideNav from "./SideNav"
import DropdownItem from "./DropdownItem"
import UserIcon from "../../../public/svgs/user-icon.svg"
import { profileType, TOKEN_NAME } from "../../../api-feature/types"
import { appContext } from "../contexts/appContext"
import { globalState, usePostCreateEnquiresMutation } from "../../../api-feature/apiSlice"
import { apiSlice } from "../../../api-feature/apiSlice"
import { useDispatch } from "react-redux"
import Image from "next/image"
import useLoading from "../util/useLoading"
import toast from "react-hot-toast"
import ActivityIndicator from "./ActivityIndicator"
import { dataContext } from "../contexts/dataContext"

const TopNav = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState("")
    const {loading, startLoading, stopLoading} = useLoading()
    const [createEnquiry] = usePostCreateEnquiresMutation()
    const {notificationsData} = useContext(dataContext)
    const {setLoggedIn, setUserProfile, userProfile} = useContext(appContext)
    const [openNav, setOpenNav] = useState(false)
    const [displayDropDown, setDisplayDropDown] = useState(false)
    const [helpDropDown, setHelpDropdown] = useState(false)
    const router = useRouter()
    const routeName = router.pathname.split('/').slice(2).join('/')
    const [contactDetails, setContactDetails] = useState({
        // firstName: "",
        // lastName: "",
        email: userProfile?.email,
        subject: "",
        description: ""
    })

    const [modalOpen, setModalOpen] = useState({display: false, type: ""} as {display: boolean, type: "" | "faq" | "support"})

    const closeModal = () => {
        setModalOpen({display: false, type: "" });
    };

    const openModal = (type: "" | "faq" | "support") => {
        setModalOpen({display: true, type: type });
    };

    const handleCreateEnquiry = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startLoading()
        try {
            await createEnquiry({...contactDetails}).unwrap()
                .then(fulfilled => {
                    toast.success("Enquiry sent")
                    closeModal()
                    setContactDetails({
                        email: userProfile?.email,
                        subject: "",
                        description: "" 
                    })
                })
                .catch(rejected => {
                    console.error(rejected)
                    toast.error("Error occured")
                })
        } catch (error) {
            toast.error("Error occured")
            console.error(error)
        } finally {
            stopLoading()
        }
    }

    const toggleNav = () => {
        const openAnim = gsap.timeline()
            .to(".phone-nav", {y: 0})
            .to(".hamburger-line-top", {rotate: "45deg", y: 1, height: "2px"}, "<")
            .to(".hamburger-line-bottom", {rotate: "-45deg", y: "-5.5px", height: "2px"}, "<")

        const closeAnim = gsap.timeline()
            .to(".phone-nav", {y: "-100%"})
            .to(".hamburger-line-top", {rotate: "0deg", y: 0, height: "1.5px"}, "<")
            .to(".hamburger-line-bottom", {rotate: "0deg", y: 0, height: "1.5px"}, "<")

        openNav && openAnim.play()
        !openNav && closeAnim.reverse()
        
        setOpenNav(prev => !prev)
    }

    const handleDropDown = () => {
        setHelpDropdown(false)
        setDisplayDropDown(prev => !prev)
    }

    const handleHelpDropdown = () => {
        setDisplayDropDown(false)
        setHelpDropdown(prev => !prev)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value
        setContactDetails(prev => ({...prev, [name]: value}))
    }

    const handleLogout = () => {
        setLoggedIn(false)
        setUserProfile({} as profileType)
        globalState.authorizationToken = ""
        globalState.account_type = ""
        localStorage.removeItem(TOKEN_NAME)

        // Clear RTK Query cache
        dispatch(apiSlice.util.resetApiState())

        router.push("/onboarding")
    }

    const isNewNotification = notificationsData?.some(item => item.read === false)

    const faqContent = 
        <>
            <Search value={searchValue} className="bg-transparent w-full py-2 " showIcon containerClassName="round mb-7 bg-white" onChange={(e) => setSearchValue(e.target.value)} placeholder="search" />
            <div className="w-full h-1 bg-[#F8F8FA] relative z-[3] "></div>
            <FaqUI 
                viewAll
                searchTerm={searchValue}
                className="border-none mt-0" 
                detailsClassName="text-[#333333] text-[13px] mt-0 "
                containerStyle={{
                    translate: "0px -2px",
                    borderRadius: 0,
                    padding: 0,
                    backgroundColor: "transparent",
                    borderBottom: "1px solid #C4C6C8CC",
                    boxShadow: "none",
                    margin: "none"
                }}
                headerClassName = "text-[14px] translate-y-2"                       
            />
        </>

    const contactSupportContent = 
        <>
            <form onSubmit={handleCreateEnquiry}>
                {/* <Input className="text-[15px]" type="text" value={contactDetails.firstName} onChange={handleOnChange} label={<p className="text-[#333333] text-[14px] font-[500]">First Name</p>} placeholder="John " name="firstName" />
                <Input className="text-[15px]" type="text" value={contactDetails.lastName} onChange={handleOnChange} label={<p className="text-[#333333] text-[14px] font-[500]">Last Name</p>} placeholder="Doe" name="lastName" /> */}
                <Input className="text-[15px]" disabled type="email" value={contactDetails.email} onChange={handleOnChange} label={<p className="text-[#333333] text-[14px] font-[500]">Email</p>} placeholder="johnDoe@gmail.com" name="email" />
                <Input className="text-[15px]" type="text" value={contactDetails.subject} onChange={handleOnChange} label={<p className="text-[#333333] text-[14px] font-[500]">Subject</p>} placeholder="Write here" name="subject" />
                <Input className="text-[15px]" type="textarea" value={contactDetails.description} onChange={handleOnChange} label={<p className="text-[#333333] text-[14px] font-[500]">Description</p>} placeholder="Describe your issue" name="description" />

                <Button disabled={!contactDetails.email || !contactDetails.description} type="submit" className="mt-10 mb-5 h-[2.65em]" >{loading ? <ActivityIndicator /> : "Submit form"}</Button>
            </form>
        </>

    return (
        <div className="relative">      
        {/* MODAL */}
        <Modal isOpen={modalOpen.display} onClose={loading ? () => {} : closeModal} className={""}>
            <div>
                <div className="bg-white relative flex justify-between px-5 py-5">
                    <div>
                        <Logo classname="w-[100px] h-[25px] scale-1 mb-1" />
                        <p>{modalOpen.type === "faq" ? "FAQ" : "Support"}</p>
                    </div>
                    {/* <p onClick={closeModal} className=" cursor-pointer absolute text-[#545454] right-4 top-3 font-[600]">X</p> */}
                </div>
                <div className="px-4 py-8 bg-[#F8F8FA] overflow-y-scroll max-h-[60vh]">
                   {modalOpen.type === "faq" ? faqContent : contactSupportContent}
                </div>
            </div>
        </Modal>

        {/* NORMAL */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-b[#D4D4D4] z-[8] relative">
            <div className="hidden sm:block ">
                {/* <Search showIcon value={""} className="w-[14em] mdx4:w-[20em]" onChange={() => {}} /> */}
            </div>

            <div className="flex gap-3 items-center">
                <div className=" cursor-pointer border border-[#D4D4D4] rounded-md relative">
                    <div className="p-1" onClick={handleHelpDropdown}>
                        <HelpIcon />
                    </div>
                    <Dropdown isOpen={helpDropDown} className="mt-4 left-0">
                        <DropdownItem text="FAQ" onClick={() => (handleHelpDropdown(), openModal("faq"))} />
                        <DropdownItem text="Contact Support" onClick={() => (handleHelpDropdown(), openModal("support"))} />
                    </Dropdown>
                </div>
                <Link id="nav-notifications" href={"/dashboard/notifications"} className="border border-[#D4D4D4] rounded-md p-1">
                    <div className="relative">
                        {isNewNotification && <div className="h-[5px] w-[5px] bg-red-600 absolute rounded-full ml-auto right-[2.5px]" />}
                        <NotificationIcon />
                    </div>
                </Link>
                <div className="flex gap-1 items-center relative cursor-pointer">
                    <div id="nav-settings" className="flex gap-1 items-center" onClick={handleDropDown}>
                        <div className="rounded-full bg-slate-200 h-[33px] w-[33px] overflow-hidden">
                            {/* <Logo classname="w-[33px] h-[33px]" /> */}
                            {userProfile?.url ? <Image src={userProfile?.url} alt="img" height={5000} width={5000} /> : <Logo classname="w-[33px] h-[33px]" />}
                        </div>
                        <DropdownIcon />
                    </div>
                    <Dropdown isOpen={displayDropDown} className="mt-4">
                        <Link href={"/dashboard/settings"}><DropdownItem text="Settings" onClick={() => {}} /></Link>
                        <DropdownItem text="Logout" className="text-red-600 py-2 px-2" onClick={handleLogout} />
                    </Dropdown>
                </div>
            </div>

            <div onClick={toggleNav} className="flex cursor-pointer sm:hidden flex-col gap-2 py-1">
                <div className="hamburger-line-top w-[1.4em] h-[1.5px] bg-black"></div>
                <div className="hamburger-line-bottom w-[1.4em] h-[1.5px] bg-black"></div>
            </div>
        </div>

        {/* For Mobile */}
        <div className="sm:hidden phone-nav -translate-y-full h-[100vh] top-0 absolute w-full z-[7]">
            <SideNav />
        </div>
        </div>
    )
}

export default TopNav