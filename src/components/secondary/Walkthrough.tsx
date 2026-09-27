import { useContext, useEffect, useState } from "react";
import Joyride from "react-joyride"
import { appContext } from "../contexts/appContext";

const Walkthrough = ({steps}: {steps: {target: string, content: string}[]}) => {
    const [isClient, setIsClient] = useState(false); // To detect if we're on the client
    const { displayWalkthrough} = useContext(appContext)

    useEffect(() => {
        setTimeout(() => {
            displayWalkthrough && setIsClient(true);
            // setRun(true)
        },1000)
    }, []);
    
    return (
        <>
            {isClient && <Joyride run={true} steps={steps} showSkipButton showProgress continuous />}
        </>
    )
}

export default Walkthrough