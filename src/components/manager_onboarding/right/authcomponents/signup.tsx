import Logo from "@/components/primary/Logo"
import Button from "@/components/primary/Button"
import Google from "../../../../../public/svgs/icons_google.svg"
import Input from "@/components/primary/input"
import { sectionType } from "../rightContainer"
import Microsoft from "../../../../../public/svgs/microsoft_icon.svg"
import React, { FC, useState } from "react"
import { useAuthSignUpMutation } from "../../../../../api-feature/apiSlice"
import { authAccountType } from "@/pages/onboarding"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { isStrongPassword } from "@/components/util/helperFunctions"
import GoogleMicrosoft from "../../GoogleMicrosoft"

interface props {
    changeSection: (newSection: sectionType) => void
    accountType: authAccountType
}

const Signup:FC<props> = ({changeSection, accountType}) => {
    const router = useRouter()
    const [authSignUp] = useAuthSignUpMutation()
    const [requestStatus, setRequestStatus] = useState<"idle" | "pending">("idle");
    const [displayLoading, setDisplayLoading] = useState(false);
    const [passwordsMatch, setPassWordsMatch] = useState(true);
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const changeRequestStatus = (status: "idle" | "pending") => {
        setRequestStatus(status)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFormDetails(prev => ({...prev, [name]: value}))
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formDetails.password !== formDetails.confirm_password) {
            setPassWordsMatch(false)
            return
        }
        setPassWordsMatch(true)

        if (!isStrongPassword(formDetails.password)) {
            toast.error("Password must be at least 6 characters long and contain a capital letter, number and a special character", {duration: 8000})
            return
        }

        if (requestStatus == "idle") {
            setRequestStatus("pending")
            setDisplayLoading(true);
            try {
                authSignUp(formDetails).unwrap()
                    .then(fulfilled => {
                        changeSection("signin")
                        toast.success("Account created")
                        console.log(fulfilled)
                        setRequestStatus("idle")
                        setDisplayLoading(false)
                    })
                    .catch(rejected => {
                        console.log(rejected)
                        setDisplayLoading(false)
                        setRequestStatus("idle")
                        if (rejected.status === 400) {
                            toast.error(rejected?.data?.message)
                            return
                        } else {
                            toast.error("Error Occured, Refresh Page") 
                            return
                        }
                    })
            } catch (err) {
                console.error(err)
                toast.error("Error Occured")
                setDisplayLoading(false)
                setRequestStatus("idle")
            }
        }
    }

    return (
        <>
            <Logo />
            <h1 className="text-[1.5em] sm:text-[2em] mt-3 font-medium">Create an account</h1>
            <GoogleMicrosoft changeRequestStatus={changeRequestStatus} />
            <div className="py-8 flex justify-center items-center gap-4">
                <div className="border-[0.1px] w-full"></div>
                <p>Or</p>
                <div className="border-[0.1px] w-full"></div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col mb-6">
                <Input 
                    value={formDetails.firstName}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">First name</label>} 
                    placeholder="Enter first name"
                    type="text"
                    name="firstName"
                />
                <Input 
                    value={formDetails.lastName}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Last name</label>} 
                    placeholder="Enter last name"
                    type="text"
                    name="lastName"
                />
                <Input 
                    value={formDetails.email}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Email</label>} 
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                />
                <Input 
                    value={formDetails.password}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Password</label>} 
                    placeholder="Enter password"
                    type={"password"}
                    name="password"
                />
                <Input 
                    value={formDetails.confirm_password}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Confirm Password</label>} 
                    placeholder="Enter password"
                    type={"password"}
                    name="confirm_password"
                />
                {!passwordsMatch && <p className="-my-2 mr-auto text-[0.8em] italic text-red-600">Passwords don't match</p>}

                <Button disabled={(!formDetails.firstName || !formDetails.lastName || !formDetails.email || !formDetails.password) || requestStatus !== "idle"} type="submit" className="mt-7 h-[2.68em] disabled:cursor-not-allowed disabled:bg-slate-500">
                    {displayLoading ? <ActivityIndicator /> : "Sign up"}
                </Button>
            </form>

            <p className="mt-6 text-[0.85em] text-[#475467] font-normal">Already have an account<span  onClick={() => changeSection("signin")} className="cursor-pointer text-[#5272EA] font-medium"> Sign in</span></p>
        </>
    )
}

export default Signup