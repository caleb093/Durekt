import Button from "@/components/primary/Button"
import Input from "@/components/primary/input"
import Logo from "@/components/primary/Logo"
import { useState } from "react"
import { useRouter } from "next/router"

const AdminSignin = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })  
    const routeTo = useRouter()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value
        setLoginDetails(prev => ({...prev, [name]: value}))
    }

    const handleSignin = () => {
        console.log(loginDetails)
    }

    return (
        <main className="bg-white h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center w-[90%] sm:w-[25em]">
                <Logo />
                <h1 className="text-[1.5em] sm:text-[2em] mt-3 font-medium" >Admin Login</h1>     
                <div className="py-8 flex justify-center items-center gap-4 w-full">
                    <div className="border-[0.1px] w-full "></div>
                    <p>Or</p>
                    <div className="border-[0.1px] w-full"></div>
                </div>
                <Input
                    value={loginDetails.email}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Admin</label>} 
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                />
                <Input
                    value={loginDetails.password}
                    onChange={handleOnChange}
                    label={
                         <div className="flex w-full justify-between">
                            <label className="text-[#333333] font-medium text-[0.9em]" >Password</label>
                            <label onClick={() => routeTo.push({pathname: "/onboarding", query: {goToSection: "forgotpassword"}})} className=" text-[#5272EA] cursor-pointer font-medium text-[0.9em]">Forget Password</label>
                        </div>
                    }
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                />
                <Button onClick={handleSignin}>Sign in</Button>
            </div>
        </main>
    )
}

export default AdminSignin