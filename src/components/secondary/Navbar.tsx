import Link from "next/link"
import Logo2 from "../../../public/svgs/Logo_white.svg"
import Button from "../primary/Button"
import { useState } from "react"
import gsap from "gsap"
import Arrorw from "../../../public/svgs/arrow2-icon.svg"
import google from "../../../public/images/homepage/google.png"
import zoom from "../../../public/images/homepage/zoom.png"
import kixie from "../../../public/images/homepage/kixie.png"
import Image from "next/image"
import HelpIcon from "../../../public/svgs/help-outline-icon.svg"
import InfoIcon from "../../../public/svgs/info-icon.svg"

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false)
    const [dropdown, setDropDown] = useState("" as "features" | "integrations" | "resources" | undefined)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    
    const FEATURES = 
        // <div className="text-[14px] flex absolute z-[2] bg-[#02010E] rounded-2xl -ml-24  px-5 py-8 top-0 mt-[4em] w-[38em] ">
        <div className="text-[14px] flex flex-col mdx4:flex-row absolute z-[2] bg-[#02010E] rounded-2xl mdx4:-ml-24  px-5 py-8 top-0 mt-[9.5em] gap-3 mdx4:gap-0 mdx4:mt-[4em] w-[95%] mdx4:w-[38em] ">
            <div className="flex flex-1 flex-col gap-8">
                <Link href={"/features-integration"} className="flex flex-col flex-1 hover:bg-[#0e0c22]">
                    <h2 className="text-[#CCCCCC] font-[600] leading-[19.5px]">Seamless Integration with zoom, Google Meet, and Kixie</h2>
                    <p className="text-[#71717A] text-[12px] pt-3 leading-[14.63px]">Easily connect your existing communication tools for effortless call recording and management.</p>
                </Link>
                <Link href={"/features-performance"} className="flex flex-col flex-1 hover:bg-[#0e0c22]">
                    <h2 className="text-[#CCCCCC] font-[600] leading-[19.5px]">AI-Powered Performance Grading</h2>
                    <p className="text-[#71717A] text-[12px] pt-3 leading-[14.63px]">Proprietary AI algorithms analyze and grade sales calls based on your sales education material.</p>
                </Link>
            </div>
            <div className="w-[1px] bg-gradient-to-t from-[#48D0FF] to-[#C32782] flex-shrink-0 mx-5"><p></p></div>
            <div className="flex flex-1 flex-col gap-8">
                <Link href={"/features-training"} className="flex flex-col flex-1 hover:bg-[#0e0c22]">
                    <h2 className="text-[#CCCCCC] font-[600] leading-[19.5px]">Premium Training for Sales Team</h2>
                    <p className="text-[#71717A] text-[12px] pt-3 leading-[14.63px]">Access detailed reports and actionable insights through an intuitive dashboard.</p>
                </Link>
                <Link href={"/features-insights"} className="flex flex-col flex-1 hover:bg-[#0e0c22]">
                    <h2 className="text-[#CCCCCC] font-[600] leading-[19.5px]">Real-Time Insights Dashboard</h2>
                    <p className="text-[#71717A] text-[12px] pt-3 leading-[14.63px]">Access detailed reports and actionable insights through an intuitive dashboard.</p>
                </Link>
            </div>
        </div>

    const INTEGRATIONS = 
        <div className="text-[14px] text-white overflow-hidden absolute w-[20em] mx-auto mdx4:w-[14em] z-[2] bg-[#02010E] mt-[17em] mdx4:mt-[4em] mdx4:-ml-10 rounded-2xl top-0 px-1 ">        
            <Link href={{pathname: "/onboarding", query: {goToSection: "signup"}}} className="hover:bg-[#0e0c22] cursor-pointer flex gap-2 items-center py-2 px-3">
                <div className="w-14 h-14 scale-[0.8]">
                    <Image src={google} alt="google" height={1000} width={1000} />
                </div>
                <p className="">Google Meet</p>
            </Link>
            <div className="bg-gradient-to-t from-[#48D0FF] to-[#C32782] w-full h-[0.9px]" />
            <Link href={{pathname: "/onboarding", query: {goToSection: "signup"}}} className="hover:bg-[#0e0c22] cursor-pointer flex gap-2 items-center py-2 px-3">
                <div className="w-14 h-14 scale-[0.8]">
                    <Image src={kixie} alt="kixie" className="bg-[#02010E]" height={1000} width={1000} />
                </div>
                <p className="">Kixie</p>
            </Link>
            <div className="bg-gradient-to-t from-[#48D0FF] to-[#C32782] w-full h-[1px]" />
            <Link href={{pathname: "/onboarding", query: {goToSection: "signup"}}} className="hover:bg-[#0e0c22] cursor-pointer flex gap-2 items-center py-2 px-3">
                <div className="w-14 h-14 scale-[0.8]">
                    <Image src={zoom} alt="zoom" height={1000} width={1000} />
                </div>
                <p className="">Zoom Call</p>
            </Link>
        </div>

    const RESOURCES = 
        <div className="text-[14px] text-white absolute w-[14em] z-[2] bg-[#02010E] mt-[21em] mdx4:mt-[4em] mdx4:-ml-10 rounded-2xl top-0 px-1 overflow-hidden ">        
            <div className="flex gap-2 items-center py-5 px-3 hover:bg-[#0e0c22]">
                <HelpIcon />
                <p className="">Help Center</p>
            </div>
            <div className="bg-gradient-to-t from-[#48D0FF] to-[#C32782] w-full h-[0.9px]" />
            <Link href={"/faq"} className="flex gap-2 items-center py-5 px-3 hover:bg-[#0e0c22]">                
                <InfoIcon className="text-white h-[24px] w-[24px]" />
                <p className="">FAQ</p>
            </Link>
        </div>

    const handleDropdown = (value: "features" | "integrations" | "resources" ) => {
        if (value === dropdown) {
            setIsDropdownOpen(false)
            setDropDown(undefined)
            return
        }
        setIsDropdownOpen(true)
        setDropDown(value)
    }

    const toggleNav = () => {
        const openAnim = gsap.timeline()
            .to(".phone-nav", {y: 0})
            .to(".hamburger-line-top", {rotate: "45deg", y: 1, height: "2px"}, "<")
            .to(".hamburger-line-bottom", {rotate: "-45deg", y: "-5.5px", height: "2px"}, "<")

        const closeAnim = gsap.timeline()
            .to(".phone-nav", {y: "-100%"})
            .to(".hamburger-line-top", {rotate: "0deg", y: 0, height: "1px"}, "<")
            .to(".hamburger-line-bottom", {rotate: "0deg", y: 0, height: "1px"}, "<")

        openNav && openAnim.play()
        !openNav && closeAnim.reverse()
        
        setOpenNav(prev => !prev)
    }

    return (
        <nav className="fixed w-full z-[6] bg-[#161529] text-white border-b-[0.1px] border-b-[#71717A] " >
            <div className="z-[4] bg-[#161529] relative py-6 mdx3:py-4 flex justify-between items-center px-6">
                <Link href={"/"}>
                    <Logo2 />
                </Link>
                {/* WEB NAV */}
                <div className="hidden  mdx4:flex gap-5 items-center ">
                    <div onClick={() => handleDropdown("features")} className={`${dropdown === "features" && "animate-nav-text"} flex gap-0 cursor-pointer items-center relative`}>
                        <div className="text-[14px]" >Features</div>
                        <Arrorw className={` rotate-[90deg] scale-[0.9]`} />
                        {(isDropdownOpen && dropdown === "features" ) && FEATURES}
                    </div>
                    <Link className="text-[14px]" href={"/pricing"} >Pricing</Link>
                    <div  onClick={() => handleDropdown("integrations")} className={`${dropdown === "integrations" && "animate-nav-text"} flex gap-0 cursor-pointer items-center relative`}>
                        <div className="text-[14px]" >Integrations</div>
                        <Arrorw className=" rotate-[90deg] scale-[0.9]" />
                        {(isDropdownOpen && dropdown === "integrations") && INTEGRATIONS}
                    </div>
                    <div onClick={() => handleDropdown("resources")} className={`${dropdown === "resources" && "animate-nav-text"} flex gap-0 cursor-pointer items-center relative`}>
                        <div className="text-[14px]" >Resources</div>
                        <Arrorw className=" rotate-[90deg] scale-[0.9]" />
                        {(isDropdownOpen && dropdown === "resources" )  && RESOURCES}
                    </div>
                </div>
                <div className="hidden mdx4:flex gap-3 w-[13em]  z-[2]">
                    <Link href={"/onboarding"} className="w-[100%] ">
                        <Button className="font-light bg-transparent hover:bg-[#B3387F] cursor-pointer transition-all">Sign in</Button>
                    </Link>
                    {/* <Link href={{pathname: "/onboarding", query: {goToSection: "signup"}}} className="w-[100%] "> */}
                    <Link href={{pathname: "/pricing"}} className="w-[100%] ">
                        <Button className="font-light ">Sign up</Button>
                    </Link>
                </div>
                {/* FOR MOBILE */}
                <div onClick={toggleNav} className="flex cursor-pointer mdx4:hidden flex-col gap-2 py-1">
                    <div className="hamburger-line-top w-[1.4em] h-[1px] bg-white"></div>
                    <div className="hamburger-line-bottom w-[1.4em] h-[1px] bg-white"></div>
                </div>
            </div>

            {/* MOBILE NAV */}
            <div className=" phone-nav flex -translate-y-full flex-col items-center mdx4:hidden absolute bg-[#161529] top-0 h-[100vh] w-full z-[3] pt-[6em]" >
                <div className="flex flex-col items-center gap-6 ">
                    <div onClick={() => handleDropdown("features")} className={`${dropdown === "features" && "animate-nav-text"} relative flex items-center`}>
                        <p>Features</p>
                        <Arrorw className={` cursor-pointer rotate-[90deg] scale-[0.9]`} />
                    </div>
                    <Link href={"/pricing"} >Pricing</Link>
                    <div onClick={() => handleDropdown("integrations")} className={`${dropdown === "integrations" && "animate-nav-text"} relative flex items-center`}>
                        <p>Integration</p>
                        <Arrorw className={` cursor-pointer rotate-[90deg] scale-[0.9]`} />
                    </div>
                    <div onClick={() => handleDropdown("resources")} className={`${dropdown === "resources" && "animate-nav-text"} relative flex items-center`}>
                        <p>Resources</p>
                        <Arrorw className={` cursor-pointer rotate-[90deg] scale-[0.9]`} />
                    </div>
                    
                    <div className="flex w-[120px] flex-col gap-3">
                        <Link href={"/onboarding"} className="w-[100%] ">
                            <Button className=" font-light bg-transparent hover:bg-[#B3387F] cursor-pointer transition-all">Sign in</Button>                        
                        </Link>
                        {/* <Link href={{pathname: "/onboarding", query: {goToSection: "signup"}}}> */}
                        <Link href={{pathname: "/pricing"}}>
                            <Button className="font-light ">Sign up</Button>
                        </Link>
                    </div>
                </div>

                {(isDropdownOpen && dropdown === "features" ) && FEATURES}
                {(isDropdownOpen && dropdown === "integrations") && INTEGRATIONS}
                {(isDropdownOpen && dropdown === "resources" )  && RESOURCES}
            </div>
        </nav>
    )
}

export default Navbar