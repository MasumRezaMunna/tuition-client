import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const application = useLoaderData(); 

    return (
        <div className="p-10">
            <h2 className="text-3xl mb-5">Make Payment for {application.subject}</h2>
            
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    application={application} 
                    price={application.expectedSalary} 
                />
            </Elements>
        </div>
    );
};

export default Payment;