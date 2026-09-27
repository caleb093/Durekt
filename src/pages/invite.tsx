import Input from "@/components/primary/input"
import Logo from "@/components/primary/Logo"
import Button from "@/components/primary/Button"
import Picture from "../../public/svgs/john-doe.svg"
import { useState } from "react"
import { useRouter } from "next/router"
import { isStrongPassword } from "@/components/util/helperFunctions"
import toast from "react-hot-toast"
import { globalState, useAcceptInviteMutation } from "../../api-feature/apiSlice"

const Invite = () => {
    const [acceptInvite] = useAcceptInviteMutation()
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const router = useRouter()
    const {token} = router.query

    const handleAcceptInvite = () => {
        if (!isStrongPassword(password)) {
            toast.error("Password must be at least 6 characters long and contain a capital letter, number and a special character", {duration: 8000})
            return
        }

        const toastId = toast.loading("loading")
        setLoading(true)

        try {
            // @ts-ignore
            acceptInvite({token: token?.toString(), password: password}).unwrap()
                .then(fulfilled => {
                    console.log(fulfilled)
                    setLoading(false)
                    toast.success("Invite Accepted")
                    toast.dismiss(toastId)
                    router.push("/onboarding")
                })
                .catch(rejected => {
                    console.error(rejected)
                    setLoading(false)
                    toast.error(rejected?.data?.message ?? "Error occured")
                    toast.dismiss(toastId)
                })
        } catch(error) {
            console.error(error)
            toast.error("Error Occured")
            setLoading(false)
        }
    }
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value
        setPassword(value)
    }

    if (globalState.authorizationToken) {
        return (
            <main className="bg-[#F8F8FA] text-[#333333] min-h-screen sm:h-screen flex flex-col justify-center items-center">
                <h1 className="text-[23px]">Un-Authorized</h1>
                <div className="w-[140px] mt-2">
                    <Button onClick={() => router.push("/dashboard")}>dashboard</Button>
                </div>
            </main>
        )
    }

    return (
        <main className="bg-[#F8F8FA] min-h-screen sm:h-screen flex flex-col justify-center items-center">
            <div className="companysetup-container w-full flex flex-col items-center">

                <div className="flex flex-col items-center w-[93%] sm:w-[35em] ">
                    <Logo />
                    <h1 className="text-[1.5em] sm:text-[30px] font-[500] mt-3 text-center " >Welcome to Durekt. Let's get started</h1>     

                    <div className="w-full" >
                        <div style={{boxShadow: "0px 0px 8px 1px rgba(187, 185, 185, 0.25)"}} className="bg-white rounded-md flex flex-col items-center px-[20px] sm:px-[50px] py-8 mt-14">
                            <Picture />
                            <Input
                                className="mt-8"
                                value={password}
                                onChange={handleOnChange}
                                label={<label className="text-[#333333] font-medium text-[0.9em]">Enter Password</label>} 
                                placeholder="*********"
                                type="password"
                                name="password"
                            />
                        </div>

                        <div className="flex gap-5 mt-4 justify-end items-center">
                            <div className="w-[100px]">
                                <Button disabled={!password || loading} onClick={() => handleAcceptInvite()} className="py-[5px] disabled:cursor-not-allowed">Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Invite