import Button from "@/components/primary/Button"
import Input from "@/components/primary/input"
import Logo from "@/components/primary/Logo"
import { useRouter } from "next/router"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import Picture from "../../public/svgs/john-doe.svg"
import { Checkbox } from "@mui/material"
import gsap from "gsap"
import { SkillsType, APISTATUS, ApiType, } from "../../api-feature/types"
import { globalState, useGetAvailableSkillsListQuery, useGetCompaniesQuery, usePostSwitchCompaniesMutation, usePostCreateCompanyMutation } from "../../api-feature/apiSlice"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"
import toast from "react-hot-toast"
import { appContext } from "@/components/contexts/appContext"
import CrmSetup from "@/components/ui/crm/crm-setup"
// import CrmSetup from "@/components/ui/crm-setup"


interface skillsApiType extends ApiType {
  data: {success: boolean, data:SkillsType[]}
}

const CompanySetup = () => {
    const routeTo = useRouter() 
    const {userProfile, setShouldReload, checkedLocalStorage} = useContext(appContext)
    const {data: availableSkills, status: availableSkillsStatus, error: availableSkillsError} = useGetAvailableSkillsListQuery<skillsApiType>()
    const [switchCompnay] = usePostSwitchCompaniesMutation()
    const [loading, setLoading] = useState(false)
    const [createCompany] = usePostCreateCompanyMutation()
    const {goToStep} = routeTo.query 
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
    const [companyDetails, setCompanyDetails] = useState<{name: string, skills: {skillId: number}[]}>({
        name: "",
        skills: []
    })

    useLayoutEffect(() => {
        if (routeTo.query.goToStep === 'crm') {
            setCurrentStep(3);
        }
    }, [routeTo.query.goToStep]);


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCompanyDetails(prev => ({...prev, [name]: value}))
    }

    const handleChangeStep = (step: 1 | 2 | 3) => {
        const toggleAnimation = gsap.timeline({paused: true})
            .to(".companysetup-container", {opacity: 0})
            .to(".companysetup-container", {opacity: 1})
        toggleAnimation.play()
        
        setTimeout(() => {
            setCurrentStep(step)
        },500)
    }

    const handleUpdateSkills = (skill: SkillsType) => {
        console.log(skill);
        // Check if the skill is already in the skills array
        const isSkillIncluded = companyDetails.skills.some(item => item.skillId === skill.id);

        if (!isSkillIncluded) {
            // If the skill is not included, add it
            setCompanyDetails(prev => ({
                ...prev,
                skills: [...prev.skills, {skillId: skill.id}]
            }));
        } else {
            // If the skill is included, remove it
            setCompanyDetails(prev => ({
                ...prev,
                skills: prev.skills.filter(item => item.skillId !== skill.id)
            }));
        }
    };

    const handleCreateCompany = () => {
        setLoading(true)
        try {
            createCompany(companyDetails).unwrap()
                .then(fulfilled => {
                    toast.success("company created, switching company...")
                    console.log(fulfilled)
                    setLoading(false)
                    // @ts-ignore
                    switchCompnay({companyId: fulfilled.data.companyId}).unwrap()
                        .then(fulfilled => {
                            toast.success("company switched")
                            handleChangeStep(3)
                            // setShouldReload(true)
                            // routeTo.push("/dashboard")
                        })
                        .catch(rejected => (
                            console.error(rejected),
                            toast.error("Error Switching Company")
                        ))
                })
                .catch(rejected => {
                    console.log(rejected)
                    if (rejected.status === "FETCH_ERROR") {
                        toast.error("Error refresh page")
                    } else {
                        toast.error("Error occured creating company")
                    }
                    setLoading(false)
                })
        } catch (error) {
            console.error(error),
            toast.error("Error occured creating company")
            setLoading(false)
        }
    }

    if (checkedLocalStorage && !globalState.authorizationToken) {
        return (
            <main className="bg-[#F8F8FA] text-[#333333] min-h-screen sm:h-screen flex flex-col justify-center items-center">
                <h1 className="text-[23px]">You're are unauthorized</h1>
                <div className="w-[140px] mt-2">
                    <Button onClick={() => routeTo.push("/onboarding")}>Login</Button>
                </div>
            </main>
        )
    }

    return (
        <main className="bg-[#F8F8FA] min-h-screen sm:h-screen flex flex-col justify-center items-center">
            <div className="companysetup-container w-full flex flex-col items-center">
                {currentStep === 2 && 
                    <div className="flex flex-col items-center px-3 h-auto sm:h-[99vh] py-4 w-full overflow-auto ">
                        <h1 className="text-[1.5em] sm:text-[30px] font-[500] text-[#333333] mt-8 mb-12 text-center ">Select a Minimum of 5 top skills to Continue</h1>

                        <div className=" w-[100%] mdx2:w-[55em]">
                            {availableSkillsStatus === "fulfilled" && <div className="flex flex-col sm:flex-row gap-5 mdx3:gap-10 justify-between text-[#333333]">
                                <div className="bg-white flex flex-col ">
                                    {availableSkills?.data?.slice(0, 13).map(item => (
                                        <div onClick={() => handleUpdateSkills(item)} className=" cursor-pointer hover:bg-slate-100 flex items-center border-b py-3">
                                            <Checkbox sx={{
                                                '&.Mui-checked': {
                                                    color: "#B3387F"
                                                }
                                                }} 
                                                checked={companyDetails.skills.some(skill => skill.skillId === item.id)} onChange={() => console.log(item)} 
                                            />
                                            <p className="font-[500] pr-5">{item.symbol} = {item.name}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white flex flex-col">
                                    {availableSkills?.data?.slice(13, 25).map(item => (
                                        <div onClick={() => handleUpdateSkills(item)} className=" cursor-pointer hover:bg-slate-100 flex items-center border-b py-3">
                                            <Checkbox sx={{
                                                '&.Mui-checked': {
                                                    color: "#B3387F"
                                                }
                                                }} 
                                                checked={companyDetails.skills.some(skill => skill.skillId === item.id)}
                                                // checked={companyDetails.skills.includes(item => item.)} 
                                            />
                                            <p className="font-[500] pr-5">{item.symbol} = {item.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            <div className="flex flex-col sm:flex-row gap-5 mt-6 items-start sm:items-center justify-end ">
                                <p className="text-[#333333] font-[700]">Step 2 of 3</p>
                                <div className="flex gap-3 items-center">
                                    <div className="w-[100px]">
                                        <Button onClick={() => handleChangeStep(1)} className="py-[5px] bg-transparent border border-[#B3387F]"><p className="text-[#B3387F]">Previous</p></Button>
                                    </div>
                                    <div className="w-[160px]">
                                        <Button disabled={(companyDetails.skills.length < 5 || loading)} onClick={handleCreateCompany} className="py-[5px] h-[33px]">{loading ? <ActivityIndicator /> : "Save and Continue"}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }

                {currentStep === 1 && <div className="flex flex-col items-center w-[93%] sm:w-[35em] ">
                    <Logo />
                    <h1 className="text-[1.5em] sm:text-[30px] font-[500] mt-3 text-center " >Let's Completely Get you Set Up</h1>     

                    <div className="w-full" >
                        <div style={{boxShadow: "0px 0px 8px 1px rgba(187, 185, 185, 0.25)"}} className="bg-white rounded-md flex flex-col items-center px-[20px] sm:px-[50px] py-8 mt-14">
                            <Picture />
                            <h1 className="text-[#333333] font-[600] text-[20px]">Hello, {userProfile?.firstName} {userProfile?.lastName}</h1>
                            <p className="text-[#71717A] text-[16px] pt-2">First tell us about your company</p>
                            <Input
                                className="mt-8"
                                value={companyDetails.name}
                                onChange={handleOnChange}
                                label={<label className="text-[#333333] font-medium text-[0.9em]">Company name</label>} 
                                placeholder="Enter company name"
                                type="text"
                                name="name"
                            />
                        </div>

                        <div className="flex gap-5 mt-4 justify-end items-center">
                            <p className="text-[#333333] font-[700]">Step 1 of 3</p>
                            <div className="w-[100px]">
                                <Button disabled={!companyDetails.name} onClick={() => handleChangeStep(2)} className="py-[5px] disabled:cursor-not-allowed">Next</Button>
                            </div>
                        </div>
                    </div>
                </div>}

                {currentStep === 3 && 
                    <CrmSetup handleChangeStep={handleChangeStep} />
                }
            </div>
        </main>
    )
}

export default CompanySetup