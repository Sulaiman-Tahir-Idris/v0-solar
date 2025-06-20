"use client"

import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export function CheckoutSteps({ currentStep, setCurrentStep }: CheckoutStepsProps) {
  const steps = [
    { id: 1, name: "Shipping" },
    { id: 2, name: "Payment" },
    { id: 3, name: "Review" },
  ]

  return (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li key={step.id} className={`flex items-center ${index < steps.length - 1 ? "w-full" : ""}`}>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (step.id < currentStep) {
                    setCurrentStep(step.id)
                  }
                }}
                disabled={step.id > currentStep}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step.id < currentStep
                    ? "bg-primary text-primary-foreground cursor-pointer"
                    : step.id === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                } ${step.id > currentStep ? "cursor-not-allowed" : ""}`}
              >
                {step.id < currentStep ? <Check className="w-4 h-4" /> : <span>{step.id}</span>}
              </button>
              <span className={`text-sm mt-1 ${step.id <= currentStep ? "font-medium" : "text-muted-foreground"}`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-full h-0.5 mx-2 ${step.id < currentStep ? "bg-primary" : "bg-muted"}`}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
