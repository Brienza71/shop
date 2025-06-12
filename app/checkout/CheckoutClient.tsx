'use client'
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { products } from "@/utils/products";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import TextArea from "../components/inputs/TextArea";
import CustomCheckBox from "../components/inputs/CustomCheckBox";
import CategoryInput from "../components/inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

const CheckoutClient = () => {
    const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart();
    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
            defaultValues: {
                name: "",
                city: "",
                country: ""
            },
        });

    const toogleOpen = useCallback(() => {
            setIsOpen((prev) => !prev);
        }, []);

    const router = useRouter();

    console.log("Payment Intent" + paymentIntent);
    useEffect(() => {
        if(cartProducts){
            setIsLoading(true);
            setError(false);

            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: {"Content-Type": "aplication/json"},
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                })
            }).then((res) => {
                setIsLoading(false);
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
            <Heading title="Checkout" center/>
            <Input id="name" label="Nome Completo" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="city" label="Cidade" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="country" label="Pais" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="line1" label="Rua" disabled={isLoading} register={register} errors={errors} required/>
            <h2 className="font-semibold mt-4 mb-2">Forma de Pagamento</h2>
            
        </>
    )
}

export default CheckoutClient;