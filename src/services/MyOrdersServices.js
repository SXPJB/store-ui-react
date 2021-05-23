import {Utils} from "../res/Utils";
import {Client} from "../res/Client"
import {Urls} from "../res/Urls";

export const getMyOrders = async () => {
    let res = null;
    try {
        res = await Client.GET({
            url: Urls.apiOrder.findOrderByUserPage,
            params: {
                idUser: Utils.getUser().id
            }
        })
    } catch (e) {
        Utils.raise(e, "Error al optener mis ordenes")
    }
    return res;
}

export const findAllOrders = async () => {
    let res = null
    try {
        res = await Client.GET({
            url:Urls.apiOrder.findAll,
            params:{
                page:0,
                size:100
            }
        })
    } catch (e) {
        Utils.raise(e, "Error  al encontrar las ordenes")
    }
    return res
}

export const setDelivered = async idOrder =>{
    await Client.POST({
        url: `${Urls.apiOrder.update}/${idOrder}`,
        data:{
            state: "T",
            isDelivered: true
        },
        muted:true
    })
}
