import { useState } from "react"
import CheckoutLayout from "../../components/CheckoutLayout"
import CartSummary from "../../components/CartSummary"
import ShippingForm from "../../components/ShippingForm"
import PaymentForm from "../../components/PaymentForm"
import Confirmation from "../../components/Confirmation"

// Mock cart data
const cart = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: 32.0,
    color: "Sienna",
    size: "Large",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  // Add more items as needed
]

export default function Checkout({name}) {

    console.log("name",name);
    
  const [step, setStep] = useState(0)

  const nextStep = () => setStep(step + 1)

  return (
    <CheckoutLayout currentStep={step}>
      {step === 0 && <CartSummary cart={cart} onProceed={nextStep} />}
      {step === 1 && <ShippingForm onProceed={nextStep} />}
      {step === 2 && <PaymentForm onProceed={nextStep} />}
      {step === 3 && <Confirmation />}
    </CheckoutLayout>
  )
}

