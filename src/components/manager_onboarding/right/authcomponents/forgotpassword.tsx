import Input from "@/components/primary/input"
import Logo from "@/components/primary/Logo"
import Key from "../../../../../public/svgs/key_icon.svg"
import Button from "@/components/primary/Button"
import { sectionType } from "../rightContainer"
import { FC, useState } from "react"
import ArrowLeft from "../../../../../public/svgs/arrow-left.svg"
import { useForgetPasswordMutation } from "../../../../../api-feature/apiSlice"
import toast from "react-hot-toast"
import useLoading from "@/components/util/useLoading"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"

interface props {
    changeSection: (newSection: sectionType) => void
    handleForgotPassword: (text: string) => void
}

const ForgotPassword:FC<props> = ({changeSection, handleForgotPassword}) => {
    const {loading, startLoading, stopLoading} = useLoading()
    const [postForgetPassword] = useForgetPasswordMutation()
    const [formDetails, setFormDetails] = useState({
        email: "",
    })  

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFormDetails(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(formDetails)
        startLoading()
        try {
            await postForgetPassword({...formDetails}).unwrap()
                .then(fulfilled => {
                    handleForgotPassword(formDetails.email)
                    toast.success("an OTP was sent to your eamil", {duration: 4000})
                    changeSection("newpassword")
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

    return (
        <>
            <Logo />
            <Key className="mx-auto mt-4" />
            <h1 className="text-[1.5em] sm:text-[2em] mt-1 font-medium text-[#333333]">Forgot password?</h1>
            <p className="text-[0.9em] mb-8 text-[#5B5B5B] pt-2 font-normal">No worries, we’ll send you reset instructions.</p>

            <form onSubmit={handleSubmit}>
                <Input 
                    value={formDetails.email}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Email</label>} 
                    placeholder="Enter your Email"
                    type="email"
                    name="email"
                />

                <Button disabled={!formDetails.email} className="h-[2.68em]" type="submit">
                    {loading ? <ActivityIndicator /> : "Send"}
                </Button>
            </form>

            <p onClick={() => !loading && changeSection("signin")} className=" cursor-pointer text-[0.9em] text-[#475467] inline-flex justify-center items-center gap-2 font-medium mt-6"><ArrowLeft /> Back to Sign in</p>
        </>        
    )
}

export default ForgotPassword