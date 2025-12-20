import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ application, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            const res = await axiosSecure.post('/create-payment-intent', { price });
            const clientSecret = res.data.clientSecret;

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: { email: application.tutorEmail || 'anonymous' }
                }
            });

            if (paymentIntent?.status === 'succeeded') {
                
                await axiosSecure.patch(`/applications/approve/${application._id}`, {
                    paymentIntentId: paymentIntent.id
                });
                alert("Payment Successful & Tutor Approved!");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="border p-4 rounded-md" />
            <button className="btn btn-primary mt-4" type="submit" disabled={!stripe}>
                Pay ${price} & Approve
            </button>
            <p className="text-red-500">{error}</p>
        </form>
    );
};

export default CheckoutForm;