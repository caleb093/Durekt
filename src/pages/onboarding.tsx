import Image from "next/image";
import { Inter } from "next/font/google";
import RightContainer from "@/components/manager_onboarding/right/rightContainer";
import LeftContainer from "@/components/manager_onboarding/left/leftContainer";
import gsap from "gsap";
import { useEffect } from "react";

export type authAccountType = "sales-rep" | "manager"

const Onboarding = () => {
    const accountType: authAccountType = "sales-rep"

    useEffect(() => {
        gsap.timeline()
            .fromTo(".onboarding", {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo(".left-container", {x: "-100%"}, {x: 0 })
            .fromTo(".right-container", {x: "100%"}, {x: 0,}, "<0.2")
            .fromTo(".carousel-head", {opacity: 0, x: -25}, {opacity: 1, x: 0, ease: "back"}, "<0.35")
            .fromTo(".carousel-body", {opacity: 0, x: 25}, {opacity: 1, x: 0, ease: "back"}, "<")
            .fromTo(".carousel-img", {opacity: 0}, {opacity: 1})
            .fromTo(".carousel-nav", {opacity: 0}, {opacity: 1}, "<")
    },[])

    return (
        <main className="onboarding overflow-hidden invisible flex flex-col mdx3:flex-row mdx3:h-screen ">
            <LeftContainer accountType={accountType} />
            <RightContainer accountType={accountType} />
        </main>
    );
}

export default Onboarding