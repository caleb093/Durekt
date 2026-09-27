import Button from "@/components/primary/Button"
import Logo from "@/components/primary/Logo"
import Key from "../../../../../public/svgs/key_icon.svg"
import Input from "@/components/primary/input"
import { sectionType } from "../rightContainer"
import { ChangeEvent, FC, useRef, useState } from "react"
import ArrowLeft from "../../../../../public/svgs/arrow-left.svg"
import { isStrongPassword } from "@/components/util/helperFunctions"
import toast from "react-hot-toast"
import { useVerifyForgetPasswordMutation } from "../../../../../api-feature/apiSlice"
import useLoading from "@/components/util/useLoading"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"

interface props {
    changeSection: (newSection: sectionType) => void
    email: string
}

const NewPassword:FC<props> = ({changeSection, email}) => {
    const {loading, startLoading, stopLoading} = useLoading()
    const [part, setPart] = useState<"otp" | "password">("otp")
    const [verifyPassword] = useVerifyForgetPasswordMutation()
    const [passwordsMatch, setPassWordsMatch] = useState(true)
    const numberSequence = [0, 1, 2, 3,4,5] 
    const [userInput, setUserInput] = useState<{ [key: string]: string }>({
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
    })
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const allFieldsFilled = Object.values(userInput).every(value => value !== "");
    const [formDetails, setFormDetails] = useState({
        password: "",
        confirm_password: ""
    })  

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        // Only update the state if the current input is empty and the new value is a single digit
        if (userInput[`value${index + 1}`] === "" && value.length === 1) {
            setUserInput(prevState => ({
                ...prevState,
                [`value${index + 1}`]: value,
            }));

            // Shift focus to the next input field if the current one is filled
            if (index < numberSequence.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const { key } = e;

        if (key === 'Backspace') {
            if (userInput[`value${index + 1}`] !== "") {
                // Clear the current input field immediately
                setUserInput(prevState => ({
                    ...prevState,
                    [`value${index + 1}`]: "",
                }));
            } else if (index > 0) {
                // If the current field is already empty, move to the previous field and clear it
                inputRefs.current[index - 1]?.focus();
                setUserInput(prevState => ({
                    ...prevState,
                    [`value${index}`]: "",
                }));
            }
        }
    };
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFormDetails(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async () => {
        if (formDetails.password !== formDetails.confirm_password) {
            setPassWordsMatch(false)
            return
        } else {
            setPassWordsMatch(true)
        }

        if (!isStrongPassword(formDetails.password)) {
            toast.error("Password must be at least 6 characters long and contain a capital letter, number and a special character", {duration: 5000})
            return
        }

        let code = ""
        Object.values(userInput).map(value => {code = code + value})

        try {
            startLoading()
            await verifyPassword({newPassword: formDetails.password, otp: code, email: email}).unwrap()
                .then(fulfilled => {
                    changeSection("signin")
                    toast.success("Password changed")
                })
                .catch(rejected => {
                    console.error(rejected)
                    toast.error(rejected?.data?.message ? rejected?.data?.message : "Error Occured")
                })
        } catch(error) {
            console.error(error)
            toast.error("Error occured")
        } finally {
            stopLoading()
        }

    }

    return (
        <>
            <Logo />
            <Key className="mx-auto mt-4" />
            <h1 className="text-[1.5em] sm:text-[2em]  mt-1 font-medium text-[#333333]">Set new password</h1>
            <p className="text-[0.9em] mb-8 text-[#5B5B5B] pt-2 font-normal">Your new password must be different from previously used passwords.</p>

            {part === "otp" && 
                <div>
                    <h1 className="text-[#5B5B5B]" >Enter OTP</h1>
                    <div className="flex gap-4 justify-center mb-10">
                        {numberSequence.map((item, i) => (
                            <input 
                                // @ts-ignore
                                ref={el => inputRefs.current[i] = el} // Attach refs to the input fields
                                autoFocus={i === 0}
                                value={userInput[`value${i + 1}`]} // Bind the input value to state
                                onChange={(e) => handleInputChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                type="number" 
                                className="border-b border-b-[#5272EA] font-medium text-[1.5em] sm:text-[2em] text-[#5272EA] h-[2em] w-[13%] sm:w-[2em] text-center"
                                max={10}
                            />
                        ))}
                    </div>
                    <Button disabled={!allFieldsFilled} onClick={() => setPart("password")}>Continue</Button>
                </div>
            }

            {part === "password" &&
                <>
                    <Input 
                        value={formDetails.password}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Password</label>} 
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                    />

                    <Input 
                        value={formDetails.confirm_password}
                        onChange={handleOnChange}
                        label={<label className="text-[#333333] font-medium text-[0.9em]">Confirm password</label>} 
                        placeholder="Confirm your password"
                        type="password"
                        name="confirm_password"
                    />
                    {!passwordsMatch && <p className="mr-auto mb-2 text-[0.9em] italic text-red-600">Passwords don't match</p>}

                    <div className="mt-6">
                        {/* <Button onClick={() => changeSection("checkmail")}> */}
                        <Button onClick={handleSubmit} className="h-[2.60em]">
                            {loading ? <ActivityIndicator /> : "Reset Password"}
                        </Button>
                    </div>                
                </>
            }
            
            <div className="w-full flex justify-between items-center mt-5 mb-2">
                {part === "password" && <button onClick={() => setPart("otp")}>Go Back</button>}
            </div>

            <p onClick={() => changeSection("signin")} className="flex justify-center items-center gap-2 cursor-pointer text-[0.9em] text-[#475467] font-medium mt-6"><ArrowLeft /> Back to Sign in</p>

        </>
    )
}

export default NewPassword