import Link from "next/link"
import Logo2 from "../../../public/svgs/Logo_white.svg"
import DashboardIcon from "../../../public/svgs/dashboardIcons/dashboard-icon.svg"
import SalesRepIcon from "../../../public/svgs/dashboardIcons/salesrep-icon.svg"
import SkillsIcon from "../../../public/svgs/dashboardIcons/skills-icon.svg"
import TeamIcon from "../../../public/svgs/dashboardIcons/teamrating-icon.svg"
import InsightsIcon from "../../../public/svgs/dashboardIcons/insights-icon.svg"
import DealsIcon from "../../../public/svgs/dashboardIcons/deals-icon.svg"
import ManagerIcon from "../../../public/svgs/dashboardIcons/managers-icon.svg"
import TrainingIcon from "../../../public/svgs/dashboardIcons/trainings-icon.svg"
import ArrowIcon from "../../../public/svgs/arrow2-icon.svg"
import { useRouter } from "next/router"
import gsap from "gsap"
import { FC, useContext, useEffect, useState } from "react"
import { globalState } from "../../../api-feature/apiSlice"
import CompanyIcon from "../../../public/svgs/dashboardIcons/user-edit.svg"
import SystemIcon from "../../../public/svgs/dashboardIcons/frame.svg"
import SubscriptionIcon from "../../../public/svgs/dashboardIcons/dollar-square.svg"
import FolderIcon from "../../../public/svgs/dashboardIcons/folder-cloud.svg"
import SettingIcon from "../../../public/svgs/dashboardIcons/setting-2.svg"
import ArrowDownIcon from "../../../public/svgs/dashboardIcons/arrow-down.svg"
import { appContext } from "../contexts/appContext"

const NavDropItem:FC<{text: string, onClick: () => void, currentTab: boolean}> = ({text, onClick, currentTab}) => {
    return (
        <div onClick={onClick} className="flex py-3 text-[14px] px-4 items-center gap-2 hover:bg-[#2B2A3D] relative">
            {currentTab && <div className="w-1 h-full left-0 bg-red-500 bg-gradient-to-b from-[#6FA9E2] to-[#B3387F] absolute" />}
            <div className="h-3 w-3 rounded-full border" />
            <p>{text}</p>
        </div>
    )
}

