'use client'
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { products } from "@/utils/products";

const CheckoutClient = () => {
    const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    const router = useRouter();

    console.log("Payment Intent" + paymentIntent);
    useEffect(() => {
        if(cartProducts){
            setLoading(true);
            setError(false);

            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: {"Content-Type": "aplication/json"},
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                })
            }).then((res) => {
                setLoading(false);
                if(res.status === 401){
                    return router.push('/login')
                }
                return res.json()
                
            }).then((data) => {
                setClientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch((error) => {
                setError(true);
                console.log("Error", error)
                toast.error("Algo está errado!")
            })
        }

    }, [cartProducts, paymentIntent]);

    return(
        <>
            Checkout
        </>
    )
}

export default CheckoutClient;