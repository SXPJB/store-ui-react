import React from "react";
import {Redirect} from "react-router-dom";
import {Utils} from "../res/Utils";
import {changeStatusOrder} from "../services/ShoppongService";

export default function PayPal(props) {
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef();

    // To show PayPal buttons once the component loads
    React.useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Pago de productos",
                                amount: {
                                    currency_code: "MXN",
                                    value: props.total,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaid(true);
                    console.log(order);
                    await changeStatusOrder()
                },
                onError: (err) => {
                    setError(err)
                    console.error(err);
                },
                style: {
                    size: 'responsive',
                    shape: 'rect',
                    color: 'black',
                    layout: 'horizontal',
                    label: 'paypal',
                    tagline: true
                },
            })
            .render(paypalRef.current);
    }, [props.total]);

    // If the payment has been made
    if (paid) {
        setTimeout(()=>Utils.swl({
            position: 'center',
            icon: 'success',
            title: 'La compra el pedido se ha realizado con éxito',
            text:'Revise él este estatus de su pedido en Mis pedidos',
            showConfirmButton: false,
            timer: 3000
        }),2000)

        return <Redirect to={"/"}/>
    }

    // If any error occurs
    if (error) {
        return <div>Ocurrió un error al procesar el pago! Inténtalo de nuevo.</div>;
    }

    // Default Render
    return (
        <div>
            <div ref={paypalRef}/>
        </div>
    );
}
