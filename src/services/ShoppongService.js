import {Utils} from "../res/Utils";
import {Urls} from "../res/Urls";
import {Client} from "../res/Client";

export const initialOrder = async () => {
    try {
        const res = await Client.POST({
            url: Urls.apiOrder.insert,
            data: {
                idUser:{
                    id: Utils.getUser().id
                },
                state: "C"
            }
        })
        if(res!==null){
            Utils.setOrder(res)
        }
    } catch (e) {
        Utils.raise(e, "Error al crear la orden")
    }
}

export const changeStatusOrder= async ()=>{
    const idOrder = Utils.getOrder().id
    await Client.POST({
        url:`${Urls.apiOrder.update}/${idOrder}`,
        data:{
            state:'T'
        }
    })
    localStorage.removeItem("order")
}

export const addCard = async product => {
    try {

        await Client.POST({
            url: Urls.apiShoppingCart.insert,
            data: {
                idOrder:{
                    id:Utils.getOrder().id
                },
                idProduct:{
                    id:product.idProduct
                },
                amount:product.amount
            }
        })
    } catch (e) {
        Utils.raise(e, "Error al agregar producto")
    }
}

export const getShoppingCart = async (idOrder, idUser) => {
    let res = null
    try {
        res = await Client.GET({
            url: Urls.apiShoppingCart.findShoppingCartByUserSateC,
            params: {
                idOrder,
                idUser
            }
        })
    } catch (e) {
        Utils.raise(e, "Error el encontrar el carrito de compras")
    }
    return res;
}
export const updateDirection = async (direction) =>{
   try {
       const idOrder = Utils.getOrder().id
       await Client.POST({
           url:`${Urls.apiOrder.update}/${idOrder}`,
           data:{
               destinationDir:direction
           }
       })
   }catch (e) {
       Utils.raise(e,"Error al actulizar el total")
   }
}
