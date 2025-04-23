"use client"

import { useState } from "react"
import { CreateProfileInfo } from "../_components/CreateProfileInfo";
import { CreatePaymentInfo } from "../_components/CreatePaymentInfo";

const CreateProfile = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [CreateProfileInfo, CreatePaymentInfo];
    const Components = steps[currentStep]
    return (
        <Components currentStep={currentStep} setCurrentStep={setCurrentStep} />
    )
}

export default CreateProfile