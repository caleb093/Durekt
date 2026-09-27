import Signin from "./authcomponents/signin"
import ForgotPassword from "./authcomponents/forgotpassword"
import NewPassword from "./authcomponents/newpassword"
import CheckMail from "./authcomponents/checkmail"
import Signup from "./authcomponents/signup"
import { FC, useCallback, useState } from "react"
import gsap from "gsap"
import { useRouter } from "next/router"
import { authAccountType } from "@/pages/onboarding"

export type sectionType = "signin" | "forgotpassword" | "newpassword" | "checkmail" | "signup"

export type OnboardingQueryParams = {
  goToSection: sectionType; // Define possible values here
};

interface props {
    accountType: authAccountType
}

type QueryParams = {
    goToSection: sectionType
}

const RightContainer:FC<props> = ({accountType}) => {
    const router = useRouter()
    const {goToSection} = router.query as QueryParams
    const [section, setSection] = useState<sectionType>(goToSection ? goToSection : "signin")
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
    
    const handleForgotPassword = (text: string) => {
        setForgotPasswordEmail(text)
    }

    const handleSectionChange = useCallback((newsection: sectionType) => {
        const fadeAnimation = gsap.timeline()
            .to(".auth-right-container", {opacity: 0})
            .to(".auth-right-container", {opacity: 1})
        fadeAnimation.play()

        setTimeout(() => {
            setSection(newsection)
        },500)
    }, [])

    return (
        <div className="right-container auth-right-container mdx3:flex-[1.5] min-h-screen flex flex-col items-center  pt-[4.5%] overflow-y-scroll">
            <div className=" w-[90%] mdx2:w-[30em] pt-8 pb-14 mdx3:pt-0 text-center">
                {section === "signin" && <Signin accountType={accountType} changeSection={handleSectionChange} />}
                {section === "forgotpassword" && <ForgotPassword handleForgotPassword={handleForgotPassword} changeSection={handleSectionChange} />}
                {section === "newpassword" && <NewPassword email={forgotPasswordEmail} changeSection={handleSectionChange} />}
                {section === "checkmail" && <CheckMail changeSection={handleSectionChange} />}
                {section === "signup" && <Signup accountType={accountType} changeSection={handleSectionChange} />}
            </div>
        </div>
    )
}

export default RightContainer