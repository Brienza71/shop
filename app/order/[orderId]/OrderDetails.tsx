'use client'

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps{
    order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order}) => {
    // const router = useRouter()
    return (
        <div className="max-w-[1150px] m-auto flex flex-col gap-2">
            <div className="mt-8">
                <Heading title="Detalhes do Pedido"/>
            </div>
            <div>
               Order ID: {order.id} 
            </div>
            <div>
                Quantia total:{""}
                <span className="font-bold">{formatPrice(order.amount)}</span>
            </div>
            <div className="flex gap-2 items-center">
                <div>Status de Pagamento</div>
                <div>
                    {order.status === 'pending' ? (<Status text="Pendente" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700"/>) :
                     order.status === 'complete' ? (<Status text="Completo" icon={MdDone} bg="bg-green-200" color="text-green-700" />) : <></>}
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div>Status da Entrega</div>
                <div>
                    {order.deliveryStatus === 'pending' ? (<Status text="Pendente" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700"/>) :
                     order.deliveryStatus === 'dispatched' ? (<Status text="Enviado" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />) : 
                     order.deliveryStatus === 'delivered' ? (<Status text="Entregue" icon={MdDone} bg="bg-green-200" color="text-green-700" />) : <></>}
                </div>
            </div>
            <div>Date: {moment(order.createDate).fromNow()}</div>
            <div>
                <h2 className="font-semibold mt-4 mb-2">Produtos Encomendados</h2>
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                    <div className="col-span-2 justify-self-start">PRODUTOS</div>
                    <div className="justify-self-center">PREÇO</div>
                    <div className="justify-self-center">QTDE</div>
                    <div className="justify-self-end">TOTAL</div>
                </div>
                {/* {order.products && order.products.map((item) => {
                    return <OrderItem key={item.id} item={item}></OrderItem>;
                })}  */}
            </div>
        </div>
    );
};

export default OrderDetails;