const SideNav = () => {
    const router = useRouter()
    const splitName = router.pathname.split('/')
    const routeName = splitName[2]
    const {accountType: ACCOUNT_TYPE, userProfile} = useContext(appContext)
    // const ACCOUNT_TYPE = globalState.account_type
    const [displayDropdown, setDisplayDropdown] = useState({display: false, type: "" as "company" | "system" | "subscription"})
    // const routeName = router.pathname.split('/').slice(2).join('/')
    const currentTab = splitName[3]

    const shakeAnimation = (iconClass: Element) => {
        gsap.timeline({ defaults: { duration: 0.2 } })
            .fromTo(iconClass, { rotate: 18 }, { rotate: -18, repeat: 1, yoyo: true })
            .to(iconClass, { rotate: 0 });
    };

    const handleDropdown = (type: "company" | "system" | "subscription") => {
        setDisplayDropdown(prev => ({display: !prev.display, type: type}))
    }

    const handleItemClick = (path: string) => {
        // @ts-ignore
        setDisplayDropdown({display: false, type: ""})
        router.push(path)
    }
    
    useEffect(() => {
        // Select all links and add hover event listener
        const links = document.querySelectorAll('.sidebar-link');
        
        links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('.sidenav-icon');
            if (icon) {
            shakeAnimation(icon);
            }
        });
        });  

        // Clean up the event listeners on unmount
        return () => {
        links.forEach(link => {
            link.removeEventListener('mouseenter', () => {});
        });
        };
    }, []);

    return (
        <div className="bg-[#161529] h-screen flex flex-col ">
            <div className=" mx-auto mt-6">
                <Logo2 />
            </div>
            <div className="flex flex-col text-[#D9D9D9] text-[0.9em] mt-10">
                <Link href={"/dashboard"} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${router.pathname === "/dashboard" && "bg-[#2B2A3D] text-white"}`}>
                    <DashboardIcon className="sidenav-icon" />
                    <p>Dashboard</p>
                </Link>
                {ACCOUNT_TYPE === "admin" && 
                    <>
                        <div className="cursor-pointer text-[#D9D9D9B2]">
                            <div onClick={() => handleDropdown("company")} className={`sidebar-link py-3 px-4 flex items-center gap-3 hover:bg-[#2B2A3D] hover:text-white ${routeName === "company-management" && "bg-[#2B2A3D] text-white"}`}>
                                <CompanyIcon className="sidenav-icon flex-shrink-0" />
                                <p>Company Management</p>
                                <ArrowDownIcon className={`ml-auto transition-all h-5 w-5 ${(displayDropdown.type === "company" ) ? "rotate-[180deg]" : "rotate-[0deg]"}`} />
                            </div>
                           <div className={`mt-0 text-[#D9D9D] transition-all overflow-hidden origin-top ${(displayDropdown.type === "company") ? "h-[6.4em]" : "h-0"}`}>
                                <NavDropItem currentTab={routeName === "company-management" && !currentTab} text="Companies" onClick={() => handleItemClick("/dashboard/company-management")} />
                                <NavDropItem currentTab={currentTab === "activitylogs"} text="Activity Logs" onClick={() => handleItemClick("/dashboard/company-management/activitylogs")} />
                            </div>
                        </div>
                        <div className="cursor-pointer text-[#D9D9D9B2]">
                            <div onClick={() => handleDropdown("system")}  className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "system-performance" && "bg-[#2B2A3D] text-white"}`}>
                                <SystemIcon className="sidenav-icon flex-shrink-0" />
                                <p>System Performance</p>
                                <ArrowDownIcon className={`ml-auto transition-all h-5 w-5 ${(displayDropdown.type === "system" ) ? "rotate-[180deg]" : "rotate-[0deg]"}`} />
                            </div>

                            <div className={`mt-0 transition-all origin-top overflow-hidden ${(displayDropdown.type === "system" ) ? "h-[9.5em]" : "h-0"}`}>
                                <NavDropItem currentTab={currentTab === "server-health"} text="Server Health" onClick={() => handleItemClick("/dashboard/system-performance/server-health")} />
                                <NavDropItem currentTab={currentTab === "error-logs"} text="Error Logs" onClick={() => handleItemClick("/dashboard/system-performance/error-logs")} />
                                <NavDropItem currentTab={currentTab === "resource-usage"} text="Resource Usage" onClick={() => handleItemClick("/dashboard/system-performance/resource-usage")} />
                            </div>
                        </div>
                        <div className="cursor-pointer text-[#D9D9D9B2]">
                            <div onClick={() => handleDropdown("subscription")} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "subscriptions" && "bg-[#2B2A3D] text-white"}`} >
                                <SubscriptionIcon className="sidenav-icon flex-shrink-0" />
                                <p>Subscriptions</p>
                                <ArrowDownIcon className={`ml-auto transition-all h-5 w-5 ${(displayDropdown.type === "subscription" ) ? "rotate-[180deg]" : "rotate-[0deg]"}`} />
                            </div>

                            <div className={`mt-0 text-[#D9D9D] transition-all origin-top overflow-hidden ${(displayDropdown.type === "subscription" ) ? "h-auto mdx5:h-[6.5em]" : "h-0"}`}>
                                <NavDropItem currentTab={routeName === "subscriptions" && !currentTab} text="Company Subscriptions" onClick={() => handleItemClick("/dashboard/subscriptions")} />
                                <NavDropItem currentTab={currentTab === "manage-plans"} text="Manage plans" onClick={() => handleItemClick("/dashboard/subscriptions/manage-plans")} />
                            </div>
                        </div>
                        <Link href={"/dashboard/training-management"} className={`sidebar-link  text-[#D9D9D9B2] flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "training-management" && "bg-[#2B2A3D] text-[#D9D9D9B2]"}`}>
                            <FolderIcon className="sidenav-icon flex-shrink-0" />
                            <p className="text-[#D9D9D9B2]">Training Management</p>
                        </Link>
                        <Link href={"/dashboard/settings"} className={`sidebar-link flex text-[#D9D9D9B2] items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "settings" && "bg-[#2B2A3D] text-[#D9D9D9B2]"}`}>
                            <SettingIcon className="sidenav-icon flex-shrink-0" />
                            <p className="text-[#D9D9D9B2]">Account Settings</p>
                        </Link>
                    </>
                }
                {(ACCOUNT_TYPE === "manager" || ACCOUNT_TYPE === "owner") && <Link href={"/dashboard/sales-rep"} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "sales-rep" && "bg-[#2B2A3D] text-white"}`}>
                    <SalesRepIcon className="sidenav-icon" />
                    <p>Sales Reps</p>
                </Link>}
                {(ACCOUNT_TYPE === "manager" || ACCOUNT_TYPE === "owner") && <Link href={"/dashboard/skills"} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "skills" && "bg-[#2B2A3D] text-white"}`}>
                    <SkillsIcon className="sidenav-icon" />
                    <p>Skills</p>
                </Link>}
                {(ACCOUNT_TYPE && ACCOUNT_TYPE !== "admin") &&
                    <>
                        <Link id="nav-team-rating" href={"/dashboard/team-rating"} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "team-rating" && "bg-[#2B2A3D] text-white"}`}>
                            <TeamIcon className="sidenav-icon" />
                            <p>Team Rating</p>
                        </Link>
                        <Link href={"/dashboard/insights"} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "insights" && "bg-[#2B2A3D] text-white"}`}>
                            <InsightsIcon className="sidenav-icon" />
                            <p>Insights</p>
                        </Link>
                        <Link id="nav-create-deal" href={"/dashboard/deals"} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "deals" && "bg-[#2B2A3D] text-white"}`}>
                            <DealsIcon className="sidenav-icon" />
                            <p>Deals</p>
                        </Link>
                    </>
                }
                {(ACCOUNT_TYPE === "manager" || ACCOUNT_TYPE === "owner") && <Link id="nav-create-team" href={"/dashboard/teams"} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "teams" && "bg-[#2B2A3D] text-white"}`}>
                    <ManagerIcon className="sidenav-icon" />
                    <p>Teams</p>
                </Link>}
                {(ACCOUNT_TYPE && ACCOUNT_TYPE !== "admin") && <Link href={`${(ACCOUNT_TYPE === "manager" || ACCOUNT_TYPE === "owner") ? "/dashboard/trainings" : "/dashboard/trainings/112"}`} className={`sidebar-link flex items-center gap-3 hover:bg-[#2B2A3D] py-3 px-4 hover:text-white ${routeName === "trainings" && "bg-[#2B2A3D] text-white"}`}>
                    <TrainingIcon className="sidenav-icon" />
                    <p>Trainings</p>
                </Link>}
            </div>
            {ACCOUNT_TYPE !== "admin" && <Link href={"/dashboard/company-permission"} className=" border border-[#D9D9D9] rounded-[150px] flex justify-between mt-auto mb-6 pl-3 pr-1 py-2 mx-2 ">
                <div>
                    <p className="text-white text-[14px] font-[500]">{userProfile?.company?.name}</p>
                    <p className=" text-[#D9D9D9] text-[12px]" >Add or switch company</p>
                </div>
                <ArrowIcon className="text-white" />
            </Link>}
        </div>
    )
}

export default SideNav